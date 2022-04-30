const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.route("/")
  .get(async (req, res) => {
    try {
      const categoryData = await Category.findAll({ include: Product });

      res.status(200).json(categoryData);
    } catch (err) {
      res.status(500).json(err);
    }
  })
  .post(async (req, res) => {
    try {
      const newCategory = await Category.create({
        category_name: req.body.category_name,
      });

      res.status(200).json(newCategory);
    } catch (err) {
      res.status(500).json(err);
    }
  });

router.route("/:id")
  .get(async (req, res) => {
    try {
      const categoryData = await Category.findOne({
        where: { id: req.params.id },
        include: Product,
      });

      res.status(200).json(categoryData);
    } catch (err) {
      res.status(500).json(err);
    }
  })
  .put(async (req, res) => {
    try {
      const category = await Category.update(
        { category_name: req.body.category_name },
        { where: { id: req.params.id } }
      );

      res.status(200).json(category);
    } catch (err) {
      res.status(500).json(err);
    }
  })
  .delete(async (req, res) => {
    try {
      const deletedCat = await Category.destroy({
        where: { id: req.params.id },
      });

      res.status(200).json(deletedCat);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;
