import React, { Component } from 'react';
import {
	Form,
	FormGroup,
	FormControl,
	Button
	}
from 'react-bootstrap';

class Search extends Component {
  submitForm(event){
    event.preventDefault();
    let country = this.country.value;
    let location = this.location.value;
    let keyword = this.keyword.value;
    this.props.getData(keyword, location, country);
	//console.log(country, location, keyword);
  }

  valdate(){

  }
  render() {
    return (
		<div>
			<div className='extract-form' >
				<Form inline onSubmit={this.submitForm.bind(this)}>

					<FormGroup bsSize="large" controlId="Country" validationState={this.valdate()}  >
					  <FormControl inputRef={input => this.country = input} type="text" placeholder="Country" />
					</FormGroup>

					<FormGroup bsSize="large" controlId="location" validationState={this.valdate()}  >
					  <FormControl inputRef={input => this.location = input} type="text" placeholder="Location" />
					</FormGroup>

					<FormGroup bsSize="large" controlId="keyword" validationState={this.valdate()}  >
					  <FormControl inputRef={input => this.keyword = input} type="text" placeholder="Keyword" />
					</FormGroup>

					<Button bsStyle="primary" type="submit">Submit</Button>

				</Form>
			</div>
		</div>
    );
  }
}

export default Search;
