import React from 'react';
import { Link} from 'react-router-dom';
import Header from '../components/header/index';
import  { isAuthenticated}  from '../../services/auth';
import './index.css';

export default function Login({ history }){
    
    return(
        <>
            <Header/>
            <div className='boxHome'>
                <h1>Seja bem vindo, ao calendário de eventos da firma</h1>
                <div className='boxImgs'>
                    <img src='https://image.flaticon.com/icons/svg/3106/3106153.svg' alt= 'Imagem Churrasco'/>
                    <img src='https://image.flaticon.com/icons/svg/2934/2934168.svg' alt= 'Imagem Churrasco'/>
                    <img src='https://image.flaticon.com/icons/svg/918/918306.svg' alt= 'Imagem Churrasco'/>
                </div>
                {isAuthenticated() === false &&
                <>
                <Link to='/login'><button>Login</button></Link>
                <Link to='/signUp'><button>Cadastre-se, é grátis</button></Link>
                </>
                }
                {isAuthenticated() === true &&
                    <Link to='/showEvents'><button>Mostrar Eventos</button></Link>
                }
            </div>
        </>
    )
}