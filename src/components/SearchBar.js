import React from 'react';
import {Navbar,Button,FormControl,Form} from 'react-bootstrap'

class SearchBar extends React.Component {
	
	render(){

		return(<div>
				<Navbar bg="light" variant="dark">
					<Form inline>
						<FormControl type="text" placeholder="Search" className="mr-sm-2" />
						<Button variant="outline-dark">Search</Button>
					</Form>
				</Navbar>
			</div>
			);
		
		}
}
export  default SearchBar;