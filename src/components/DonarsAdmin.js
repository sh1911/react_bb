import React ,{Component} from 'react';
import {Table,InputGroup,Button,ButtonGroup,Container} from 'react-bootstrap'
import Card from 'react-bootstrap/Card';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faList,faSearch, faTimes, faEdit, faTrash,} from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import {Link} from 'react-router-dom';
import AlertToast from './AlertToast'
import TabBar from './TabBar'
import './css/Style.css'

export default class DonarList extends Component{
    constructor(props){
        super(props)
        this.state={
            pattern:'',
            donars: [],
            currentPage:0,
            usersPerPage:5,
            totalPages:0,
            totalElements:0,
            sortDir: "asc",
            sortBy:"date",
            successMessage:null,
            errorMessage:null
        }
        this.searchData=this.searchData.bind(this);
        this.onChange=this.onChange.bind(this);
        }
    componentDidMount(){
        this.findAllDonars(this.state.currentPage);
         
    }
    findAllDonars(currentPage)
    {    
        if(currentPage>0)
            currentPage -=1;
        const url="http://localhost:8088";
        const endPoint="/admin/donars";
        const token=`Bearer ${localStorage.getItem("jwttoken")}`;
        const URL=url+endPoint+"?pageNumber="+currentPage+"&pageSize="+this.state.usersPerPage+"&sortBy="+this.state.sortBy+"&sortDir="+this.state.sortDir        //url+endPoint+"?pageNumber="+currentPage+"&sizeSize="+this.state.usersPerPage+"?sortBy="+this.state.sortBy+"?sortDir="+this.state.sortDir

        axios({
            method:'get',
            url:`${URL}`,
            headers: { 'Content-Type': 'application/json',Authorization: `${token}`}
        })
        .then(response => {
            this.setState({
                donars:response.data.content,
                totalPages:response.data.totalPages,
                totalElements:response.data.totalElements,
                currentPage:response.data.number +1
            })
            
        })  
        .catch(err =>{
            if(err.response!=null)
            {
            this.setState({
                errorMessage:err.response.status})
            }
            else
            {
                this.setState({
                    errorMessage:err.message})
             
            }
        });
    }
    changePage = event => {
        let targetPage = parseInt(event.target.value);
        if(this.state.pattern) {
            this.searchData(targetPage);
        } else {
            this.findAllBooks(targetPage);
        }
        this.setState({
            [event.target.name]: targetPage
        });
    };
    firstPage = () => {
        let firstPage = 1;
        if(this.state.currentPage > firstPage) {
            if(this.state.pattern) {
                this.searchData(firstPage);
            } else {
                this.findAllDonars(firstPage);
            }
        }
    };

    prevPage = () => {
        let prevPage = 1;
        if(this.state.currentPage > prevPage) {
            if(this.state.pattern) {
                this.searchData(this.state.currentPage - prevPage);
            } else {
                this.findAllDonars(this.state.currentPage - prevPage);
            }
        }
    };

    nextPage = () => {
        if(this.state.currentPage < Math.ceil(this.state.totalElements / this.state.usersPerPage)) {
            if(this.state.pattern) {
                this.searchData(this.state.currentPage + 1);
            } else {
                this.findAllDonars(this.state.currentPage + 1);
            }
        }
    };
    lastPage = () => {
        let condition = Math.ceil(this.state.totalElements / this.state.usersPerPage);
        if(this.state.currentPage < condition) {
            if(this.state.pattern) {
                this.searchData(condition);
            } else {
                this.findAllDonars(condition);
            }
        }
    };
   
