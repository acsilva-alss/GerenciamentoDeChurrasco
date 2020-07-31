import React, {useState, useEffect} from 'react';
import api from '../../services/api';
import {logout, setName} from '../../services/auth';
import Header from '../components/header';
import './index.css';

export default function DashboardUser({history}){
    const [emailUser, setEmailUser] = useState('');
    const [nameUser, setNameUser] = useState('');
    const [editedNameUser, setEditedNameUser] = useState('');
    const [editedEmailUser, setEditedEmailUser] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    useEffect(() => {   
        async function queryUser(){
            try{
                const apiResponse = await api.get('/users/query');
                setEmailUser(apiResponse.data.user.email);
                setNameUser(apiResponse.data.user.name);
            }catch(err){
                alert('Error in delete data of user '+err);
            }
        };
        queryUser()
    }, []);

    async function handleDeleteUser(){
        try{
            alert('Voce tem certeza que deseja excluir sua conta?');
            await api.delete('/user/delete');
            logout();
            history.push('/');
        }catch(err){
            alert('Error in delete user '+err);
        }
    };

    function hendleEditUser(){
        setIsEditing(true);
    }

    async function handleEditedUserSubmit(event){
        try{
            event.preventDefault();
            const apiResponse = await api.put('/users/edit', {
                name: editedNameUser,
                email: editedEmailUser
            });

            const {email, name} = apiResponse.data.user;

            setEmailUser(email);
            setNameUser(name);
            setIsEditing(false);
            setName(name);

        }catch(err){
            alert('Error in update data user'+ err);
        }
    }
    
    return(
        <>
            <Header/>
                <div className='boxDashboardUser'>
                        
                    <div className="imgUser">
                        <img src='https://image.flaticon.com/icons/svg/847/847969.svg' alt='User'/>
                    </div>
                    {isEditing === false &&
                        <div className='boxDashBoardUserShow'>
                            <div className='dataUser'>
                                <div className='nameAcountUser'>
                                    <h1>Nome:</h1>
                                    <h1>{nameUser}</h1>
                                </div>
                                <div className='emailUser'>
                                    <h1>Email:</h1>
                                    <h1>{emailUser}</h1>
                                </div>
                            </div>
                            <div className='btnEditUsers'>
                                <button onClick={hendleEditUser}>Editar conta</button>
                                <button onClick={handleDeleteUser}>Excluir conta</button>
                            </div>
                        </div>
                    }
                    {isEditing === true &&
                        <div className ='boxDashboarUserEdit'>
                            <form className='formEditUser' onSubmit={handleEditedUserSubmit}>
                                <p>
                                    <label>Nome:</label>
                                    <input 
                                        type='text'
                                        value={editedNameUser}
                                        required='true'
                                        onChange={event => setEditedNameUser(event.target.value)}
                                    />
                                </p>
                                <p>
                                    <label>Email:</label>
                                    <input 
                                        type='text'
                                        value={editedEmailUser}
                                        required='true'
                                        onChange={event => setEditedEmailUser(event.target.value)}
                                    />
                                </p>
                                <p> 
                                    <input 
                                        id='buttonUpdateUser' 
                                        type='submit' 
                                        value='Atualizar dados'
                                    /> 
                                </p>
                            </form>
                        </div>

                    }
                </div>
        </>
    )
}