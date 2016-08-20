import React, {Component} from 'react';

export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
  }

  render() {
    return <form onSubmit={this._onSubmit.bind(this)}>
      <div>
        Login
      </div>
      <div>
        <input type="text" placeholder="username"/>
      </div>
      <div>
        <input type="password" placeholder="password"/>
      </div>
      <div>
        <button type="submit">Login</button>
      </div>
    </form>
  }

  _onSubmit(event) {
    event.preventDefault();
    alert('x');
  }

}