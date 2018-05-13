import React, { Component } from 'react';
import {
	Table,
	ProgressBar
} 
from 'react-bootstrap';

class Display extends Component {
	
  render() {
	var records = this.props.googleData;
	const API = this.props.api;
	const placeURI = this.props.placeURI;
	var rows = [];
	for(let p_id of records.results){
		let dataURI = `${placeURI}${p_id.place_id}${API}`;
		let proxyUrl = 'https://cors-anywhere.herokuapp.com/',
		targetUrl = dataURI
		fetch(proxyUrl + targetUrl)
		.then((res) => res.json())
		.then((data) => {
			let jsonData = JSON.parse(JSON.stringify(data));
			//console.log(jsonData);
			rows.push(jsonData.result);
		})
		.catch((e)=> console.log(`Error! ${e.message}`));
	}
	var rows = [
		{name:'eden', address:'Deenanath Bazar', phone:'9808033480', International: '9808033480', website: 'eden', rating: '5'}
	];
	console.log(rows);
	/*const listItems = rows.map((row) =>{
        <tr key={row.id}>
			<td>row.id</td>
		</tr> 
	}
    );*/

    return (
        <div>
			<ProgressBar now={45} />
			<Table striped bordered condensed hover responsive>
			  <thead>
				<tr>
				  <th>#</th>
				  <th>Name</th>
				  <th>Full Address</th>
				  <th>Phone Number</th>
				  <th>International P.no</th>
				  <th>Website</th>
				  <th>Rating</th>
				</tr>
			  </thead>
			  <tbody>
				{rows.map(( listValue, index ) => {
				  return (
					<tr key={index}>
					  <td>{listValue.id}</td>
					  <td>{listValue.name}</td>
					  <td>{listValue.formatted_address}</td>
					</tr>
				  );
				})}
			  </tbody>
			</Table>
        </div>
    );
  }
}

export default Display;
