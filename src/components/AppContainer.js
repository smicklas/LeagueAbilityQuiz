import React from "react";
import ReactDOM from "react-dom";
import Image from "./Image";
import QuizContent from "./QuizContent";
import "../stylesheets/styles.css";
import Modal from "react-modal";

class AppContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sourceData: [],
      questionData: null,
      showIntro: true,
      dataLoading: false,
      numberOfQuestions: null,
      feedBackMessage: null,
      difficultyImg: null,
      showModal: false,
    };
  }

  startGame = () => {
    if (this.state.numberOfQuestions == null) {
      this.setState({ showModal: true });
      this.setState({
        feedbackMessage: "Please select a difficulty (number of questions).",
      });
    } else {
      const scope = this;
      const getAbilityInfoUrl =
        `${process.env.REACT_APP_API_URL}/prod/abilities/` +
        this.state.numberOfQuestions;
      //TODO -add error handling
      this.setState({ feedbackMessage: "Getting data... hang tight" });
      this.setState({ dataLoading: true });
      this.setState({ showModal: true });
      fetch(getAbilityInfoUrl)
        .then((response) => response.json())
        .then(function (data) {
          scope.setState({ sourceData: data.abilities });
          scope.setState({ showIntro: false });
        });
      if (this.state.numberOfQuestions == "all") {
        const getAbilityCountUrl = `${process.env.REACT_APP_API_URL}/prod/abilitiesCount`;
        fetch(getAbilityCountUrl)
          .then((response) => response.json())
          .then(function (data) {
            scope.setState({ numberOfQuestions: data.count });
          });
      }
      this.setState({ dataLoading: false });
    }
  };

  setDifficulty = (numQuestions, difficultyImgSrc) => {
    this.setState({ feedbackMessage: null });
    const scope = this;
    //Find out what the current total number of abilities is
    this.setState({ numberOfQuestions: numQuestions });
    this.setState({ difficultyImg: difficultyImgSrc });
  };

  dismissModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    return (
      <div className="app-container">
        <div className="game-container">
          {this.state.showIntro ? (
            <div>
              <img
                className="quiz-logo"
                alt="League of Legends Ability Quiz"
                src="./Logo.png"
              />
              <Modal
                isOpen={
                  this.state.showModal && this.state.numberOfQuestions == null
                }
                contentLabel="Minimal Modal Example"
                className="modal"
                overlayClassName="overlay"
              >
                <p>{this.state.feedbackMessage}</p>
                <div className="button-wrapper">
                  <button
                    className="primary-button"
                    onClick={() => {
                      this.dismissModal();
                    }}
                  >
                    {" "}
                    OK{" "}
                  </button>
                </div>
              </Modal>
              <Modal
                isOpen={
                  this.state.showModal &&
                  !(this.state.numberOfQuestions == null)
                }
                contentLabel="Minimal Modal Example"
                className="modal"
                overlayClassName="overlay"
              >
                <p>{this.state.feedbackMessage}</p>
                <div className="loader"></div>
              </Modal>
              <div className="difficulty-buttons-container">
                {/* Testing button
              <div className={"difficulty-button-wrapper" + (this.state.numberOfQuestions == 3 ? " selected" : "")}  onClick={() => {this.setDifficulty(3, "../Iron.png");}}>
                <img className="difficulty-button" role="button" src="../Iron.png"/>
                <p>3 Questions</p>
              </div>
              End testing button */}
                <div
                  className={
                    "difficulty-button-wrapper" +
                    (this.state.numberOfQuestions == 10 ? " selected" : "")
                  }
                  onClick={() => {
                    this.setDifficulty(10, "./Iron.png");
                  }}
                >
                  <img
                    className="difficulty-button"
                    role="button"
                    src="./Iron.png"
                  />
                  <p>10 Questions</p>
                </div>
                <div
                  className={
                    "difficulty-button-wrapper" +
                    (this.state.numberOfQuestions == 20 ? " selected" : "")
                  }
                  onClick={() => {
                    this.setDifficulty(20, "./Bronze.png");
                  }}
                >
                  <img
                    className="difficulty-button"
                    role="button"
                    src="./Bronze.png"
                  />
                  <p>20 Questions</p>
                </div>
                <div
                  className={
                    "difficulty-button-wrapper" +
                    (this.state.numberOfQuestions == 30 ? " selected" : "")
                  }
                  onClick={() => {
                    this.setDifficulty(30, "./Silver.png");
                  }}
                >
                  <img
                    className="difficulty-button"
                    role="button"
                    src="./Silver.png"
                  />
                  <p>30 Questions</p>
                </div>
                <div
                  className={
                    "difficulty-button-wrapper" +
                    (this.state.numberOfQuestions == 50 ? " selected" : "")
                  }
                  onClick={() => {
                    this.setDifficulty(50, "./Gold.png");
                  }}
                >
                  <img
                    className="difficulty-button"
                    role="button"
                    src="./Gold.png"
                  />
                  <p>50 Questions</p>
                </div>
                <div
                  className={
                    "difficulty-button-wrapper" +
                    (this.state.numberOfQuestions == 100 ? " selected" : "")
                  }
                  onClick={() => {
                    this.setDifficulty(100, "./Platinum.png");
                  }}
                >
                  <img
                    className="difficulty-button"
                    role="button"
                    src="./Platinum.png"
                  />
                  <p>100 Questions</p>
                </div>
                <div
                  className={
                    "difficulty-button-wrapper" +
                    (this.state.numberOfQuestions == 250 ? " selected" : "")
                  }
                  onClick={() => {
                    this.setDifficulty(250, "./Diamond.png");
                  }}
                >
                  <img
                    className="difficulty-button"
                    role="button"
                    src="./Diamond.png"
                  />
                  <p>250 Questions</p>
                </div>
                <div
                  className={
                    "difficulty-button-wrapper" +
                    (this.state.numberOfQuestions == 500 ? " selected" : "")
                  }
                  onClick={() => {
                    this.setDifficulty(500, "./Master.png");
                  }}
                >
                  <img
                    className="difficulty-button"
                    role="button"
                    src="./Master.png"
                  />
                  <p>500 Questions</p>
                </div>
                <div
                  className={
                    "difficulty-button-wrapper" +
                    (this.state.numberOfQuestions == 700 ? " selected" : "")
                  }
                  onClick={() => {
                    this.setDifficulty(700, "./Grandmaster.png");
                  }}
                >
                  <img
                    className="difficulty-button"
                    role="button"
                    src="./Grandmaster.png"
                  />
                  <p>700 Questions</p>
                </div>
                <div
                  className={
                    "difficulty-button-wrapper" +
                    (this.state.numberOfQuestions == "all" ? " selected" : "")
                  }
                  onClick={() => {
                    this.setDifficulty("all", "./Challenger.png");
                  }}
                >
                  <img
                    className="difficulty-button"
                    role="button"
                    src="./Challenger.png"
                  />
                  <p>ALL</p>
                </div>
              </div>
              <div className="button-wrapper">
                <button
                  className="primary-button large"
                  onClick={this.startGame}
                >
                  {" "}
                  START{" "}
                </button>
              </div>
            </div>
          ) : (
            <QuizContent data={this.state} />
          )}
        </div>
        <footer className="footer">Like this quiz? <a href="https://www.buymeacoffee.com/sybbey" target="_blank">Consider supporting me by buying me a beer!</a></footer>
      </div>
    );
  }
}

export default AppContainer;
