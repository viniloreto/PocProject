const EntitySchema = require("typeorm").EntitySchema;
const Product = require('../model/Products').Product;

module.exports = new EntitySchema({
    name: "Product",
    target: Product,
    columns: {
        product_uid: {
            primary: true,
            type: "uuid",
            generated: "uuid"
        },
        product_code: {
            type: "integer",
            unique: true
        },
        product_name: {
            type: "text"
        },
        description: {
            type: "text"
        }
    }
});