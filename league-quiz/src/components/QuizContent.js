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
      randomNum: 0,
      isCorrect : null
    }
  }

  componentDidMount(){
    //Select first champ 
    //TODO - give more descriptive name
    let random_num = Math.ceil(Math.random() * this.state.sourceData.length);
    this.setState({randomNum : 108});
  }

  checkAnswer = () => {
    //for now it's just correct, not gonna do any checkin yet
    this.setState({isCorrect: true});
    this.setState({showAnswer : true});
  }

  nextPage = () => {
    this.setState({isCorrect: null});
    this.setState({showAnswer: false});
    this.setState({currentQuestion : this.state.currentQuestion+1});
    //remove the previous entry from the array
    let random_num = Math.ceil(Math.random() * this.state.sourceData.length);
    this.setState({randomNum : random_num});
  }

  render() {
    // "ability": "champion" "control" "image" "description"
    return (
        <div className="quiz-content">
          {this.state.isCorrect ?
            <p className="feedback-text">Correct</p>
          :
            this.state.attempts > 0 ?
              <p className="feedback-text">Incorrect</p>
            :
              <p className="feedback-text"></p>
          }
          
          {this.state.showAnswer ? 
            <div className="">
              <img className="ability-image small" src={`/mobafire/Abilities__LoLChampionAbilities_Files/${this.state.sourceData[this.state.randomNum].image}`}/>
              <h2><span>{this.state.currentQuestion}/{this.state.sourceData.length}</span></h2>
              <p className="ability-title">{this.state.sourceData[this.state.randomNum].ability} - {this.state.sourceData[this.state.randomNum].control}</p>
              <hr className="gradient-decor"/>
              <div className="image-container">
              <div className="image-border"></div>
              {this.state.sourceData[this.state.randomNum].isPNG ?
                <div className="champion-img" style={{backgroundImage:`url(/mobafire/Abilities__LoLChampionAbilities_Files/${this.state.sourceData[this.state.randomNum].champion.replace("'", "")}.png)`, backgroundRepeat: "no-repeat", backgroundSize: "cover"}}/>
              : 
              <div className="champion-img" style={{backgroundImage:`url(/mobafire/Abilities__LoLChampionAbilities_Files/${this.state.sourceData[this.state.randomNum].champion.replace("'", "")}.webp)`, backgroundRepeat: "no-repeat", backgroundSize: "cover"}}/>
            }
              </div>
              /mobafire/Abilities__LoLChampionAbilities_Files/{this.state.sourceData[this.state.randomNum].champion.replace("'", "")}.webp
              <div className="ability-champion">{this.state.sourceData[this.state.randomNum].champion}</div>
              <p className="ability-description" dangerouslySetInnerHTML={{__html: this.state.sourceData[this.state.randomNum].description}}></p>
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