import React from 'react';
import Image from 'react-image-resizer';
import {Navbar,Nav,Dropdown,DropdownButton} from 'react-bootstrap'
import {Link} from 'react-router-dom'
class NavigationBar extends React.Component{
	
	render()
	{
		return(<div>
				<Navbar bg="primary" variant="dark">
				
						<Image
						src={require('../images/blood004.jpeg')} 
						
						height={ 30}
						width={ 30}
					/>
					<Nav className="mr-auto">
					<Link to={"/home"} className="navbar-brand">BloodBrother</Link>	
					<Link to={"/add"} className="nav-link">Donars List</Link>
					<Link to={"/list"} className="nav-link">Donate Blood</Link>
					</Nav>
					<Navbar sticky="bottom" >
					<Nav className="mr-auto">
					<Nav.Link href="/admin/userslist">Admin</Nav.Link>
					<Nav.Link href="/register">Register</Nav.Link>
					<DropdownButton id="dropdown-basic-button" title=" Account">
					  <Dropdown.Item href="/Account">Your Account</Dropdown.Item>
					  <Dropdown.Item href="/login">login</Dropdown.Item>
					  <Dropdown.Item href="/logout">logout</Dropdown.Item>
					  
					</DropdownButton>

					</Nav>
					</Navbar>
				</Navbar>
	  </div>);
	}
	
}
export  default NavigationBar;