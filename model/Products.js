class Product {
    constructor( name,code, description) {
        //constructor( id, name,code, description) {
        //this.product_uid = id
        this.product_code = code;
        this.product_name = name;
        this.description = description;
    }
}

module.exports = {
    Product: Product
};