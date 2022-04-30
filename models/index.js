const Product = require("./Product");
const Category = require("./Category");
const Tag = require("./Tag");
const ProductTag = require("./ProductTag");

// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: "category_id", // Must define foreignKey in BOTH association declarations, otherwise sequelize will create a duplicate column
});

// Categories have many Products
Category.hasMany(Product, {
  foreignKey: "category_id",
  onDelete: "CASCADE", // This can be in the ONE or MANY options. Either way "CASCADE" will delete the table with the foreign key when the reference table is deleted
});

// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
  through: ProductTag, // Since I already made a custom junction table I declare it here so that sequelize doesn't create a new one automatically
  foreignKey: "product_id", // Names the FK in the junction table (ProductTag) for the 'A' table
  //onDelete: "CASCADE" (no need to set this because it's already the default for MANY-TO-MANY relationships)
});

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  through: ProductTag,
  foreignKey: "tag_id",
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
