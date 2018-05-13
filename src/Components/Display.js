import React, { Component } from 'react';
import {
    Table,
    Button
}
from 'react-bootstrap';


class Display extends Component {
    constructor(props) {
      super(props);
      this.state={
          rows: []
      }
    }

    viewMoreCall = () => {
      this.props.viewMore();
    }

    componentDidMount() {
      this.setData();
    }

    componentDidUpdate(prevProps) {
      if (this.props !== prevProps) { // only fetch if props changed
        this.setData();
      }
    }

  setData() {
      //const { records, API, placeURI } = this.props;
      const records = this.props.googleData;
      const API = this.props.api;
      const placeURI = this.props.placeURI;
      const results = records.results.map((p_id) => {
        const dataURI = `${placeURI}${p_id.place_id}${API}`;
        const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
        return fetch(proxyUrl + dataURI)
          .then(res => res.json())
          .then((data) => {
            const jsonData = JSON.parse(JSON.stringify(data));
            return jsonData.result;
          });
    });
    Promise.all(results)
      .then(res =>
        this.setState(prevState => ({
          rows: [...prevState.rows, ...res],
        })))
      .catch(e => console.log(`Error! ${e.message}`));
  }

    render() {
		//console.log(this.state.rows);
		return (
			<div>

				<Table striped bordered condensed hover responsive>
				  <thead>
  					<tr>
  					  <th>#</th>
  					  <th>Name</th>
  					  <th>Full Address</th>
  					  <th className="pno">Phone</th>
  					  <th className="pno">International P.no</th>
  					  <th>Website</th>
  					  <th>Rating</th>
  					</tr>
				  </thead>
				  <tbody>
					{this.state.rows.map(( listValue, index ) => {
					  return (
						<tr key={index}>
						  <td>{index}</td>
						  <td>{listValue.name}</td>
						  <td>{listValue.formatted_address}</td>
						  <td>{listValue.formatted_phone_number}</td>
						  <td>{listValue.international_phone_number}</td>
						  <td><a href={listValue.website}>{listValue.website}</a></td>
						  <td>{listValue.rating}</td>
						</tr>
					  );
					})}
				  </tbody>
				</Table>
        <Button onClick={this.viewMoreCall} type="button">View More...</Button>
			</div>
		);
	}

}
export default Display;
