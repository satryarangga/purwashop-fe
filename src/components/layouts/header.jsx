import React from 'react';
import { Link } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      auth: {}
    };
  }

  componentDidMount() {
    const auth = JSON.parse(localStorage.getItem('purwashop_auth'));

    if(auth.name) {
      this.setState({
        auth
      });
    }
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  showAuth() {
    const { auth } = this.state;
    if(!auth) {
      return (
        <NavItem>
          <NavLink href="/register/">Register</NavLink>
        </NavItem>
      )
    } else {
      return(
        <NavItem>
          <NavLink>Halo {auth.name}</NavLink>
        </NavItem>
      )
    }
  }

  render() {
    const { name } = this.props;
    const { auth } = this.state;

    return (
      <div>
        <Navbar color="light" light expand="md">
          <Link to='/'>
            <NavbarBrand>Toko Purwashop</NavbarBrand>
          </Link>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/components/">Cart</NavLink>
              </NavItem>
              {
                this.showAuth()
              }
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

const Multiple = () => {
  return (
    <h1>Test</h1>
  )
}

export default Header;