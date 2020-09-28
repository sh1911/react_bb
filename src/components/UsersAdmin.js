import React ,{Component} from 'react';
import {Table,InputGroup,Button,ButtonGroup,Container} from 'react-bootstrap'
import Card from 'react-bootstrap/Card';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faList,faSearch, faTimes, faEdit, faTrash,} from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import { Redirect ,Link} from 'react-router-dom';
import AlertToast from './AlertToast'
import './css/Style.css'
import TabBar from './TabBar'
import ErrorBoundary from './ErrorBoundary';
export default class DonarList extends Component{
    constructor(props){
        super(props)
        this.state={
            pattern:'',
            users: [],
            currentPage:0,
            usersPerPage:3,
            totalPages:0,
            totalElements:0,
            sortDir: "asc",
            sortBy:"date",
            statusCode:"",
        }
        this.searchData=this.searchData.bind(this);
        this.onChange=this.onChange.bind(this);
      
        }
    componentDidMount(){
        
        this.findAllUsers(this.state.currentPage);
        
         
    }
    findAllUsers(currentPage)
    {    
        if(currentPage>0)
            currentPage -=1;
        const url="http://localhost:8088";
        const endPoint="/admin/users";
        const token=`Bearer ${localStorage.getItem("jwttoken")}`;
        const URL=url+endPoint+"?pageNumber="+currentPage+"&pageSize="+this.state.usersPerPage+"&sortBy="+this.state.sortBy+"&sortDir="+this.state.sortDir        //url+endPoint+"?pageNumber="+currentPage+"&sizeSize="+this.state.usersPerPage+"?sortBy="+this.state.sortBy+"?sortDir="+this.state.sortDir

        axios({
            method:'get',
            url:`${URL}`,
            headers: { 'Content-Type': 'application/json',Authorization: `${token}`}
        })
        .then(response => {
            this.setState({
                users:response.data.content,
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
                this.findAllusers(firstPage);
            }
        }
    };

    prevPage = () => {
        let prevPage = 1;
        if(this.state.currentPage > prevPage) {
            if(this.state.pattern) {
                this.searchData(this.state.currentPage - prevPage);
            } else {
                this.findAllUsers(this.state.currentPage - prevPage);
            }
        }
    };

    nextPage = () => {
        if(this.state.currentPage < Math.ceil(this.state.totalElements / this.state.usersPerPage)) {
            if(this.state.pattern) {
                this.searchData(this.state.currentPage + 1);
            } else {
                this.findAllUsers(this.state.currentPage + 1);
            }
        }
    };
    lastPage = () => {
        let condition = Math.ceil(this.state.totalElements / this.state.usersPerPage);
        if(this.state.currentPage < condition) {
            if(this.state.pattern) {
                this.searchData(condition);
            } else {
                this.findAllUsers(condition);
            }
        }
    };
   
    searchData(currentPage)
    {
        currentPage -=1;
        const URL="http://localhost:8088/admin/users/search/"+this.state.pattern+"?page="+currentPage+"&size="+this.state.usersPerPage
        const token=`Bearer ${localStorage.getItem("jwttoken")}`;
        axios({
            method:'get',
            url:`${URL}`,
            headers: { 'Content-Type': 'application/json',Authorization: `${token}`}
        })
        .then(response => {
            this.setState({
                users:response.data.content,
                totalPages:response.data.totalPages,
                totalElements:response.data.totalElements,
                currentPage:response.data.number +1
            })
            
        })   
    }
    cancelSearch = () => {
        this.setState({"pattern" : ''});
        this.findAllUsers(this.state.currentPage);
    };
    onChange(e)
    {
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    sortDate = () => {
            this.state.sortDir === "asc" ? this.setState({sortDir: "desc"}) : this.setState({sortDir: "asc"});
            this.findAllUsers(this.state.currentPage);
    };
    deleteUser = (userId) => {
        const url="http://localhost:8088";
        const endPoint="/admin/users/"+userId;
        const token=`Bearer ${localStorage.getItem("jwttoken")}`;
        const URL=url+endPoint;
        
        axios({
            method:'delete',
            url:`${URL}`,
            headers: { 'Content-Type': 'application/json',Authorization: `${token}`}
        })
        .then(response => {
            console.log(response)
            this.setState({
                successMessage:response.data,
                users:this.state.users.filter(user => user.id != userId)
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

    };
    
    render()
    {
        if(this.state.errorMessage=="403")
        {
            return(
            <Redirect to={{
                pathname:'/home',
                state:{mssg:"You are not authorized as Admin to access admin page"},type:"danger"}} />)
        }
        else if(localStorage.getItem("jwttoken")!=null)
        {
            const {users ,currentPage,totalPages,totalElements}=this.state;        
            return ( <div>
                 {this.props.location.state!=null?<AlertToast message={this.props.location.state.mssg} show={true} hmessage={"success"} type={this.props.location.type}/>:null}
          
                   {this.state.successMessage!=null?<AlertToast message={this.state.successMessage} hmessage={"success"} show={true} type={"success"}/> :null }
                {this.state.errorMessage!=null?<AlertToast message={this.state.errorMessage} hmessage={"error"} show={true} type={"danger"}/> :null }
                <TabBar></TabBar>
             <Card className={"border border-light bg-light text-black"}>
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
                                            <th>UserId</th>
                                            <th>FristName</th>
                                            <th>LastName</th>
                                            <th>Email</th> 
                                            <th>Password</th>                                          
                                            <th>Role</th>
                                            <th  onClick={this.sortDate}>Date<div className={this.state.sortDir === "asc" ? "arrow arrow-up" : "arrow arrow-down"}> </div></th>
                                            <th colSpan="2">Permited OPerations</th>
                                        </tr>

                                </thead>
                                <tbody>
                                    {
                                   users.map((user,index)=>                                       
                                    <tr key={user.id}>
                                        <td>{user.id}</td>
                                        <td>{user.fname}</td>
                                        <td>{user.lname}</td>
                                        <td>{user.email}</td>
                                        <td>{user.password}</td>
                                        <td>{user.role}</td>
                                        <td>{user.date}</td>
                                        <ButtonGroup>
                                                <Link to={"edit/"+user.id} className="btn btn-sm btn-outline-primary"><FontAwesomeIcon icon={faEdit} /></Link>
                                                {'   '}
                                                <Button size="sm" variant="outline-danger" onClick={this.deleteUser.bind(this,user.id)}>{"  "}<FontAwesomeIcon icon={faTrash} /></Button>
                                        </ButtonGroup>
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
                    {totalElements} users Avaliabe now
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