    searchData(currentPage)
    {
        currentPage -=1;
        const URL="http://localhost:8088/admin/donars/search/"+this.state.pattern+"?page="+currentPage+"&size="+this.state.usersPerPage;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
        const token=`Bearer ${localStorage.getItem("jwttoken")}`;
        axios({
            method:'get',
            url:`${URL}`,
            headers: { 'Content-Type': 'application/json',Authorization: `${token}`}
        })
        .then(response => {
            this.setState({
                donars:response.data.content,
                totalPages:response.data.totalPages,
                totalElements:response.data.totalElements,
                currentPage:response.data.number +1
            })
            
        })   
    }
    cancelSearch = () => {
        this.setState({"pattern" : ''});
        this.findAllDonars(this.state.currentPage);
    };
    onChange(e)
    {
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    sortDate = () => {
            this.state.sortDir === "asc" ? this.setState({sortDir: "desc"}) : this.setState({sortDir: "asc"});
            this.findAllDonars(this.state.currentPage);
    };
    deleteDonar = (donarId) => {
        const url="http://localhost:8088";
        const endPoint="/admin/donars/"+donarId;
        const token=`Bearer ${localStorage.getItem("jwttoken")}`;
        const URL=url+endPoint;
        alert("dleleting donar with donarId: "+donarId)
        axios({
            method:'delete',
            url:`${URL}`,
            headers: { 'Content-Type': 'application/json',Authorization: `${token}`}
        })
        .then(response => {
            console.log(response)
            this.setState({
                successMessage:response.data,
                donars:this.state.donars.filter(donar => donar.id != donarId)
                })
                alert(this.state.successMessage)

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

        this.findAllDonars(this.state.currentPage);

    };
    render()
    {
        if(this.state.errorMessage==="403")
        {
            return(
            <Redirect to={{
                pathname:'/home',
                state:{mssg:"You are not authorized as Admin to access admin page",type:"danger"}}} />)
        }
        else if(localStorage.getItem("jwttoken")!=null)
        {
            const {donars ,currentPage,totalPages,totalElements}=this.state;        
            return ( <div className="jav">
            {this.state.successMessage!=null?<AlertToast message={this.state.successMessage} hmessage={"success"} show={true} type={"success"}/> :null }
            {this.state.errorMessage!=null?<AlertToast message={this.state.errorMessage} hmessage={"error"} show={true} type={"danger"}/> :null }
            <TabBar></TabBar>
            <Card className={"border border-light bg-light text-black scrollable "}>
            <Card.Header><FontAwesomeIcon icon={faList}/>{' '}Donars List
            <div style={{"float":"right"}}>
                <InputGroup size="sm">
                <input type="text" placeholder="Search" name="pattern" value={this.state.pattern}  className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" onChange={this.onChange}/>
                <InputGroup.Append>
                    <Button size="sm" variant="outline-info" type="button" onClick={this.searchData}>
                        <FontAwesomeIcon icon={faSearch}/>
                    </Button>
                    <Button size="sm" variant="outline-secondary" type="button" onClick={this.cancelSearch}>
                        <FontAwesomeIcon icon={faTimes} />
                    </Button>
                </InputGroup.Append>
                </InputGroup>
             </div>
            </Card.Header>
                    <Card.Body>
                            <Table striped bordered hover variant="light">
                                <thead>
                                        <tr > 
                                            <th>Donar Name</th>
                                            <th>Donar Email</th>
                                            <th>BloodGroup</th>
                                            <th>City</th>
                                            <th>State</th>
                                            <th>Country</th>
                                            <th  onClick={this.sortDate}>Date<div className={this.state.sortDir === "asc" ? "arrow arrow-up" : "arrow arrow-down"}> </div></th>
                                            <th>Permited Actions</th>
                                        </tr>

                                </thead>
                                <tbody>
                                    {
                                   donars.map((donar,index)=>                                       
                                    <tr key={donar.id}>
                                        <td>{donar.name}</td>
                                        <td>{donar.email}</td>
                                        <td>{donar.bloodgroup}</td>
                                        <td>{donar.city}</td> 
                                        <td>{donar.state}</td>
                                        <td>{donar.country}</td>
                                        <td>{donar.date}</td>
                                        <td><Button size="sm" variant="outline-danger" onClick={this.deleteDonar.bind(this,donar.id)}><FontAwesomeIcon icon={faTrash} /></Button></td>
                                    </tr>                                                                                                           
                                    )
                                } 
                                </tbody>
                            </Table>
                </Card.Body>
                <Card.Footer align="center">
                    <div style={{"float":"left"}}>
                        Showing Pages {currentPage} of {totalPages}
                    </div>
                    {totalElements} Donars Avaliabe now
                    <div style={{"float":"right"}}>
                        <InputGroup size="sm">
                                <InputGroup.Prepend>
                                    <Button type="button" variant="outline-info" disable={currentPage===1 ?true:false} onClick={this.firstPage}>
                                        First
                                    </Button>
                                    <Button type="button" variant="outline-info" disable={currentPage===1 ?true:false} onClick={this.prevPage}>
                                        Prev
                                    </Button>
                                </InputGroup.Prepend>
                               
                                <InputGroup.Append>
                                    <Button type="button" variant="outline-info" disable={currentPage===totalPages ?true:false} onClick={this.nextPage}>
                                        Next
                                    </Button>
                                    <Button type="button" variant="outline-info" disable={currentPage===totalPages ?true:false} onClick={this.lastPage}>
                                        Last
                                    </Button>
                                </InputGroup.Append>
                        </InputGroup>
                    </div></Card.Footer>
                </Card>
                </div>
            )
            }
            else
            {
                console.log(localStorage.getItem("jwttoken"))
                return <Redirect to={"/login"}/>
                
            }
        

        
    }


}