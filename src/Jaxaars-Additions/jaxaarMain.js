const { saveJSONFile, readJSONFile } = require('./jaxaarHelpers.js');


const opponentFileName = "opponentData.json"
const jaxaarOpponentData = {}

jaxaarOpponentData.opponents = {
    "players": {},
}

jaxaarOpponentData.chat = []

jaxaarOpponentData.initializeOpponents = function () {
    const fileJSON = readJSONFile(opponentFileName)
    if(fileJSON){
        this.opponents = fileJSON
    }
}

jaxaarOpponentData.storeOpponents = function () {
    console.log(this.opponents)
    saveJSONFile(opponentFileName, this.opponents)
    this.saveGameChat("gameChat.json")
}

jaxaarOpponentData.saveGameChat  = function (str){
    let jsonObj = {}
    console.log(this.chat)
    try{
        let rawdata = fs.readFileSync(str);
        jsonObj = JSON.parse(rawdata);
        jsonObj.chat.push(this.chat)
    }
    catch{
        jsonObj = {"chat": []}
        jsonObj.chat.push(this.chat)
    }

    saveJSONFile(str, jsonObj)
}


jaxaarOpponentData.handleChatEvent = function (msg, data){
    console.log(msg);
    this.chat.push(msg)
    console.log(this.opponents)
    console.log(this.chat)
}

jaxaarOpponentData.trackPlayers = function (){

}


module.exports = {
    jaxaarOpponentData
}
