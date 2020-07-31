import React from 'react';
import { Link, useHistory} from 'react-router-dom';
import  { isAuthenticated, getUserName, logout}  from '../../../services/auth';
import './index.css';


export default function Header(){
    let history = useHistory();
    function handleExitClick(event){
        event.preventDefault();
        logout();
        history.push('/');
    }
    return (
        <div className="boxHeader">
            <div className="companyName">
                <a href='/'>
                    <h1>TRI</h1>
                    <h1>NCA</h1>
                </a>
            </div>
            <div className="phraseHeader">             
                    <h1>Churras da galera</h1>  
                    <h1>Tri legal nehh, ahammm !!</h1>               
            </div>
            {isAuthenticated() === true &&
            <div className="nameUser">
                <ul>
                      <li><a>{getUserName()}</a>
                        <ul>
                            <li><Link to='/dashboardUser'><a>Conta</a></Link></li>
                            <li><a href='#' onClick={handleExitClick}>Sair</a></li> 
                        </ul>  
                    </li>                 
                </ul>
            </div>
            }
       
        </div>
    )
}