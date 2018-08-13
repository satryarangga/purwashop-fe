import React from 'react';
import { Link, Redirect } from 'react-router-dom';
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
      auth: false
    };
  }

  componentDidMount() {
    const auth = JSON.parse(localStorage.getItem('purwashop_auth'));

    if(auth && auth.name) {
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

  handleLogout() {
    localStorage.removeItem("purwashop_auth");
    window.location.reload();
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
        <UncontrolledDropdown>
          <DropdownToggle>Halo {auth.name}</DropdownToggle>
          <DropdownMenu right>
            <DropdownItem>
              <a style={{cursor:"pointer"}} onClick={this.handleLogout.bind(this)}>Logout</a>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      )
    }
  }

  render() {
    const { name } = this.props;
    const { auth, redirect } = this.state;

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
                <NavLink href="/cart/">Cart</NavLink>
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