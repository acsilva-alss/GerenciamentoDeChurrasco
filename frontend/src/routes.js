import React from 'react'
import { BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import { isAuthenticated  } from './services/auth';

import Login from './pages/login';
import SignUp from './pages/signUp';
import ShowEvents from './pages/showEvents';
import DashboardUser from './pages/dashboardUser';
import Home from './pages/home';
import AddEvent from './pages/addEvent';
import ShowEvent from './pages/showEvent';
import EditEvent from './pages/editEvent';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        )
      }
    />
  );

export default function Routes(){ 
    return(
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={Home} />
                <Route path='/login' exact component={Login} />
                <Route path='/signUp' component={SignUp} />
                <PrivateRoute path='/showEvents' component={ShowEvents} />
                <PrivateRoute path='/dashboardUser' component={DashboardUser} />
                <PrivateRoute path='/addEvent' component={AddEvent} />
                <PrivateRoute path='/showEvent/:eventId' component={ShowEvent} />
                <PrivateRoute path='/editEvent/:eventId' component={EditEvent} />
            </Switch>
        </BrowserRouter>
    );
}
