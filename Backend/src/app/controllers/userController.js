const User = require('../models/User');
const { query } = require('express');
module.exports = {
    async store(req, res){
        try{
            const { name, email, password} = req.body;

            const findUser = await User.findOne({
                where: {email: email}
            });

            if(findUser){
                return res.status(400).send({ error: 'User email already exist'}); 
            }

            const user = await User.create({name, email, password});

            return res.send({user});
        }catch(err){
            return res.status(400).send({ error: 'Error in create user' + err});  
        }
    },

    async query(req, res){
        try{
            const userId = req.userId;
            const user = await User.findByPk(userId);

            return res.send({user});
        }catch(err){
            return res.status(400).send({ error: 'Error in query user' + err});
        }
    },

    async queryAll(req,res){
        try{
            const users = await User.findAll();

            return res.send({users})
        }catch(err){
            return res.status(400).send({ error: 'Error in search all users'+ err});  
        }
    },

    async edit(req, res){
        try{
            
            const newUser = req.body;
            const userId = req.userId;

            await User.update(
                {
                    name: newUser.name,
                    email: newUser.email,
                },
                {
                    where:{id: userId},
                }
            )
            
            const user = await User.findByPk(userId);

            return res.send({user});
        }catch(err){
            return res.status(400).send({ error: 'Error in edit user' + err});
        }
    },

    async delete(req, res){
        try{
            const userId = req.userId;
            await User.destroy({
                where: {id: userId}
            })

            return res.status(200).send('OK');
        }catch(err){
            return res.status(400).send({ error: 'Error in delete user' + err});
        }
    }
}