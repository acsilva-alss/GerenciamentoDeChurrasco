const User = require('../models/User');
const Event = require('../models/Event');
const { query } = require('express');

module.exports ={
    async store(req, res){
        try{
            const { eventName, eventDescription, eventDate, amount, arrayGuests} = req.body;
            const findEvent = await Event.findOne({
                where:{event_name: eventName, event_date: eventDate}
            })

            if(findEvent){
                return res.status(400).send({error: 'Already exist a event with this name or date'});
            }

            const event = await Event.create({
                event_name: eventName, 
                event_description: eventDescription, 
                event_date: eventDate, 
                user_administrator: req.userId, 
                amount
            });

            for(let i = 0; i < arrayGuests.length; i++){
                const user = await User.findByPk(arrayGuests[i].userId);
                await user.addEvent(event, {through: {amount_paid: arrayGuests[i].amountPaid, is_paid: arrayGuests[i].isPaid }})
            }

            return res.send({ event });
        }catch(err){
            return res.status(400).send({error: 'Error in store event ' + err});
        }
    },

    async queryAll(req, res){
        try{
            const events = await Event.findAll({
                include: {association: 'users'},
            });
            return res.send({events});
        }catch(err){
            return res.status(400).send({error: 'Error in query all events'+ err});
        } 
    },

    async query(req, res){
        try{
            const eventId = req.params.eventId;
            const event = await Event.findOne({
                where: {id: eventId},
                include:
                    {association: 'users'},
            });
            return res.send({event});
        }catch(err){
            return res.status(400).send({error: 'Error in query event'+ err});
        } 
    },

    async queryByAdministrator(req, res){
        try{
            const userAdm = req.userId;
            const events = await Event.findAll(
            {
                where:{user_administrator: userAdm}
            });

            return res.send({events})
        }catch(err){
            return res.status(400).send({error: 'Error in query events by administrator'+err});
        }
    },

    async edit(req, res){
        try{
            const { nameEventEdited, descriptionEventEdited, dateEventEdited, amountEdited, arrayGuests} = req.body;
            const eventId = req.params.eventId;
            await Event.update(
                {
                    event_name: nameEventEdited, 
                    event_description: descriptionEventEdited, 
                    event_date: dateEventEdited, 
                    amount: amountEdited
                },
                {
                    where:{id: eventId},
                }
            );

            const eventEdited = await Event.findOne({
                where: {id: eventId},
                include:
                    {association: 'users'},
            });
            

            for(let i = 0; i < eventEdited.users.length; i++){
                const user = await User.findByPk(eventEdited.users[i].id);
                await user.removeEvent(eventEdited.id);    
            }
            
            for(let i = 0; i < arrayGuests.length; i++){
                const user = await User.findByPk(arrayGuests[i].userId);
                await user.addEvent(eventEdited, {through: {amount_paid: arrayGuests[i].amountPaid, is_paid: arrayGuests[i].isPaid }});   
            }
                
            const editedEvent = await Event.findByPk(eventId);
            return res.send({editedEvent});
        }catch(err){
            console.log(err)
            return res.status(400).send({error: 'Error in edit event '+err})
        }
    },

    async delete(req, res){
        try{
            const eventId = req.params.eventId;
            await Event.destroy(
                {where: { id: eventId}}
            );

            return res.status(200).send('OK');
        }catch(err){
            return res.status(400).send({error: 'Error in delete event '+err});
        }
    }


}