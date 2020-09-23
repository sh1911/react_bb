import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import {Link} from 'react-router-dom'
import AlertToast from './AlertToast'
export default class Logout extends Component{
  constructor(props)
    {
        
        super(props)
        this.state={
          successMessage:'',
          errorMessage:''
        }
    }
	render()
	{
    if(localStorage.getItem("jwttoken")!=null)
    {
		  return(  
        <div>
          {localStorage.removeItem("jwttoken")}  
          <div>
                 <Redirect to={{
                        pathname:'/home',
                        state:{mssg:"Logged out is successful"},type:"success"}} />
          </div>
        </div>
          ) 
    }
    else
    {
    return(
        <div >
            <Redirect to={{
                        pathname:'/login',
                        state:{errmssg:"System says you were not logged In..Please Login"},type:"danger"}} />
        </div>  
      )
    }          
  }
}