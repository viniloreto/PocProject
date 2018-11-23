class Product {
    constructor( code, description) {
        //constructor( code, description) {
        //this.product_uid = id
        this.product_code = code;
        this.description = description;
    }
}

module.exports = {
    Product: Product
};