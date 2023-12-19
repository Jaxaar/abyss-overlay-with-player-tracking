
const fs = require('fs');

const opponentFileName = "opponentData.json"

let opponents = {}


function initializeOpponents(){
    opponents = readJSONFile(opponentFileName)
}

function storeOpponents(){
    saveJSONFile(opponentFileName)
}


function handleChatEvent(msg, data){
    console.log(msg);
    console.log(opponents)
}

function trackPlayers(){

}


function readJSONFile(fileName){
    try{
        let rawdata = fs.readFileSync(fileName);
        let opponents = JSON.parse(rawdata);
        return opponents
    }
    catch{
        console.log("No valid file")
        return {
            "players": {},
        }
    }
}

function saveJSONFile(str){
    let data = JSON.stringify(opponents);
    fs.writeFileSync(str, data);
    console.log("Opponents File Saved")
}




module.exports = {
    trackPlayers, handleChatEvent, initializeOpponents, storeOpponents
}
