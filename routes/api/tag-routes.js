const router = require("express").Router();
const { Product, Tag, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.route("/")
  .get(async (req, res) => {
    try {
      const tag = await Tag.findAll({
        include: [{
          model: Product,
          through: ProductTag
        }]
      });

      res.status(200).json(tag);
    } catch (error) {
      res.status(500).json(error);
    };
  })
  .post(async (req, res) => {
    try {
      const newTag = await Tag.create({ tag_name: req.body.tag_name });
  
      res.status(200).json(newTag);
    } catch (err) {
      res.status(500).json(err);
    }
  });

router.route("/:id")
  .get(async (req, res) => {
    try {
      const tag = await Tag.findOne({
        where: { id: req.params.id },
        include: [{
          model: Product,
          through: ProductTag
        }]
      });

      res.status(200).json(tag);
    } catch (err) {
      res.status(500).json(err);
    };
  })
  .put(async (req, res) => {
    try {
      const tag = await Tag.update(
        { tag_name: req.body.tag_name },
        { where: { id: req.params.id } }
      );
  
      res.status(200).json(tag);
    } catch (err) {
      res.status(500).json(err);
    }
  })
  .delete(async (req, res) => {
    try {
      const deletedTag = await Tag.destroy({
        where: { id: req.params.id },
      });

      res.status(200).json(deletedTag);
    } catch (err) {
      res.status(500).json(err);
    }
  });


module.exports = router;
