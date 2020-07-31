import React,  { useState } from 'react';
import api from '../../services/api';
import { login, setName } from '../../services/auth';
import Header from '../components/header/index';
import './index.css';

export default function Login({ history }){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    async function handleSubmit(event){
        try{
            event.preventDefault();
            const apiResponse = await api.post('/authenticate', {
                email, 
                password
            });
            const { token, nameUser }  = apiResponse.data;
            login(token);
            setName(nameUser);
            history.push('/showEvents');

        }catch(err){
            alert('Error: '+err);
        }

    }

    return(
        <>
            <Header/>
            <div className='boxLogin'>
                <form className='formLogin' onSubmit={handleSubmit}>
                    <p>
                        <label>Login</label>
                        <input
                            id='emailLogin'
                            type='text'
                            required='true'
                            value ={email}
                            onChange={event => setEmail(event.target.value)}
                        />
                    </p>
                    <p>
                        <label>Senha</label>
                        <input
                            id='passwordLogin'
                            type='password'
                            required='true'
                            value ={password}
                            onChange={event => setPassword(event.target.value)}
                        />
                    </p>
                    <p> 
                        <input 
                        id='buttonLogin' 
                        type='submit' 
                        value='Entrar'
                     /> 
                    </p>
                </form>
            </div>
        </>
    )
}