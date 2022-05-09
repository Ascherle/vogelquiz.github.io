import React, { Component } from "react";
import QuizDataService from "../services/quiz.service";
import { Link } from "react-router-dom";
import ImageView from "../components/ImageView";

export default class QuizesList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveQuizes = this.retrieveQuizes.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveQuiz = this.setActiveQuiz.bind(this);
    this.removeQuiz = this.removeQuiz.bind(this);
    this.removeAllQuizes = this.removeAllQuizes.bind(this);
    this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      quizes: [],
      currentQuiz: null,
      currentIndex: -1,
      searchTitle: ""
    };
  }

  componentDidMount() {
    this.retrieveQuizes();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  retrieveQuizes() {
    QuizDataService.getAll()
      .then(response => {
        this.setState({
          quizes: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveQuizes();
    this.setState({
      currentQuiz: null,
      currentIndex: -1
    });
  }

  setActiveQuiz(quiz, index) {
    this.setState({
      currentQuiz: quiz,
      currentIndex: index
    });
  }

  removeQuiz() {
    QuizDataService.delete(this.state.currentQuiz.id)
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  removeAllQuizes() {
    QuizDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchTitle() {
    this.setState({
      currentQuiz: null,
      currentIndex: -1
    });

    QuizDataService.findByTitle(this.state.searchTitle)
      .then(response => {
        this.setState({
          quizes: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchTitle, quizes, currentQuiz, currentIndex } = this.state;

    return (
      <div className="container">
        <div className="col-md-12">
          <br></br>
          <div className="input-group mb-5">
            <input
              type="text"
              className="form-control"
              placeholder="Eintrag Suchen"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />

            <div className="input-group-append">
              <button
                className="btn btn-dark"
                type="button"
                onClick={this.searchTitle}
              >
                Suchen
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-12">
          <h4 className="text-center">Eingetragene Vögel</h4>
          <ul className="list-group mt-3">
            {quizes &&
              quizes.map((quiz, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveQuiz(quiz, index)}
                  key={index}
                >
                  {quiz.title}
                </li>
              ))}
          </ul>

          <div className="col-12">

            <Link
              className="btn btn-sm btn-dark"
              role="button"
              to='/add-entry'
            >
              Neuen Vogel hinzufügen
            </Link>

            <button
              className="m-3 btn btn-sm btn-dark"
              onClick={this.removeQuiz}
            >
              Eintrag löschen
            </button>


            <button
              className="btn btn-sm btn-danger"
              onClick={this.removeAllQuizes}
            >
              alle Einträge löschen
            </button>


          </div>

        </div>
        <div className="mt-5">
          {currentQuiz ? (
            <div className="row">
              <div className="col-md-6">
                <ImageView path={currentQuiz.path} />
              </div>
              <div className="col-md-6">
                <div>
                  <label>
                    <strong>Vogelname:</strong>
                  </label>{" "}
                  {currentQuiz.text}
                </div>
                <div>
                  <label>
                    <strong>wissenschaftlicher Name:</strong>
                  </label>{" "}
                  {currentQuiz.title}
                </div>
                <div>
                  <label>
                    <strong>Beschreibung:</strong>
                  </label>{" "}
                  {currentQuiz.description}
                </div>
                <div>
                  <label>
                    <strong>Bild:</strong>
                  </label>{" "}
                  {currentQuiz.path}
                </div>
              </div>

            </div>
          ) : (
            <div>
              <br />

            </div>
          )}
        </div>

        <div className="text-center col-12 mt-5 mb-3">
          <Link to="/">zurück zum Menü</Link>
        </div>

      </div>
    );
  }
}