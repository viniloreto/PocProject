const typeorm = require("typeorm");


const connection =   typeorm.createConnection({
        type: "postgres",
        host: "localhost",
        port: 5432,
        username: "postgres",
        password: "48969900123",
        database: "projectPoc",
        entities: [
            require('../entity/productsSchema')
        ],
        synchronize: true

    })


module.exports = connection

