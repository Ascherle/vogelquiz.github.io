import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import QuizDataService from "../services/quiz.service";





class EditPageOverview extends React.Component {
  constructor(props) {
    super(props);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.doLogin = this.doLogin.bind(this);


    this.state = {
      username: "",
      password: "",
      loginDone: 0,
      errorMessage: ""
    };
  }


  render() {
    if (this.state.loginDone == 0) {
      return (
        <div>
          <br></br>
          <h1>Bitte einloggen</h1>
          <div className="form-group my-3">
            <label htmlFor="text">Unsername</label>
            <input
              type="text"
              className="form-control"
              id="username"
              required
              value={this.state.username}
              onChange={this.onChangeUsername}
              name="username"
            />
          </div>

          <div className="form-group my-3">
            <label htmlFor="path">Passwort</label>
            <input
              type="password"
              className="form-control"
              id="password"
              required
              value={this.state.password}
              onChange={this.onChangePassword}
              name="password"
            />
          </div>

          <div>
            <button onClick={this.doLogin} className="btn btn-dark">
              Login
            </button>

            <Link
              className="btn btn-dark mx-3"
              role="button"
              to="/"
            >
              abbrechen
            </Link>

          </div>
          <p className="mt-3 text-danger">{this.state.errorMessage}</p>
        </div>
      )
    }
    else {
      return (
        <div className="text-center">
          <br></br>
          <h1>Level Editor</h1>
          <div className="my-3">
            <Button className="btn-dark">Level 1 bearbeiten</Button>
          </div>
          <div className="my-3">
            <Button className="btn-dark">Level 2 bearbeiten</Button>
          </div>
          <div className="my-3">
            <Link
              className="btn btn-dark"
              role="button"
              to='/editlvl'>
              Level 3 bearbeiten
            </Link>
          </div>


        </div>
      );
    };
  }




  /*handleClick(path){
    const history = useHistory();
    history.push(path);
  }*/

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  doLogin() {

    // hole passwort zu userName von Server
    // userName,passwort eingegebenn im Formular
    const user_name = this.state.username;
    QuizDataService.getUser(this.state.username)
      .then(response => {
        console.log(response.data);
        if (response.data.password == this.state.password) {
          console.log("**Login OK!");
          this.setState({
            loginDone: 1
          });
          //alert("Logged in");
        }
        else {
          // User / Password does not fit
          this.setState({
            errorMessage: "User / Password Fehler!"
          });

        }

      })
      .catch(e => {
        console.log("Login Fehler");
        console.log(e);
        this.setState({
          errorMessage: "Quiz DB Server nicht verfügbar! "
        });
        // und noch button deaktivieren
      });

  }

  componentDidMount() {
    console.log("App.componentDidMount) being invoked");


  }









}
export default EditPageOverview;