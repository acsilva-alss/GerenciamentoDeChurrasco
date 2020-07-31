import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import Header from '../components/header';
import api from '../../services/api';
import './index.css';

export default function ShowEvents({ history }){
    let {eventId} = useParams(); 
    const [eventObject, setEventObject] = useState({});
    const [arrayUsersGuests, setArrayUsersGuests] = useState([]);

    useEffect(() =>{
        async function queryEvent(){
            try{
                const apiResponse = await api.get('/events/'+eventId+'/query');
                setEventObject(apiResponse.data.event);
                setArrayUsersGuests(apiResponse.data.event.users);
            }catch(err){
                alert('Error in query event '+err);
            }
        }
        queryEvent();
    },[]);

    function formatDate(date){
        var data = new Date(date)   
        return data.toLocaleDateString();   
    }

    async function handleEditEvent(){
        const apiResponse = await api.get('/users/query');
        const userId = apiResponse.data.user.id;
        if(eventObject.user_administrator === userId){
            history.push('/editEvent/'+eventId);
        }
        else{
            alert('Parece que você não é administrador do evento. Somente administradores podem editar')
        }
    }
    
    return(
        <>
            <Header/>
            <div className='boxShowEvent'>
                <h1 className='nameEvent'>{eventObject.event_name}</h1>
                <div className = 'dataEvent'>
                    <div className='descriptionEvent'>
                        <h1>{formatDate(eventObject.event_date)} </h1>
                        <h1>{eventObject.event_description}</h1>
                    </div>
                    <div className='quantityUsersAndAmount'>
                        <div className='imgQuantityPeople'>
                            <img src='https://image.flaticon.com/icons/svg/681/681494.svg'></img>
                            <h1>{arrayUsersGuests.length}</h1>
                        </div>
                        <div className='quantityMoney'>
                            <img src='https://image.flaticon.com/icons/svg/63/63977.svg'></img>
                            <h1>{eventObject.amount}</h1>
                        </div>
                    </div>
                </div>
                <h1>Lista de convidados (Convidados com o nome marcado já efetuaram pagamento)</h1>
                {arrayUsersGuests.map((item, index)=> (
                    <div className='usersGuests'>
                        <input
                            type='checkbox'
                            checked = {item.user_events.is_paid ? true: false}
                            />
                        <h1 className='nameItem'>{item.name}</h1>
                        <h1>{item.user_events.amount_paid}</h1>
                    </div>
                ))}
                <button className='btnEdit' onClick={handleEditEvent}>Editar evento</button>
            </div>
            }
        </>
    )
}