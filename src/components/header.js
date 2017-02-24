import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

class Header extends Component {

  renderLinks() {
    if (this.props.authenticated) {
      // show sign out
      return (
        <li className='nav-item'>
          <Link className='nav-link' to='/signout'>Sign Out</Link>
        </li>
      );
    }else {
      // show sign in or sign up, we can return an array to show more than one
      // nothing ever changes in these links so we can use an integer for the key
      return [
        <li className='nav-item' key={1}>
          <Link className='nav-link' to='/signin'>Sign In</Link>
        </li>,
        <li className='nav-item' key={2}>
          <Link className='nav-link' to='/signup'>Sign Up</Link>
        </li>
      ];
    }
  }

  render() {
    return (
      <nav className='navbar navbar-light'>
        <Link to='/' className='navbar-brand'>Redux Auth</Link>
        <ul className='nav navbar-nav'>
          {this.renderLinks()}
        </ul>
      </nav>
    );
  }
}

function mapStateTopProps(state) {
  return{
    authenticated: state.auth.authenticated
  };
}

export default connect(mapStateTopProps)(Header);