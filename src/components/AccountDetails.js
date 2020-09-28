import React from 'react';
import Form from 'react-bootstrap/Form'
import {Col} from 'react-bootstrap';
import Card from 'react-bootstrap/Card'
import axios from 'axios';
import AlertToast from './AlertToast'
import './css/Style.css'
export default class AccountDetails extends React.Component{

    constructor(props){
        super(props)
        this.state={
            user:"",
            update:true,
            fname:"",
            lname:"",
            email:"",
            password:"",
            errorMessage:"",
            successMessage:""

            

        }
        this.updateme=this.updateme.bind(this);
        this.updateUser=this.updateUser.bind(this);
        this.onChange=this.onChange.bind(this);
        }
        componentDidMount(){
            this.getUser();
        }
        onChange(e)
        {
            this.setState({
                [e.target.name]:e.target.value
            })
            console.log(this.state)
        }
    updateme()
    {
        this.state.update === true ? this.setState({update: false}) : this.setState({update: true});
    }
    updateUser()
    {
        alert("fname"+this.state.fname+"email"+this.state.email+"password"+this.state.password)
        const URL="http://localhost:8088";
        const endpoint="/user/users/"+this.state.user.email
        const token=`Bearer ${localStorage.getItem("jwttoken")}`;
        axios({
            method:'put',
            url:`${URL}${endpoint}`,
            data:{
            "fname":`${this.state.fname}`,
            "lname":`${this.state.lname}`,
            "email": `${this.state.email}`,
            "password":`${this.state.password}`},
            headers: { 'Content-Type': 'application/json',Authorization: `${token}`}
        })
        .then(response => {
            this.setState({
                successMessage:response.data
            })
            
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
        });
    }
    getUser()
    {
        const URL="http://localhost:8088";
        const endpoint="/user/me"
        const token=`Bearer ${localStorage.getItem("jwttoken")}`;
        axios({
            method:'get',
            url:`${URL}${endpoint}`,
            headers: { 'Content-Type': 'application/json',Authorization: `${token}`}
        })
        .then(response => {
            this.setState({
                user:response.data,
                fname:response.data.fname,
                lname:response.data.lname,
                email:response.data.email,
                password:response.data.password,
            })
            
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
        });

    }
	
	render()
	{
        if(localStorage.getItem("jwttoken")==null)
        {
            return(<div>
                <AlertToast message={"Sorry you are not logged"} hmessage={"Please login"} show={true} type={"danger"}/>
            </div>)
        }
		return( 
        <div className="form-group col-7 mx-auto">
        {this.state.successMessage!=null?<AlertToast message={this.state.successMessage} hmessage={"success"} show={true} type={"success"}/> :null }
        {this.state.errorMessage.length>0?<AlertToast message={this.state.errorMessage} hmessage={"error"} show={true} type={"danger"}/> :null }
        <Card className="center">
        <Card.Header>Account Details</Card.Header>
        <Card.Body>
        <Form.Row>
         <Form.Group as={Col} controlId="formGridEmail">
         <Form.Label>Fristname</Form.Label>
         <Form.Control type="text" placeholder="Frist Name" name="fname" value={this.state.fname} onChange={this.onChange} readOnly={this.state.update} />
         </Form.Group>

         <Form.Group as={Col} controlId="formGridPassword">
         <Form.Label>Lastname</Form.Label>
         <Form.Control type="text" placeholder="Last Name" name="lname" value={this.state.lname} onChange={this.onChange}  readOnly={this.state.update}/>
         </Form.Group>
        </Form.Row>
        <Form.Row>
         <Form.Group as={Col} controlId="formGridEmail">
         <Form.Label>Email</Form.Label>
         <Form.Control type="email" placeholder="Email" name="email" value={this.state.email} onChange={this.onChange} readOnly={this.state.update}/>
         </Form.Group>
         </Form.Row>
         <Form.Row>
         <Form.Group as={Col} controlId="formGridPassword">
         <Form.Label>password</Form.Label>
         <Form.Control type="password" placeholder="password" name="password" value={this.state.password} onChange={this.onChange} readOnly={this.state.update}/>
         </Form.Group>
        </Form.Row>
        <div className="text-left">
            <button className="btn btn-secondary" type="submit" onClick={this.updateme}>Edit</button>
        </div>
        <div className="text-center">
            <button className="btn btn-primary" type="submit" onClick={this.updateUser}>Update/Save</button>
        </div>
        </Card.Body>
        </Card>
        </div>
        )
    }
}
