import React,  { useState, useEffect } from 'react';
import api from '../../services/api';
import Header from '../components/header/index';
import './index.css';

export default function AddEvent({ history }){
    const[eventName, setEventName] = useState('');
    const[eventDescription, setEventDescription] = useState('');
    const[eventDate, setEventDate] = useState('');
    const[allUsers, setAllUsers] = useState([]);
    const[usersIsChecked, setUserIsChecked] = useState([]);
    const[usersAmountPay, setUsersAmountPay] = useState([]);
    const[usersIsPaid, setUsersIsPaid] = useState([]);

    useEffect(()=>{
        async function queryAllUsers(){
            try{
                let arrayTempUsersChecked = [];
                let arrayTemp = [];
                const apiResponse = await api.get('/users/queryAll');
                setAllUsers([...apiResponse.data.users]);
                for(let i =0; i < apiResponse.data.users.length; i++){
                    arrayTempUsersChecked.push(false);
                    arrayTemp.push(0);
                }
                setUserIsChecked([...arrayTempUsersChecked]);
                setUsersAmountPay([...arrayTemp]);
                setUsersIsPaid([...arrayTemp]);
               
            }catch(err){
                alert('Error in query users. '+err);
            }
        }
        queryAllUsers();
    },[]);
    
    function handleClickUser(indexClick, isChecked){
        setUserIsChecked(usersIsChecked.map((item, index) => (index === indexClick ? isChecked: item)))
    }

    function handleAmountPay(indexClick, value){
        setUsersAmountPay(usersAmountPay.map((item, index) => (index === indexClick ? value: item)))
    }

    function handleIsPaid(indexClick, value){
        setUsersIsPaid(usersIsPaid.map((item, index) => (index === indexClick ? value: item)))
    }

    async function handleSubmit(event){
        try{
            event.preventDefault();
            
            let arrayGuests = []
            let amount = 0;
            usersAmountPay.forEach(element => {
                amount += parseInt(element)
            });

            for(let i = 0; i < usersIsChecked.length; i++){
                if(usersIsChecked[i] === true){
                    arrayGuests.push({
                        userId: allUsers[i].id,
                        amountPaid: parseInt(usersAmountPay[i]),
                        isPaid: usersIsPaid[i]
                    })
                }
            }

            await api.post('events/store', {
                eventName,
                eventDescription,
                eventDate,
                amount, 
                arrayGuests
            })

            alert('Evento cadastrado com sucesso');
            history.push('/showEvents');
        }catch(err){
            alert('Error in add event '+err);
        }

    }
    return(
        <>
            <Header/>
            <div className='boxPageAddEvent'>
                <h1>Adicione um evento</h1>
               <form onSubmit={handleSubmit}>
                   <div className='dataEvent'>
                       <label>Nome do evento:</label>
                       <input
                            id='eventName'
                            type='text'
                            required={true}
                            value = {eventName}
                            onChange={event => setEventName(event.target.value)}
                        />
                   </div>
                   <div className='dataEvent'>
                        <label>Descrição:</label>
                        <input
                            id='eventDescription'
                            type='text'
                            required={true}
                            value = {eventDescription}
                            onChange={event => setEventDescription(event.target.value)}
                        />
                    </div>
                    <div className='dataEvent'>
                        <label>Data:</label>
                        <input
                            id='eventDate'
                            type='date'
                            required={true}
                            value = {eventDate}
                            onChange={event => setEventDate(event.target.value)}
                        />
                    </div>
                    <h1>Escolha os convidados e adicione uma quantia:</h1>
                    <div className='boxTableTitle'>
                        <h2 >Nome</h2>
                        <h2 className='columValuePaid'>Valor sugerido</h2>

                    </div>
                    {allUsers.map((item, index)=> (
                       
                        <div className='boxAmoutPayUser'>                  
                            <input
                                id='inviteUser'
                                type='checkbox'
                                onChange={event=>handleClickUser(index, event.target.checked)}
                            />
                            <label>{item.name}</label>
                            <input
                                id='amountPay'
                                type='number'
                                placeholder='R$20,00'
                                disabled={usersIsChecked[index] === true ? false: true}
                                onChange={event => handleAmountPay(index, event.target.value)}
                            />
                            <input
                                id='isPaid'
                                type='checkbox'
                                disabled={usersIsChecked[index] === true ? false: true}
                                onChange={event => handleIsPaid(index, event.target.checked)}
                            />
                            <label>Pago</label>
                        </div>
                    ))}
                   <div> 
                        <input 
                        id='buttonAddEvent' 
                        type='submit' 
                        value='Adicionar evento'
                     /> 
                    </div>
               </form>
            </div>
        </>
    )
}