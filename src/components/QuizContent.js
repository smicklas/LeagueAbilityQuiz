import React from 'react';

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
      userAnswer: "",
      quizCompleted: false,
      rank : null,
      difficultyImg: this.props.data.difficultyImg
    }
  }

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
    let cleansedUserInput = this.state.userAnswer.toLowerCase();

    let cleansedAbilityName = this.state.sourceData[this.state.currentQuestion].name.toLowerCase();
    let cleansedChampion = this.state.sourceData[this.state.currentQuestion].champion.toLowerCase();
    let cleansedKey =  this.state.sourceData[this.state.currentQuestion].control.toLowerCase();

    //set up correct answers 
    // final results should look like "morganae", or "morganablackshield"
    let cleansedChampionKey = cleansedChampion + cleansedKey;
    let cleansedChampionAbilityName = cleansedChampion + cleansedAbilityName

    //remove non-alphanumeric characters 
    cleansedUserInput = cleansedUserInput.replace(/[^a-z0-9]/gi, '');
    cleansedChampionAbilityName = cleansedChampionAbilityName.replace(/[^a-z0-9]/gi, '');
    cleansedChampionKey = cleansedChampionKey.replace(/[^a-z0-9]/gi, '');

    //remove spaces 
    cleansedUserInput = cleansedUserInput.replace(/\s/g, '');
    cleansedChampionAbilityName = cleansedChampionAbilityName.replace(/\s/g, '');
    cleansedChampionKey = cleansedChampionKey.replace(/\s/g, '');

    //correct answers : morgana e, morgana blackshield
    if(cleansedUserInput == cleansedChampionKey || cleansedUserInput == cleansedChampionAbilityName)
       {
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
      this.setState({isCorrect: null});
      this.setState({quizCompleted : true})
      let correctPercentage = Number((this.state.correctAnswers / this.state.totalQuestions) * 100);
      if(0 <= correctPercentage && correctPercentage < 7){
        this.setState({rank: "D-"});
      } else if(7 <= correctPercentage && correctPercentage < 14){
        this.setState({rank: "D"});
      } else if(14 <= correctPercentage && correctPercentage < 21){
        this.setState({rank: "D+"});
      } else if(21 <= correctPercentage && correctPercentage < 27){
        this.setState({rank: "C-"});
      } else if(28 <= correctPercentage && correctPercentage < 34){
        this.setState({rank: "C"});
      } else if(35 <= correctPercentage && correctPercentage < 41){
        this.setState({rank: "C+"});
      } else if(49 <= correctPercentage && correctPercentage < 56){
        this.setState({rank: "B-"});
      } else if(56 <= correctPercentage && correctPercentage < 63){
        this.setState({rank: "B"});
      } else if(63 <= correctPercentage && correctPercentage < 70){
        this.setState({rank: "B+"});
      } else if(70 <= correctPercentage && correctPercentage < 77){
        this.setState({rank: "A-"});
      } else if(77 <= correctPercentage && correctPercentage < 84){
        this.setState({rank: "A"});
      } else if(84 <= correctPercentage && correctPercentage < 91){
        this.setState({rank: "A+"});
      } else if(91 <= correctPercentage){
        this.setState({rank: "S"});
      }
    } else{
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
            <div className="feedback">
              <p className="feedback-text correct">Correct</p>
              <hr className="gradient-decor blue"/>
            </div>
          :
            this.state.attempts > 0 && !this.state.showAnswer ?
              <div className="feedback">
                <p className="feedback-text incorrect">Incorrect</p>
                <hr className="gradient-decor red"/>
              </div>
            :
              <p className="feedback-text"></p>
          }
          
          {this.state.showAnswer && !this.state.quizCompleted ? 
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
              <div className="button-wrapper">
                <button className="primary-button" onClick={this.nextPage}>NEXT</button>
              </div>
            </div>
          :
            this.state.quizCompleted ?
              <div className="score-container">
                <div className="score-text-background-img" style={{backgroundImage:`url(${this.state.difficultyImg})`, backgroundRepeat: "no-repeat", backgroundSize: "contain", backgroundPosition: "center"}}>
                </div> 
                <div className="score-text">
                  <p className= "larger">
                    {this.state.rank}
                  </p>
                  <hr className="gradient-decor wider"/>
                  <p className="smaller">
                    {this.state.correctAnswers}/{this.state.totalQuestions} correct
                  </p>
                </div> 
                <div className="rotating-border"> </div>
                <p className=""> </p>
                <div className="button-wrapper">
                  <button className="primary-button" onClick={() => {window.location.reload();}}> Try Again</button>
                </div>
              </div>
         
              
            : 
              <div className="">
                <img className="ability-image" src={`${this.state.sourceData[this.state.currentQuestion].image}`}/>
                <h1>{this.state.currentQuestion + 1}/{this.state.totalQuestions}</h1>


                <input type="text" onChange={this.handleChange}/>
                <div className="button-wrapper">
                  <button className="primary-button" onClick={this.checkAnswer}>SUBMIT</button>
                </div>
                <button className="secondary-button" onClick={this.showAnswer}>I GIVE UP!</button>
              </div>
          }
        </div>
    );
  }
}

export default QuizContent;