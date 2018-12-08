import React, {Component} from 'react';

import Login from './Login';
import SignUp from './SignUp';

class Auth extends Component {

  state = {
    showLogin: true
  }

  toggleLoginSignUp = () => {
    if(this.state.showLogin) {
      this.setState({
        showLogin: false
      })
    } else {
      this.setState({
        showLogin: true
      })
    }

  }

  render() {
    return (
      (this.state.showLogin)
      ? (
        <div>
          <Login authenticate={this.props.authenticate} />
          <p>No account? <button onClick={this.toggleLoginSignUp}>Sign up!</button></p>
        </div>
      )
      : (
        <div>
          <SignUp authenticate={this.props.authenticate} />
            <p>Have an account? <button onClick={this.toggleLoginSignUp}>Log In!</button></p>
        </div>
      )
    )
  }

};

export default Auth;
