import React, { Component } from "react";
import QuizDataService from "../services/quiz.service";
import { Link } from "react-router-dom";

export default class AddQuiz extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
    this.onChangePath = this.onChangePath.bind(this);
    this.saveQuiz = this.saveQuiz.bind(this);
    this.newQuiz = this.newQuiz.bind(this);

    this.state = {
      id: null,
      title: "",
      description: "",
      text: "",
      path: "",
      published: false,
      submitted: false
    };
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  onChangeText(e) {
    this.setState({
      text: e.target.value
    });
  }

  onChangePath(e) {
    this.setState({
      path: e.target.value
    });
  }

  saveQuiz() {
    var data = {
      title: this.state.title,
      description: this.state.description,
      text: this.state.text,
      path: this.state.path,
    };

    QuizDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          text: response.data.text,
          path: response.data.path,
          published: response.data.published,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newQuiz() {
    this.setState({
      id: null,
      text: "",
      title: "",
      description: "",
      path: "",
      published: false,

      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form text-center">
        {this.state.submitted ? (
          <div>
            <br></br>
            <h4>Der Vogel wurde hinzugefügt!</h4>
            <button className="btn btn-dark mx-2" onClick={this.newQuiz}>
              weiterer Eintrag
            </button>
            <Link className="btn btn-dark mx-2" to="/editlvl">
              Übersicht
            </Link>
          </div>
        ) : (
          <div>
            <div className="form-group my-3">
              <label htmlFor="text">Vogelname</label>
              <input
                type="text"
                className="form-control"
                id="text"
                required
                value={this.state.text}
                onChange={this.onChangeText}
                name="text"
              />
            </div>

            <div className="form-group my-3">
              <label htmlFor="title">wissenschaftlicher Name</label>
              <input
                type="text"
                className="form-control"
                id="title"
                required
                value={this.state.title}
                onChange={this.onChangeTitle}
                name="title"
              />
            </div>

            <div className="form-group my-3">
              <label htmlFor="description">Beschreibung</label>
              <input
                type="text"
                className="form-control"
                id="description"
                required
                value={this.state.description}
                onChange={this.onChangeDescription}
                name="description"
              />
            </div>

            <div className="form-group my-3">
              <label htmlFor="path">Pfad zum Bild</label>
              <input
                type="text"
                className="form-control"
                id="path"
                required
                value={this.state.path}
                onChange={this.onChangePath}
                name="text"
              />
            </div>

            <div>
              <button onClick={this.saveQuiz} className="btn btn-dark mx-2">
                Eintrag erstellen
              </button>

              <Link
                className="btn btn-dark mx-2"
                role="button"
                to='/editlvl'
              >
                abbrechen
              </Link>
            </div>




          </div>
        )}
      </div>
    );
  }
}