import React, {useState, useEffect} from 'react';
import Header from '../components/header';
import api from '../../services/api';
import './index.css';

export default function ShowEvents({ history }){
    const [listEvents, setListEvents] = useState([]);
   useEffect(()=>{
       async function queryEvents(){
            try{
                const apiResponse = await api.get('/events/queryAll');
                
                setListEvents(apiResponse.data.events);
            }catch(err){
                alert('Error in query events '+err);
            }
        };
        queryEvents();
   },[]);
   
   function handleSeeMoreClick(event){
        console.log(event);
        history.push('/showEvent/'+event.id);
   }

   function handleAddEventClick(){
       history.push('/addEvent');
   }

   function formatDate(date){
    var data = new Date(date)   
    return data.toLocaleDateString();   
   }
    return(
        <>
            <Header/>
            <div className='boxShowEvents'>

                <h1 className="titleShowEvents">Próximos eventos</h1>
                {listEvents.map((item, index)=> (
                    <div className='event'>
                        <img src='https://image.flaticon.com/icons/svg/3079/3079122.svg' alt='imagem'/>
                        <div className='eventContent'>
                            <h1>{item.event_name}</h1>
                            <h2>{formatDate(item.event_date)}</h2>
                            <div className='boxPeopleMoney'>
                                <h3>Total de convidados: {item.users.length}</h3>
                                <h3>Quantia arrecadada: {item.amount}</h3>
                            </div>
                        </div>
                        <button className='btnSeeMoreEvent' key={index} onClick={() => handleSeeMoreClick(item)}>Ver mais</button>
                    </div>
                ))}
                <div className='boxAddEvent'>
                    <img src='https://image.flaticon.com/icons/svg/982/982634.svg' alt=' Add Event'/>
                    <button className='btnAddEvent' onClick={handleAddEventClick}>Adicionar evento</button>
                </div>
            </div>

        </>
    )
}