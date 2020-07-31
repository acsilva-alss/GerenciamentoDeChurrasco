import React,  { useState, useEffect } from 'react';
import api from '../../services/api';
import {useParams} from 'react-router-dom';
import Header from '../components/header/index';
import './index.css';

export default function EditEvent({ history }){
    let {eventId} = useParams(); 
    const [eventObject, setEventObject] = useState({});
    const [arrayUsersGuests, setArrayUsersGuests] = useState([]);
    const [arrayAllUsers, setArrayAllUsers] = useState([]);
    const [nameEventEdited, setNameEventEdited] = useState('');
    const [descriptionEventEdited, setDescriptionEventEdited] = useState('');
    const [dateEventEdited, setDateEventEdited] = useState('');
    const [usersNotGuest, setUsersNotGuest] = useState([]);
    const [usersEdit, setUsersEdit] = useState(false);
    const [usersIsChecked, setUserIsChecked] = useState([]);
    const [usersAmountPay, setUsersAmountPay] = useState([]);
    const [usersIsPaid, setUsersIsPaid] = useState([]);
    const [usersGuestAmountPay, setUsersGuestAmountPay] = useState([]);
    const [usersGuestIsPaid, setUsersGuestIsPaid] = useState([]);
    const [isEditUserGuest, setIsEditUserGuest] = useState([]);
    useEffect(() =>{
        async function queryUsers(){
            try{
                let arrayUsersChecked = [];
                let arrayTemp = [];
                const apiUsersResponse = await api.get('/users/queryAll');
                setArrayAllUsers([...apiUsersResponse.data.users]);

                for(let i =0; i < apiUsersResponse.data.users.length; i++){
                    arrayUsersChecked.push(false);
                    arrayTemp.push(0);
                }
                setUserIsChecked([...arrayUsersChecked]);
                setUsersAmountPay([...arrayTemp]);
                setUsersIsPaid([...arrayTemp]);
            }catch(err){
                alert('Error in query all Users '+err);
            }
            
        }
        async function queryEvent(){
            try{
                const apiResponse = await api.get('/events/'+eventId+'/query');
                setEventObject(apiResponse.data.event);
                setArrayUsersGuests([...apiResponse.data.event.users]);
                let arrayTemp = [];
                for(let i =0; i < apiResponse.data.event.users.length; i++){
                    arrayTemp.push(0);
                }
                setUsersGuestAmountPay([...arrayTemp]);
                setUsersGuestIsPaid([...arrayTemp]);
                setNameEventEdited(apiResponse.data.event.event_name);
                setDescriptionEventEdited(apiResponse.data.event.event_description);
                setDateEventEdited(apiResponse.data.event.event_date);
            }catch(err){
                alert('Error in query event '+err);
            }
        }
        queryEvent();
        queryUsers();

    },[eventId]);

    function userToBeEditing(item){
        if(isEditUserGuest.find(element => element.id === item.id)){
            return true;
        }
        return false;
    }

    function removeUserGuest(item){    
        setArrayUsersGuests(arrayUsersGuests.filter(element => element.id !== item.id))
        if(usersNotGuest.length !== 0){
            setUsersNotGuest([...usersNotGuest, item]);
        }
    }

    function searchUsersNotGuest(){
        if(usersEdit === true){
            return;
        }
        let arrayTemp = [...arrayAllUsers];
        for(let i =0; i< arrayUsersGuests.length; i++){
            arrayTemp = [...arrayTemp.filter(element => element.id !== arrayUsersGuests[i].id)];
        }
        setUsersNotGuest([...arrayTemp]);
        setUsersEdit(true);
    }

    function handleClickUser(indexClick, isChecked){
        setUserIsChecked(usersIsChecked.map((item, index) => (index === indexClick ? isChecked: item)));
    }

    function handleAmountPay(indexClick, value){
        setUsersAmountPay(usersAmountPay.map((item, index) => (index === indexClick ? value: item)));
    }

    function handleIsPaid(indexClick, value){
        setUsersIsPaid(usersIsPaid.map((item, index) => (index === indexClick ? value: item)));
    }

    function handleAmountPayGuests(indexClick, value){
        setUsersGuestAmountPay(usersGuestAmountPay.map((item, index) => (index === indexClick ? value: item)));
    }

    function handleIsPaidGuests(indexClick, value){
        setUsersGuestIsPaid(usersGuestIsPaid.map((item, index) => (index === indexClick ? value: item)));
    }

    async function handleSubmit(event){
        event.preventDefault();

        let arrayTempGuests = [];
        let amountEdited = 0;

        for (let i=0; i< arrayUsersGuests.length; i++){
            if(isEditUserGuest.some(element => element ===arrayUsersGuests[i])){
                arrayTempGuests.push({
                    userId: arrayUsersGuests[i].user_events.UserId,
                    amountPaid: parseInt(usersGuestAmountPay[i]),
                    isPaid: usersGuestIsPaid[i],
                })
            }
            else{
                
                arrayTempGuests.push({
                    userId: arrayUsersGuests[i].user_events.UserId,
                    amountPaid: arrayUsersGuests[i].user_events.amount_paid,
                    isPaid: arrayUsersGuests[i].user_events.is_paid,
                })
            }
        }
        for(let i = 0; i < usersNotGuest.length; i++){
            if(usersIsChecked[i] === true){
                arrayTempGuests.push({
                    userId: usersNotGuest[i].id,
                    amountPaid: parseInt(usersAmountPay[i]),
                    isPaid: usersIsPaid[i],
                })
            }
        }

        arrayTempGuests.forEach(element => {
            amountEdited += parseInt(element.amountPaid);
        });
        
        const arrayGuests = [...arrayTempGuests];
        
        const objectToSend = {
            nameEventEdited,
            descriptionEventEdited,
            dateEventEdited,
            amountEdited,
            arrayGuests
        }

        try{
            await api.put('/events/'+eventId+'/edit', objectToSend);
            alert('Evento editado com sucesso');
            history.push('/showEvent/'+eventId);
        }catch(err){
            alert(' Error in edit Event '+ err);
        }    
    }

    function deleteEvent(){
        try{
        alert('Este evento será excluido');
        api.delete('/events/'+eventId+'/delete');
        history.push('/');
        }catch(err){
            alert('Error in delete event '+ err);
        }
    }

    return(
        <>
            <Header/>
            <div className='boxEditEvent'>
                <form onSubmit={handleSubmit}>
                    <div className='eventDataEdited'>
                        <label>Nome do evento:</label>
                        <input
                            id='nameEventEdit'
                            type='text'
                            value = {nameEventEdited}
                            required='true'
                            onChange={event => setNameEventEdited(event.target.value)}
                        />
                    </div>
                    <div className='eventDataEdited'> 
                        <label>Descrição:</label>
                        <input
                            id='descriptionEventEdit'
                            type='text'
                            value = {descriptionEventEdited}
                            required='true'
                            onChange={event => setDescriptionEventEdited(event.target.value)}
                        />
                    </div>
                    <div className='eventDataEdited'>
                        <label>Data:</label>
                        <input
                            id='dateEventEdit'
                            type='date'
                            value = {dateEventEdited}
                            required='true'
                            onChange={event => setDateEventEdited(event.target.value)}
                        />
                    </div>
                    <h1>Usuários convidados:</h1>
                    {arrayUsersGuests.map((item, index)=> (
                        <div className='usersGuests'>
                            <h1 className='nameItem'>{item.name}</h1>
                            <input
                                id='amountPay'
                                type='number'
                                disabled={!userToBeEditing(item, index)}
                                onChange={event => handleAmountPayGuests(index, event.target.value)}
                            />
                            <input
                                id='isPaid'
                                type='checkbox'  
                                disabled={!userToBeEditing(item, index)} 
                                onChange={event => handleIsPaidGuests(index, event.target.checked)}                               
                            />
                            <label>Pago</label>
                            
                            <a className='btnEditRemoveGuest' onClick={() => setIsEditUserGuest([...isEditUserGuest, item])}>Editar</a>
                            <a  className='btnEditRemoveGuest' onClick={() => removeUserGuest(item, index)}>Remover</a>
                        </div>
                    ))}
                    <a href='#' onClick={() => searchUsersNotGuest()}>Convide mais amigos para o evento</a>
                    <a href='#' onClick={() => deleteEvent()}>Excluir evento</a>
                    
                   
                    {usersEdit && usersNotGuest.map((item, index) =>(
                        <div className='boxUsersNotGuest'>                  
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
                            onChange={event => handleAmountPay(index, event.target.value)}
                            
                            
                        />
                        <input
                            id='isPaid'
                            type='checkbox'
                            onChange={event => handleIsPaid(index, event.target.checked)}
                            
                            
                        />
                        <label>Pago</label>
                    </div>
                    ))}
                    <input
                        id='btnRefreshEvent'
                        type='submit'
                        value='Atualizar evento'
                    />
                </form>
            </div>
        </>
    )
}