const express = require('express')
const routes = express.Router()
const connection = require('../database/database.js')
const product = require('../model/Products').Product

const httpStatus = {
    statusOK: "Cadastrado com sucesso",
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

//Conecta
connection.then((connection) => {

    //Busca a tabela Product
    let productRepo = connection.getRepository("Product");

    routes.get('/products', (req, res) => {
        return productRepo.find()
            .then((result) => {
                //gambs
                if (result.length > 0) {
                    res.status(200).send(result)
                }else {
                    res.status(404).send(httpStatus.productNotFound)
                }
            }
            ).catch(() => {
                res.send(httpStatus.invalidRequest)
            }
            )
    });

    routes.post('/products', (req, res) => {
        ''
        product.product_code = req.body.product_code
        product.description = req.body.description

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
                if (result) {
                    res.status(200).send(result)
                } else {
                    res.status(404).send(httpStatus.productNotFound)
                }
            }).catch(() => {
                res.status(400).send(httpStatus.invalidCode)
            })
    })

    routes.put('/products/:id', async (req, res) => {

        productRepo.update({ product_code: req.params.id }, { description: req.body.description, product_code: req.body.product_code })
            .then(() => {
                res.status(200).send(httpStatus.statusUpOk)
            }).catch(() => {
                res.status(400).send(httpStatus.statusUpNotOk)
            })
    })

    routes.delete('/products/:id', (req, res) => {
        return productRepo.delete({ product_code: req.params.id })
            .then((result) => {
                //gambs
                if(result.raw[1] === 0){
                    res.status(404).send(httpStatus.productNotFound)    
                }else{
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
