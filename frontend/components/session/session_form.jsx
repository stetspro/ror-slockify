//path is being passed as a string from the sign up and login containers. change this so it just references ownProps
//formType and also be a reference to ownProps

import React from "react";
import { Route } from "react-router-dom";
import Logo from "../headers/logo";
import EmailForm from "./email_form";
import SignupStepTwo from "./signup_step_two";
import LoginStepTwo from "./login_step_two";
import LogoutContainer from "./logout_container";


class SessionForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      fullName: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.update = this.update.bind(this);
    this.loginDemoUser = this.loginDemoUser.bind(this);
  }

  update(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  // loginToSpotify() {
  //   if (this.props.path === 'signup') {
  //     spotifyLogin().then((res) => {
  //       console.log(res)
  //     })
  //   } 
  // }

  handleSubmit() {
    this.props.action(this.state)
  }

  showErrors() {
    return this.props.errors.map((error, idx) => <li key={`${idx}e`}>{error}</li>)
  }

  loginDemoUser() {
    const demoUser = { email: "demouser@slockify.io", password: "password123!" };
    this.props.formType === "Sign Up" ? this.props.demo(demoUser) : this.props.action(demoUser);
  }

  componentWillUnmount () {
    this.props.clearErrors();
  }


  render() {
    return (
      <div className="auth-container">
        <div className="">
          <Logo />
        </div>
        {
    
        }
        <div>
          <Route exact path={`/${this.props.path}`} render={
            (props) => 
            <EmailForm {...props} 
              update={this.update} 
              email={this.state.email}
              loginDemoUser={this.loginDemoUser} 
              clearErrors={this.props.clearErrors} 
            />
          }/>

          <Route path="/signup/2" render={
              (props) =>
                <SignupStepTwo {...props} 
                  update={this.update} 
                  password={this.state.password} 
                  fullName={this.state.fullName}
                  handleSubmit={this.handleSubmit}
                  clearErrors={this.props.clearErrors}  
                />
          }/>
          <Route path="/login/2" render={
            (props) => 
              <LoginStepTwo {...props} 
                handleSubmit={this.handleSubmit}
                update={this.update} 
                password={this.state.password}
                clearErrors={this.props.clearErrors} 
              />
          }/>
        </div>
        <ul>
          {
            this.props.errors.length >= 1 ? this.showErrors() : ""
          }
        </ul>
        <LogoutContainer />
      </div>
    )
  }

}

export default SessionForm;