const express = require('express')
const routes = express.Router()
const connection = require('../database/database.js')
const Product = require('../model/Products').Product

const httpStatus = {
    statusOK: "Cadastrado com sucesso",
    statusNotOK: "Falha ao inserir o produto",
    invalidRequest: "Falha ao buscar os produtos",
    invalidCode: "Código do produto inválido",
    deletedOK: "Produto deletado com sucesso",
    deletedNotOK: "Falha ao deletar o produto",
    statusUpOk: "Produto atualizado com sucesso",
    statusUpNotOk: "Falha ao atualizar o produto"
}

//Conecta
connection.then((connection) => {

    //Busca a tabela Product
    let productRepo = connection.getRepository("Product");

    routes.get('/products', (req, res) => {
        return productRepo.find()
            .then((result) => {
                res.send(result)
            }
            ).catch(() => {
                res.send(httpStatus.invalidRequest)
            }
            )
    });

    routes.post('/products', (req, res) => {

        let product = new Product();
        product = req.body
        productRepo.save(product).then(() => {
            res.status(200).send(httpStatus.statusOK)
        }
        ).catch(() => {
            res.status(400).send(httpStatus.statusNotOK)
        }
        )
    })

    routes.get('/products/:id', (req, res) => {

        return productRepo.findOne({ product_code: req.params.id })
            .then((result) => {
                res.status(200).send(result)
            }).catch(() => {
                res.status(400).send(httpStatus.invalidCode)
            })
    })


    //TODO - METHOD PUT
    // routes.put('/products/:id', (req, res) => {
    //     let product = new Product();
    //     product = req.body
    //     productRepo.update(product).then(
    //         res.status(200).send(httpStatus.statusUpOK)
    //     ).catch(
    //         res.status(400).send(httpStatus.statusUpNotOK)
    //     )
    // })

    routes.delete('/products/:id', (req, res) => {
        return productRepo.delete({ product_code: req.params.id })
            .then(() => {
                res.status(200).send(httpStatus.deletedOK)
            }
            )
            .catch(() => {
                res.status(200).send(httpStatus.deletedNotOK)
            })
    })
})

module.exports = routes


//async await

    // routes.get('/products/:id', async (req, res) => {
    //     res.send( await productRepo.findOne({product_code : req.params.id}))
    // })


    // routes.get('/products', async (req, res) => {
    //      res.send(await  productRepo.find())
    // });
