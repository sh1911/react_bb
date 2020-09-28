import React from 'react';

import NavigationBar from './components/NavigationBar';
import Login from './components/Login';
import Logout from './components/Logout';
import AccountDetails from './components/AccountDetails';
import DonarList from './components/DonarList';
import FooterBar from './components/FooterBar';
import Request from './components/Request'
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import Register from './components/Register'
import OTPform from './components/OTPform';
import ErrorBoundary from './components/ErrorBoundary'
import DonarsAdmin from './components/DonarsAdmin'
import UsersAdmin from './components/UsersAdmin'
import './App.css';
import { Container, Row, Col } from 'react-bootstrap';
import Home from './components/Home';
function App() {
  const marginTop={
    marginTop:"20px"
  };
  return (
  <Router>
     	<NavigationBar/>
    <Container>
      <Row>
        <Col lg={12} style={marginTop}>
          <Switch>
            <Route path="/home" exact component={Home}/>
            
            <Route path="/add" exact component={DonarList}/>
          
            <Route path="/list" exact component={Request }/>
           
            
          </Switch>
        </Col>
      </Row>
      
    </Container>
    <Container>
      <Row>
        <Col lg={12} style={marginTop}>
          <Switch>
            <Route path="/register" exact component={Register}/>
          </Switch>
        </Col>
      </Row>   
    </Container>
    <Container>
      <Row>
        <Col lg={12} style={marginTop}>
          <Switch>
            <Route path="/login" exact component={Login}/>
            <Route path="/logout" exact component={Logout}/>
            <Route path="/otp" exact component={OTPform}/>
            <Route path="/Account" exact component={AccountDetails}/>
          </Switch>
        </Col>
      </Row>   
    </Container>
    <Container>
      <Row>
        <Col lg={12} >
          <Switch>
          
            <Route path="/admin/edit/:id" exact component={Register}/>
            <Route path="/admin/userslist" exact component={UsersAdmin}/>
          
            <Route path="/admin/donarslist" exact component={DonarsAdmin}/>
            
          </Switch>
        </Col>
      </Row>   
    </Container>
       
        <FooterBar/>
      
   </Router>
      
        
   
  );
}

export default App;
