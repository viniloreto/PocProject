const routes = require('./routes/productsRoutes.js')
const express = require('express');
const app = express();
const bodyParser = require('body-parser');


function main() {

    app.use(bodyParser.json())
    app.use('/api', routes)
    app.listen(3000, console.log(`Server running`));   

}
main()