class Product {
    constructor(id, code, description) {
        this.product_uid = id;
        this.product_code = code;
        this.description = description;
    }
}

module.exports = {
    Product: Product
};