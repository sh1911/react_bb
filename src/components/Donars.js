import React from 'react';
import Table from 'react-bootstrap/Table'
import Card from 'react-bootstrap/Card'
class Donars extends React.Component{
	
	render()
	{
		return( <Card className="">
        <Card.Header>Donars List </Card.Header>
        <Card.Body>
        <Table striped bordered hover>
  <thead>
    <tr>
      <th>#</th>
      <th>First Name</th>
      <th>Last Name</th>
      <th>Username</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <td>2</td>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
    <tr>
      <td>3</td>
      <td colSpan="2">Larry the Bird</td>
      <td>@twitter</td>
    </tr>
  </tbody>
</Table>

        </Card.Body>

        </Card>
    )

        }
    }
export default Donars;