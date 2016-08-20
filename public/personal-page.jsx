import React, {Component} from 'react';
import request from 'superagent';
import {hashHistory} from 'react-router';

export default class PersonalPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'unknown',
      greeting: 'unknown'
    }
  }

  componentWillMount() {
    request
      .get('/api/personal')
      .end((err, res) => {
        console.log(err);
        if (err) {
          if (res.statusCode === 401) {
            alert('please login!');
            return hashHistory.push('/login');
          } else {
            return alert(err);
          }
        }
        const {username, greeting} = res.body;
        this.setState({username, greeting});
      })
  }

  render() {
    return <div>
      <div>Personal Page</div>
      <div>Username: {this.state.username}</div>
      <div>Greeting: {this.state.greeting}</div>
    </div>;
  }
}