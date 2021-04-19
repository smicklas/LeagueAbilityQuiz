import React from 'react';
import ReactDOM from 'react-dom';

class QuizContent extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      sourceData : this.props.data.sourceData, 
      questionData: [],
      correctAnswers: 0,
      currentQuestion: 0,
      attempts: 0,
      showAnswer: false,
      isCorrect : null,
      totalQuestions : this.props.data.numberOfQuestions,
      userAnswer: ""
    }
  }

  //TODO - more descriptive variables! 

  componentDidMount(){

  }

  //https://redstapler.co/find-diff-between-2-strings-with-javascript/
  checkDifference = (str1, str2) => { 
    var dist = 0;
    for (var i = 0, j = Math.max(str1.length, str2.length); i < j; i++) {
      if (!str1[i] || !str2[i] || str1[i] !== str2[i]) {
        dist++;
      }
    }
    return dist;
  }
  checkAnswer = () => {
    this.setState({attempts : this.state.attempts + 1})
    //convert to lower cases 
    let cleansedAbilityName = this.state.sourceData[this.state.currentQuestion].name.toLowerCase();
    let cleansedUserInput = this.state.userAnswer.toLowerCase();

    //remove spaces
    cleansedUserInput = cleansedUserInput.replace(/\s/g, '');
    cleansedAbilityName = cleansedAbilityName.replace(/\s/g, '');

    let differenceCheck = "";
    differenceCheck = this.checkDifference(cleansedAbilityName, cleansedUserInput)

    if(cleansedUserInput == cleansedAbilityName || differenceCheck < 3){
      this.setState({correctAnswers: this.state.correctAnswers + 1});
      this.setState({isCorrect: true});
      this.setState({showAnswer : true});
    }else{
      this.setState({isCorrect: false});
      this.setState({showAnswer : false});
    }
  }

  showAnswer = () => { 
    this.setState({isCorrect: null});
    this.setState({showAnswer : true});
  }

  nextPage = () => {
    if(this.state.currentQuestion + 1  == this.state.totalQuestions){
      console.log("all done!")
    }else{
      this.setState({isCorrect: null});
      this.setState({showAnswer: false});
      this.setState({userAnswer: ""});
      this.setState({attempts: 0});
      this.setState({currentQuestion : this.state.currentQuestion+1});
    }
  }

  handleChange = (e) =>{
    this.setState({userAnswer: e.target.value});
  }

  render() {
    // "ability": "champion" "control" "image" "description"
    return (
        <div className="quiz-content">
          {this.state.isCorrect ?
            <p className="feedback-text correct">Correct</p>
          :
            this.state.attempts > 0 && !this.state.showAnswer ?
              <p className="feedback-text incorrect">Incorrect</p>
            :
              <p className="feedback-text"></p>
          }
          
          {this.state.showAnswer ? 
            <div className="">
              <img className="ability-image small" src={`${this.state.sourceData[this.state.currentQuestion].image}`}/>
              <h1>{this.state.currentQuestion + 1}/{this.state.totalQuestions}</h1>
              <p className="ability-title">{this.state.sourceData[this.state.currentQuestion].name} - {this.state.sourceData[this.state.currentQuestion].control}</p>
              <hr className="gradient-decor"/>
              <div className="image-container">
              <div className="image-border"></div>
                <div className="champion-img" style={{backgroundImage:`url(${this.state.sourceData[this.state.currentQuestion].championImage})`, backgroundRepeat: "no-repeat", backgroundSize: "cover"}}/>
              </div>
              <div className="ability-champion">{this.state.sourceData[this.state.currentQuestion].champion}</div>
              <p className="ability-description" dangerouslySetInnerHTML={{__html: this.state.sourceData[this.state.currentQuestion].description}}></p>
              <button className="primary-button" onClick={this.nextPage}>NEXT</button>
            </div>
          :
            <div className="">
              <img className="ability-image" src={`${this.state.sourceData[this.state.currentQuestion].image}`}/>
              <h1>{this.state.currentQuestion + 1}/{this.state.totalQuestions}</h1>
              <input type="text" onChange={this.handleChange}/>
              <button className="primary-button" onClick={this.checkAnswer}>SUBMIT</button>
              <button className="secondary-button" onClick={this.showAnswer}>I GIVE UP!</button>
            </div>
          }
        </div>
    );
  }
}


export default QuizContent;