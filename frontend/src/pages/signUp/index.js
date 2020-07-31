import React, {useState} from 'react';
import api from '../../services/api';
import { login, setName } from '../../services/auth';
import Header from '../components/header';
import './index.css';

export default function SignUp({history}){
    const [name, setNameUser] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    async function handleSubmit(event){
        event.preventDefault();
        const apiResponse = await api.post('/register', {
            name,
            email,
            password
        })

        const { token, nameUser }  = apiResponse.data;
        login(token);
        setName(nameUser);
        history.push('/showEvents');
    }
    
    return(
        <>
            <Header/>
            <div className='boxSignUp'>
                <form className='formSignUp' onSubmit={handleSubmit}>
                    <p>
                        <label>Nome</label>
                        <input
                            id='nameUser'
                            type='text'
                            required='true'
                            value={name}
                            onChange={event => setNameUser(event.target.value)}
                        />
                    </p>
                    <p>
                        <label>E-mail</label>
                        <input
                            id='emailUser'
                            type='text'
                            required='true'
                            value={email}
                            onChange={event=> setEmail(event.target.value)}
                        />
                    </p>
                    <p>
                        <label>Senha</label>
                        <input
                            id='passwordUser'
                            type='password'
                            required='true'
                            value={password}
                            onChange={event=> setPassword(event.target.value)}
                        />
                    </p>
                    <p> 
                        <input 
                        id="buttonSignUp" 
                        type="submit" 
                        value="Cadastrar" /> 
                    </p>
                </form>
            </div>
        </>
    )
}