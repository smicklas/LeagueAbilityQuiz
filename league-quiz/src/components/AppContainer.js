import React from 'react';
import ReactDOM from 'react-dom';
import Image from './Image';
import QuizContent from './QuizContent';
import '../stylesheets/styles.css'
  class AppContainer extends React.Component {
    //TODO - add loader after kicking off the data parsing/retrieving 

    constructor(props) {
      super(props);
      this.state = {
        sourceData: [],
        questionData: null,
        showIntro: true,
        dataLoaded: false
      };
    }

    startGame = () => {
      const scope = this;
      fetch('mobafire/Abilities.html')
      .then(function(response){
        return response.text();
      }
        ).then(function (data) {
          scope.createAbilitiesJSON(data);
        });
    }

    createAbilitiesJSON(source) {
      var temp = [];
      var count = (content) => {
        //Regex for getting ability name
        //const re = /(?<="ability-list__item__name">).*?(?=\n*<span)/g
  
        //Regex for getting entire a block 
        const re = /(?<=<a href="https:\/\/www.mobafire.com\/league-of-legends\/ability\/).*?(?=<\/a>)/gs
        return ((content || '').match(re) || [])
      }
      var raw = count(source);
      raw.forEach(element => {
          //split up further 
          temp.push(this.getAbilityInfo(element));
      });
      this.setState({showIntro : false});
      if(temp != null){
        this.setState({sourceData: temp});
      }else{
        console.log("Something went wrong trying to get the data."); 
      }
    }

    //TODO - rename data entry from temp. need to make sure the datap parsing is done before we move on
    //TODO - backend for the file parsing 
    getAbilityInfo(content){
      //Check for passives
      const re_passive = /(passive-symbol)/g
      var passive_check = (content).match(re_passive);
      var isPassive = false;
      if(passive_check){
          isPassive = true; 
      }
      //Regex for getting ability name
      var temp = {"ability": null, "champion": null, "control": null, "image": null, "description": null};
      const re_ability = /(?<="ability-list__item__name">).*?(?=\n* *<span)/gs
      temp.ability = (content).match(re_ability)[0];
  
      //Regex for champion name 
      const re_champion = /(?<=champ=").*?(?=\n* *")/g
      temp.champion = (content).match(re_champion)[0];
  
      //Regex for default key of ability
      if(isPassive){
          temp.control = "Passive"
      }else{
          const re_control = /(?<="ability-list__item__keybind">).*?(?=\ *<\/div>)/g
          temp.control = (content).match(re_control)[0];
      }
  
      if(isPassive){
          const re_image =  /(?<=passive-symbol\.webp".*?)(?<=<img src="\.\/Abilities __ LoL Champion Abilities_files\/).*?(?=")/gs;
          temp.image = (content).match(re_image)[0];
       }else{
          const re_image = /(?<=(<div class="ability-list__item__keybind">.<\/div>).*?)(?<=<img src=".\/Abilities __ LoL Champion Abilities_files\/).*?(?=" alt)/gs
          temp.image = (content).match(re_image)[0];
      }
  
      const re_description = /(?<=<span class="desc">)(.*?)(?=<div)/gs
      temp.description = (content).match(re_description)[0];
      var temp_sourceData = this.state.sourceData;
      temp_sourceData.push(temp);
      this.setState({sourceData : temp_sourceData});
      return temp;
    }

    render() {
      return (
        <div className="app-container"> 
          {this.state.showIntro ?
            <div className="">
            <button onClick={this.startGame}> Start it up </button>
            <p> hold on a sec.... loading the goods</p>
            </div>
          : 
            <QuizContent data={this.state} />  
          }
        </div>
      );
    }
  }
  
  
  export default AppContainer;