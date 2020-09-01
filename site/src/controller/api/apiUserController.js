const db = require('../../database/models');
const { validationResult } = require('express-validator');

const controller = {

    getAllUsers: (req, res) =>{
        db.Users.findAll({
            order: [['admin', 'DESC']],
        })
        .then((resultado) =>{
            resultado.forEach(element => {
                delete element.dataValues.password;
            });
            let jsonResult = {
                meta: {
                    status: 200,
                    length: resultado.length,
                    url: req.originalUrl
                },
                data: resultado
            }   
            return res.send(jsonResult);
        })
        .catch(error=>{
            console.log(error);
            let jsonResult = {
                meta: {
                    status: 404                
                },
                data: 'Error Access'
            }    
            return res.send(jsonResult);
        })
    },
    getUserbyId: (req,res) =>{
        db.Users.findByPk(req.params.id)
        .then((resultado) =>{
            delete resultado.dataValues.password;
            let jsonResult = {
                meta: {
                    status: 200,
                    length: resultado.length,
                    url: req.originalUrl
                },
                data: resultado
            }   
            return res.send(jsonResult);
        })
        .catch(error=>{
            console.log(error);
            let jsonResult = {
                meta: {
                    status: 404                
                },
                data: 'Error Access'
            }    
            return res.send(jsonResult);
        })
    },
    validatorRegister(req, res){
        let errors = validationResult(req);
        let jsonResult;
        if (errors.isEmpty()){
            jsonResult ={
                meta: {
                    status: 200,
                    hasErrors: false
                },
                data: {
                    errors: null
                }
            }
        }else{
            let jsonResult ={
                meta: {
                    status: 200,
                    hasErrors: true
                },
                data: {
                    errors: errors.errors
                }
            }
        }
        return res.send(jsonResult);
    },
    validatorLogin(req, res){
        let errors = validationResult(req);
        let jsonResult;
    
        if (errors.isEmpty()){
            jsonResult ={
                meta: {
                    status: 200,
                    hasErrors: false
                },
                data: {
                    errors: null
                }
            }
        }else{
            jsonResult ={
                meta: {
                    status: 200,
                    hasErrors: true
                },
                data: {
                    errors: errors.errors
                }
            }
        }
        return res.send(jsonResult);
    }

};
module.exports = controller;