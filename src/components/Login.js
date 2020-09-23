import React from 'react';
import Card from 'react-bootstrap/Card'
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import AlertToast from './AlertToast'
export default class Login extends React.Component{

    constructor(props)
    {
        super(props)
        this.state={
            email:"",
            password:"",
            loggedIn:false,
            token:"",
            errorMessage:"",
        }
        this.login=this.login.bind(this);
        this.onChange=this.onChange.bind(this);
        
    }
 
    login(e)
    {
        e.preventDefault()
        const URL="http://localhost:8088"
        const endpoint="/resource/authenticate"
        console.log(this.state.password)
        console.log(this.state.email)
        axios({
            method:'post',
            url:`${URL}${endpoint}`,
            data:{"email": `${this.state.email}`,
            "password":`${this.state.password}`},
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response=>{
            localStorage.setItem("jwttoken",response.data)
            this.setState({loggedIn:true})
            })
        .catch(err =>{
            if(err.response!=null)
              {
              this.setState({
                  errorMessage:err.response.data})
              }
              else
              {
                  this.setState({
                      errorMessage:err.message})
              }     
        })       
    
  } 
    onChange(e)
    {
        
        this.setState({
            [e.target.name]:e.target.value
        })
        console.log(this.state);
        
    }

	render()
	{
        
        if(this.state.loggedIn===true || localStorage.getItem("jwttoken")!=null)
        {
            return <Redirect to="/add" />
        }
        else
        { 
            return( 
            <div>
            
            {this.props.location.state!=null?<AlertToast message={this.props.location.state.errmssg} show={true} hmessage={"error"} type={"danger"}/>:null}
            {this.state.errorMessage.length>0?<AlertToast message={this.state.errorMessage} hmessage={"error"} show={true} type={"danger"}/> :null }
            <Card className="col-7 mx-auto">
            <Card.Header align="center">Login</Card.Header>
            <Card.Body>
            <form method='POST' onSubmit={this.login}>
                <div className="form-group col-7 mx-auto">
                    <label>Email address</label>
                    <input className="form-control" type="email" placeholder="Enter email" name="email" value={this.state.email} onChange={this.onChange} required/>
                </div>
                <div className="form-group col-7 mx-auto" >
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter Password" name="password" value={this.state.password} onChange={this.onChange} required/>
                </div>
                <br/>
                <div className="text-center">
                    <button className="btn btn-primary" type="submit" >Login</button>
                </div>
            </form>     
            </Card.Body>
            </Card>
            </div>
            )
        }
    }
}