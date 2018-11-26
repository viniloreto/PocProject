const express = require('express')
const routes = express.Router()
const connection = require('../database/database.js')
var product = require('../model/Products').Product

const httpStatus = {
    statusOK: " Produto cadastrado com sucesso",
    statusNotOK: "Falha ao inserir o produto",
    invalidRequest: "Falha ao buscar os produtos",
    invalidCode: "Código do produto inválido",
    deletedOK: "Produto deletado com sucesso",
    deletedNotOK: "Falha ao deletar o produto",
    statusUpOk: "Produto atualizado com sucesso",
    statusUpNotOk: "Falha ao atualizar o produto",
    productsNotFound: "Produtos não encontrados",
    productNotFound: "Produto não encontrado",
}

//Conecta ao banco
connection.then((connection) => {

    //Busca a tabela Product
    let productRepo = connection.getRepository("Product");

    routes.get('/products', (req, res) => {
        //Obtem os params da url
        var { offset, limit, order, orderCode } = req.query

        //Se foi passado se vai ser "ASC ou DESC" deixo tudo em maiusculo
        if (order) {
            order = order.toUpperCase()
        }
        if (orderCode) {
            orderCode = orderCode.toUpperCase()
        }
        //Se passarem o parametro orderCode com ASC ou DESC, ordenará pelo Codigo
        //Se passarem o parametro order com ASC ou DESC, ordenará pelo Nome do produto
        //Se passarem os dois parametros com ASC ou DESC, ordenará pelo Codigo.
        return productRepo.find({
            order: {
                product_code: orderCode,
                product_name: order
            },
            skip: offset,
            take: limit
        })
            .then((result) => {
                //gambs
                if (result.length > 0) {
                    res.status(200).send(result)
                } else {
                    res.status(404).send(httpStatus.productsNotFound)
                }
            }
            ).catch(() => {
                res.send(httpStatus.invalidRequest)
            }
            )
    });

    routes.post('/products', (req, res) => {

        product = req.body

        // product.product_code = req.body.product_code
        // product.product_name = req.body.product_name
        // product.description = req.body.description

        productRepo.save(product).then(() => {
            res.status(200).send(httpStatus.statusOK)
        }
        ).catch(() => {
            res.status(400).send(httpStatus.statusNotOK)
        }
        )
    })

    routes.get('/products/:code', (req, res) => {

        return productRepo.findOne({ product_code: req.params.code })
            .then((result) => {
                if (result.length > 0) {
                    res.status(200).send(result)
                } else {
                    res.status(404).send(httpStatus.productNotFound)
                }
            }).catch(() => {
                res.status(400).send(httpStatus.invalidCode)
            })
    })

    routes.put('/products/:code', async (req, res) => {

        productRepo.update({ product_code: req.params.code },
            {
                description: req.body.description,
                product_code: req.body.product_code,
                product_name: req.body.product_name
            })
            .then(() => {
                res.status(200).send(httpStatus.statusUpOk)
            }).catch(() => {
                res.status(400).send(httpStatus.statusUpNotOk)
            })
    })

    routes.delete('/products/:code', (req, res) => {
        return productRepo.delete({ product_code: req.params.code })
            .then((result) => {
                //gambs
                if (result.raw[1] === 0) {
                    res.status(404).send(httpStatus.productNotFound)
                } else {
                    res.status(200).send(httpStatus.deletedOK)
                }
            }
            )
            .catch(() => {
                res.status(200).send(httpStatus.deletedNotOK)
            })
    })
}).catch((err) => {
    alert('Erro ao conectar! ERRO: ', err.message)
})

module.exports = routes


//async await

    // routes.get('/products/:id', async (req, res) => {
    //     res.send( await productRepo.findOne({product_code : req.params.id}))
    // })


    // routes.get('/products', async (req, res) => {
    //      res.send(await  productRepo.find())
    // });
