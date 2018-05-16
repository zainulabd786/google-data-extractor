import React, { Component } from 'react';
import Search from './Components/Search';
import Display from './Components/Display';
import Header from './Components/Header';
import Instructions from './Components/Instructions';
import Progress from './Components/ProgressBar';

const URI = 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=';
const placeURI = 'https://maps.googleapis.com/maps/api/place/details/json?placeid=';
//const API = '&key=XXXXXXXXXXXXXXXXXXXXXXXXX';
const API = '&key=XXXXXXXXXXXXXXXXXXXXXXXXXXXX';
class Extractor extends Component {

	getData = (keyword, location, country) => {
		let dataURI = `${URI}${keyword}+${location}+${country}${API}`;
		let proxyUrl = 'https://cors-anywhere.herokuapp.com/',
		targetUrl = dataURI
		fetch(proxyUrl + targetUrl)
		.then((res) => res.json())
		.then((data) => {

			let jsonData = JSON.parse(JSON.stringify(data));
			let nextPageToken = jsonData.next_page_token;
			this.setState({nextPage: nextPageToken, googleData: jsonData, dataURI });

			//console.log(dataURI");
		})
		.catch((e)=> console.log(`Error! ${e.message}`));
	}

	isEmpty = (obj) => {
		for(var key in obj) {
			if(obj.hasOwnProperty(key))
				return false;
		}
		return true;
	}

  viewMore = () => {
    let dataURI = `${this.state.dataURI}&pagetoken=${this.state.nextPage}`;
		let proxyUrl = 'https://cors-anywhere.herokuapp.com/',
		targetUrl = dataURI
		fetch(proxyUrl + targetUrl)
		.then((res) => res.json())
		.then((data) => {

			let jsonData = JSON.parse(JSON.stringify(data));
			let nextPageToken = jsonData.next_page_token;
			this.setState({nextPage: nextPageToken, googleData: jsonData, dataURI });
			//console.log(dataURI");
		})
		.catch((e)=> console.log(`Error! ${e.message}`));
  }

	constructor(props){
		super(props);
		this.state = {
			googleData: [],
			nextPage: '',
      dataURI: ''
		}
	}

 render() {
	 let displayData;
	 if(this.state.googleData.status === 'OK'){
		 displayData = <Display googleData={this.state.googleData} nextPageToken = {this.state.nextPage} api={API} placeURI = {placeURI} viewMore = {this.viewMore} />
	 }
	 else{
		 displayData = <Instructions />
	 }
   //console.log(this.state.dataURI);
    return (
      <div>
				<div className='progressbar'>
					<Progress />
				</div>

				<Header />
        <section>
          <Search getData={this.getData} />
			    {displayData}
        </section>
      </div>
    );
  }
}

export default Extractor;
