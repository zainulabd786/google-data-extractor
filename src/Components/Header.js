import React, { Component } from 'react';
import {Navbar, Nav, NavItem} from 'react-bootstrap';


class Header extends Component {

  render() {
    let linkToShow = <NavItem href="https://edensolutions.co.in">Go to Main Site</NavItem>
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
          <div className="header-text-wrapper">
            <div className="google-wrapper">
              <div className="g">G</div>
              <div className="o">o</div>
              <div className="o2">o</div>
              <div className="g2">g</div>
              <div className="l">l</div>
              <div className="e">e</div>
            </div>
            <div>
              <div className="heading">Data Extractor</div>
              <div className="eden-sol">By Eden Solutions</div>
            </div>
          </div>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          {linkToShow}
        </Nav>
      </Navbar>
    );
  }
}

export default Header;
