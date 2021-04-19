import React from "react";
import ReactDOM from "react-dom";
import Image from "./Image";
import QuizContent from "./QuizContent";
import "../stylesheets/styles.css";
class AppContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sourceData: [],
      questionData: null,
      showIntro: true,
      dataLoaded: false,
      numberOfQuestions: null,
      feedBackMessage: null,
    };
  }

  startGame = () => {
    if (this.state.numberOfQuestions == null) {
      this.setState({feedbackMessage: "Please select a difficulty (number of questions)."})
      console.log("select a question number first");
    } else {
      const scope = this;
      const getAbilityInfoUrl = "https://j094n3z36d.execute-api.us-east-2.amazonaws.com/prod/abilities/" + this.state.numberOfQuestions;
      //TODO -add error handling
      this.setState({ feedbackMessage: "Getting data... hang tight."})
      fetch(getAbilityInfoUrl)
        .then((response) => response.json())
        .then(function (data) {
          scope.setState({ sourceData: data.abilities });
          scope.setState({ showIntro: false });
        });
      if(this.state.numberOfQuestions == "all"){  
        const getAbilityCountUrl = "https://j094n3z36d.execute-api.us-east-2.amazonaws.com/prod/abilitiesCount"
        fetch( getAbilityCountUrl)
          .then((response) => response.json())
          .then(function (data) {
            scope.setState({ numberOfQuestions: data.count});
      });
    }
  }
  };

  setDifficulty = (numQuestions) => {
    this.setState({feedbackMessage: null})
    const scope = this;
    //Find out what the current total number of abilities is 
    this.setState({ numberOfQuestions: numQuestions });
  };

  render() {
    return (
      <div className="app-container">
        {this.state.showIntro ? (
          <div>
            <img
              className="quiz-logo"
              alt="League of Legends Ability Quiz"
              src="../Logo.png"
            />
            {this.state.feedbackMessage ? <p className="feedback">{this.state.feedbackMessage}</p> : null}
            <div className="difficulty-buttons-container">
              <div className={"difficulty-button-wrapper" + (this.state.numberOfQuestions == 10 ? " selected" : "")}  onClick={() => {this.setDifficulty(10);}}>
                <img className="difficulty-button" role="button" src="../Iron.png"/>
                <p>10 Questions</p>
              </div>
              <div className={"difficulty-button-wrapper" + (this.state.numberOfQuestions == 20 ? " selected" : "")} onClick={() => {this.setDifficulty(20);}}>
                <img className="difficulty-button" role="button" src="../Bronze.png"/>
                <p>20 Questions</p>
              </div>
              <div className={"difficulty-button-wrapper" + (this.state.numberOfQuestions == 30 ? " selected" : "")} onClick={() => { this.setDifficulty(30);}}>
                <img className="difficulty-button" role="button" src="../Silver.png"/>
                <p>30 Questions</p>
              </div>
              <div className={"difficulty-button-wrapper" + (this.state.numberOfQuestions == 50 ? " selected" : "")} onClick={() => {this.setDifficulty(50);}}>
                <img className="difficulty-button" role="button"src="../Gold.png"/>
                <p>50 Questions</p>
              </div>
              <div className={"difficulty-button-wrapper" + (this.state.numberOfQuestions == 100 ? " selected" : "")} onClick={() => { this.setDifficulty(100);}}>
                <img className="difficulty-button" role="button" src="../Platinum.png"/>
                <p>100 Questions</p>
              </div>
              <div className={"difficulty-button-wrapper" + (this.state.numberOfQuestions == 250 ? " selected" : "")} onClick={() => { this.setDifficulty(250);}}>
                <img className="difficulty-button" role="button" src="../Diamond.png"/>
                <p>250 Questions</p>
              </div>
              <div className={"difficulty-button-wrapper" + (this.state.numberOfQuestions == 500 ? " selected" : "")} onClick={() => { this.setDifficulty(500); }}>
                <img className="difficulty-button" role="button" src="../Master.png"/>
                <p>500 Questions</p>
              </div>
              <div className={"difficulty-button-wrapper" + (this.state.numberOfQuestions == 700 ? " selected" : "")} onClick={() => { this.setDifficulty(700);}}>
                <img className="difficulty-button" role="button" src="../Grandmaster.png" />
                <p>700 Questions</p>
              </div>
              <div className={"difficulty-button-wrapper" + (this.state.numberOfQuestions == "all" ? " selected" : "")} onClick={() => { this.setDifficulty("all");}}>
                <img className="difficulty-button" role="button" src="../Challenger.png" />
                <p>ALL</p>
              </div>
            </div>
            <div className="button-wrapper">
              <button className="primary-button large" onClick={this.startGame}>
                {" "}
                START{" "}
              </button>
            </div>
          </div>
        ) : (
          <QuizContent data={this.state} />
        )}
      </div>
    );
  }
}

export default AppContainer;
