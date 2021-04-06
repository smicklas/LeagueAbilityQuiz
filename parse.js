var sourceContent;
var ability; 


function loadData(){
    readFile("source/Abilities __ LoL Champion Abilities.html");
}

//Get text from the url of html file
async function readFile(url)
{
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'blob';
    request.onload = function() {
        var reader = new FileReader();
        reader.readAsText(request.response);
        reader.onload =  function(e){
            createAbilitiesJSON(e.target.result);
        };
    };
    request.send();
}

//Get the data from the file read 
function setContent(value){
    sourceContent = value;
}

function createAbilitiesJSON(source){
    var temp = [];
    var raw = count(source);
    raw.forEach(element => {
        //split up further 
        temp.push(getAbilityInfo(element));
    });
   
    //Look for specified regex - ("ability-list__item__name">)
    //Get text after that UNTIL < character
}

//Example of each entry: 
/* 
<a href="https://www.mobafire.com/league-of-legends/ability/90-caliber-net-342" class="ability-list__item {t:&#39;Ability&#39;,i:&#39;342&#39;} tooltip-ajax" style="min-height: 134px;">
    <img src="./Abilities __ LoL Champion Abilities_files/caitlyn(1).webp" class="ability-list__item__champ" champ="Caitlyn" alt="Caitlyn ability">
    <div class="ability-list__item__keybind">E</div>
    <img src="./Abilities __ LoL Champion Abilities_files/caitlyn-90-caliber-net.webp" alt="Caitlyn ability 90 Caliber Net" class="ability-list__item__pic">
    <span class="ability-list__item__comments"><img src="./Abilities __ LoL Champion Abilities_files/new-comment-icon.webp" alt="90 Caliber Net Comments"> 6</span>
    <span class="ability-list__item__name">90 Caliber Net
    <span class="desc">Caitlyn fires a heavy net to slow down her target and deal magic damage. The recoil knocks Caitlyn back 400 units. Caitlyn can also fire one long-ranged Headshot at netted targets.<div style="clear:both;"></div></span>
    </span>
</a> 
*/

const count = (content) => {
    //Regex for getting ability name
    //const re = /(?<="ability-list__item__name">).*?(?=\n*<span)/g

    //Regex for getting entire a block 
    const re = /(?<=<a href="https:\/\/www.mobafire.com\/league-of-legends\/ability\/).*?(?=<\/a>)/gs
    return ((content || '').match(re) || [])
}

//Each entry in ability needs: 
//ability-name: 
//champion: 
//key:
//image:
//description:

function getAbilityInfo(content){
    //Check for passives
    const re_passive = /(passive-symbol)/g
    var passive_check = (content).match(re_passive);
    var isPassive = false;
    if(passive_check){
        isPassive = true; 
    }
    //Regex for getting ability name
    var temp = {"ability": null, "champion": null, "control": null, "image": null, "description": null};
    const re_ability = /(?<="ability-list__item__name">).*?(?=\n* *<span)/g
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
        console.log(temp.image);
     }else{
        const re_image = /(?<=(<div class="ability-list__item__keybind">.<\/div>).*?)(?<=<img src=".\/Abilities __ LoL Champion Abilities_files\/).*?(?=" alt)/gs
        temp.image = (content).match(re_image)[0];
    }

    const re_description = /(?<=<span class="desc">)(.*?)(?=<div)/gs
    temp.description = (content).match(re_description)[0];
    console.log(temp);

    //TODO - move to its own function
    let parent = document.getElementById("temp-container");
    const newDiv = document.createElement("div");
    const c= document.createTextNode(temp.champion + " ");
    const a = document.createTextNode(temp.ability + " ");
    const i = document.createTextNode(temp.image + " ");
    const k = document.createTextNode(temp.control + " ");
    const d = document.createTextNode(temp.description + " ");
    newDiv.append(c);
    newDiv.append(a);
    newDiv.append(i);
    newDiv.append(k);
    newDiv.append(d);
    parent.append(newDiv);
    return temp;
}