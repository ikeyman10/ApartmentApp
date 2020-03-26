import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Badge, UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem } from 'reactstrap';
import PropTypes from 'prop-types';

import { AppAsideToggler, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';

//import logo from '../../assets/img/brand/weather2020logo.png'
import Logo from '../../assets/img/SHAMANA_FINAL_INVERTED.png';
import Logo2 from '../../assets/img/toptal-logo.png';


import sygnet from '../../assets/img/brand/sygnet.svg'

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {


  constructor(props) {
    super(props);

  
    this.state = {
      adminLoggedIn: false
    };
  }

  componentDidMount(){

    if(localStorage.adminLoggedIn === "1x2x3x4x5"){
      this.setState({adminLoggedIn : true})
    }

  }


  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{ src: Logo2, width: 100, height: 50, alt: 'shamanalogo' }}
          minimized={{ src: Logo2, width: 30, height: 30, alt: 'shamanalogo' }}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />

       

            {this.state.adminLoggedIn ? (
              //Loading
              <Nav className="d-md-down-none" navbar>
              <NavItem className="px-3">
                <NavLink to="/dashboard" className="nav-link" >Dashboard</NavLink>
              </NavItem>
              <NavItem className="px-3">
                <NavLink to="/users" className="nav-link" >Users</NavLink>
              </NavItem>
              <NavItem className="px-3">
                <NavLink to="/properties" className="nav-link" >Apartments</NavLink>
              </NavItem>
              </Nav>
              
      
            ) : (
              
              <Nav className="d-md-down-none" navbar>
              <NavItem className="px-3">
                <NavLink to="/dashboard" className="nav-link" >Dashboard</NavLink>
              </NavItem>
              </Nav>

            )}
          {/* <NavItem className="px-3">
            <Link to="/users" className="nav-link">Users</Link>
          </NavItem>
          <NavItem className="px-3">
            <NavLink to="#" className="nav-link">Test</NavLink>
          </NavItem> */}
        <Nav className="ml-auto" navbar>
          {/* <NavItem className="d-md-down-none">
            <NavLink to="#" className="nav-link"><i className="icon-bell"></i><Badge pill color="danger">5</Badge></NavLink>
          </NavItem>
          <NavItem className="d-md-down-none">
            <NavLink to="#" className="nav-link"><i className="icon-list"></i></NavLink>
          </NavItem>
          <NavItem className="d-md-down-none">
            <NavLink to="#" className="nav-link"><i className="icon-location-pin"></i></NavLink>
          </NavItem> */}
          <UncontrolledDropdown nav direction="down">
            <DropdownToggle nav>
              <img src={'../../assets/img/avatars/default.jpg'} className="img-avatar" alt="" />
            </DropdownToggle>
            <DropdownMenu right>
              {/* <DropdownItem header tag="div" className="text-center"><strong>Account</strong></DropdownItem>
              <DropdownItem><i className="fa fa-bell-o"></i> Updates<Badge color="info">42</Badge></DropdownItem>
              <DropdownItem><i className="fa fa-envelope-o"></i> Messages<Badge color="success">42</Badge></DropdownItem>
              <DropdownItem><i className="fa fa-tasks"></i> Tasks<Badge color="danger">42</Badge></DropdownItem>
              <DropdownItem><i className="fa fa-comments"></i> Comments<Badge color="warning">42</Badge></DropdownItem>
              <DropdownItem><i className="fa fa-wrench"></i>Settings</DropdownItem>
              <DropdownItem><i className="fa fa-usd"></i> Payment Info</DropdownItem>
              <DropdownItem divider />
              <DropdownItem><i className="fa fa-shield"></i> Lock Account</DropdownItem>
            
            */}
              <DropdownItem header tag="div" className="text-center"><strong>Settings</strong></DropdownItem>
         
              
              <DropdownItem onClick={e => this.props.onLogout(e)}><i className="fa fa-lock"></i> Logout</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
        {/* <AppAsideToggler className="d-md-down-none" /> */}
        {/*<AppAsideToggler className="d-lg-none" mobile />*/}
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
