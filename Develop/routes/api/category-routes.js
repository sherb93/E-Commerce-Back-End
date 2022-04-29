const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findAll({
      include: Product,
    });

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findAll({
      where: { id: req.params.id },
      include: Product,
    });

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  // create a new category

  try {
    const newCategory = await Category.create({
      category_name: req.body.category_name,
    });

    res.status(200).json(`NEW MODEL CREATED ${newCategory}`);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  // update a category by its `id` value
  try {
    const updatedCat = await Category.update(
      { category_name: req.body.category_name },
      { where: { id: req.params.id } }
    );

    res.status(200).json(updatedCat);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  // delete a category by its `id` value
  try {
    const category = await Category.findByPk(req.params.id);

    if (!category) {
      res.status(404).json("Please enter a valid category id");
    } else {
      Category.destroy({ where: { id: req.params.id } });
      res.status(200).json("Category successfully deleted!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
