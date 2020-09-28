import {Navbar,Nav} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import React ,{Component} from 'react';
import './css/Style.css'
export default class TabBar extends Component{

    render()
    {
        return(
            <div className="border border-light bg-light text-black mr-auto">
            <Nav variant="tabs" >
                <Nav.Item>
                <Nav.Link href="/admin/userslist"> Users </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                <Nav.Link href="/admin/donarslist"> Donars </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                </Nav.Item>
            </Nav>
            </div>)
    }

}