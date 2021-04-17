import React from 'react';
import ReactDOM from 'react-dom';

class QuizContent extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      sourceData : this.props.data.sourceData, 
      questionData: [],
      correctAnswers: [],
      currentQuestion: 1,
      attempts: 0,
      showAnswer: false,
      randomNum: 0
    }
  }

  componentDidMount(){
    //Select first champ 
    //TODO - give more descriptive name
    let random_num = Math.ceil(Math.random() * this.state.sourceData.length);
    this.setState({randomNum : random_num});
  }

  checkAnswer = () => {
    //for now it's just correct, not gonna do any checkin yet
    this.setState({showAnswer : true});
  }

  nextPage = () => {
    this.setState({currentQuestion : this.state.currentQuestion+1});
  }

  render() {
    // "ability": "champion" "control" "image" "description"
    return (
        <div className="quiz-content">
          <p className="feedback-text">Correct/Incorrect Label</p>
          {this.state.showAnswer ? 
            <div className="">
              <img className="ability-image" src={`/mobafire/Abilities__LoLChampionAbilities_Files/${this.state.sourceData[this.state.randomNum].image}`}/>
              <h2><span>{this.state.currentQuestion}/{this.state.sourceData.length}</span></h2>
              <p className="">{this.state.sourceData[this.state.randomNum].ability} - {this.state.sourceData[this.state.randomNum].control}</p>
              <img className="champion-img" src={`/mobafire/Abilities__LoLChampionAbilities_Files/${this.state.sourceData[this.state.randomNum].champion}.webp`}/>
              <p className="">{this.state.sourceData[this.state.randomNum].champion}</p>
              <p className="">{this.state.sourceData[this.state.randomNum].description}</p>
              <button className="primary-button" onClick={this.nextPage}>NEXT</button>
            </div>
          :
            <div className="">
              <img className="ability-image" src={`/mobafire/Abilities__LoLChampionAbilities_Files/${this.state.sourceData[this.state.randomNum].image}`}/>
              <h2><span>{this.state.currentQuestion}/{this.state.sourceData.length}</span></h2>
              <input type="text"/>
              <button className="primary-button" onClick={this.checkAnswer}>SUBMIT</button>
              <button className="secondary-button">I GIVE UP!</button>
            </div>
          }
        </div>
    );
  }
}


export default QuizContent;