import React, {Component} from 'react';
import {Link} from 'react-router';

export default class Layout extends Component {
  render() {
    return <div>
      <div>
        <Link to="/register">Register</Link> -
        <Link to="/login">Login</Link> -
        <Link to="/personal">Personal</Link>
      </div>
      <div>{this.props.children}</div>
    </div>
  }
}