const router = require("express").Router();
const { Product, Category, Tag, ProductTag } = require("../../models");

// The `/api/products` endpoint

router.route("/")
  .get(async (req, res) => {
    try {
      const products = await Product.findAll({
        include: [
          Category, 
          {
            model: Tag,
            through: ProductTag
          }
        ]
      });

      res.status(200).json(products);
    } catch (error) {
      res.status(500).json(error);
    };
  })
  .post(async (req, res) => {
    /* req.body should look like this...
      {
        product_name: "Basketball",
        price: 200.00,
        stock: 3,
        tagIds: [1, 2, 3, 4]
      }
    */
    try {
      const product = await Product.create(req.body);
      
      if (!req.body.tagIds) {
        res.status(200).json(product); // If no tag ID's then just send back the new product
      } else {
        // Creates new array of Objs for bulkcreating new product_tags if the tagIds are specified in req.body
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });

        const newProductTags = await ProductTag.bulkCreate(productTagIdArr);

        res.status(200).json(newProductTags) // If user specified tagIds, sends back new ProductTags
      };
    } catch (err) {
      res.status(500).json(err);
    };
  });

router.route("/:id")
  .get(async (req, res) => {
    try {
      const product = await Product.findOne({
        where: { id: req.params.id },
        include: [
          Category,
          {
            model: Tag,
            through: ProductTag
          }
        ]
      });

      res.status(200).json(product);
    } catch (err) {
      res.status(500).json(err);
    };
  })
  .put((req, res) => {
    // update product data
    // If update changes the assocaited tags then include property { tagIds: [x] }
    Product.update(req.body, {
      where: {
        id: req.params.id,
      },
    })
    .then((product) => {
      // find all associated tags from ProductTag
      return ProductTag.findAll({ where: { product_id: req.params.id } });
    })
    .then((productTags) => {
      // get list of current tag_ids
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      // create filtered list of new tag_ids
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
      // figure out which ones to remove
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      // run both actions
      return Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    })
    .then((updatedProductTags) => res.json(updatedProductTags))
    .catch((err) => {
      res.status(400).json(err);
    });
  })
  .delete(async (req, res) => {
    try {
      const deletedProduct = await Product.destroy({ where: { id: req.params.id } });
      
      res.status(200).json(deletedProduct);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;
