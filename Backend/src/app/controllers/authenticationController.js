const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth');
const { query } = require('express');

function generateToken(params = {}){
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86408,
    });
}

module.exports = {
    async authenticate(req, res){
        try{
            const { email, password } = req.body;
            const user = await User.findOne(
                {
                    where: {email}
                }
            );
            if(!user){
                return res.status(400).send({error: 'User not exist'});
            }
            if(!await bcrypt.compare(password, user.password)){
                return res.status(400).send({error: 'Invalid Password'});
            }

            const nameUser = user.name;
            
            return res.send({
                nameUser,
                token: generateToken({id: user.id}),
            });

        }catch(err){
            return res.status(400).send({error: 'Error in authenticate user '+err});
        }
    }, 

    async register(req, res){
        try{
            const { name, email, password} = req.body;

            const userExists = await User.findOne(
                {
                    where: {email}
                }
            )

            if(userExists){
                return res.status(400).send({ error: 'User e-mail already exist'});  
            }
        
            const user = await User.create({name, email, password});

            const nameUser = user.name;
            return res.send({
                nameUser,
                token: generateToken({id: user.id}),
            });
        }catch(err){
            return res.status(400).send({ error: 'Error in create user' + err});  
        }
    }
}