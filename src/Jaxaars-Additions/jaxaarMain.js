const { saveJSONFile, readJSONFile } = require('./jaxaarHelpers.js');


const savingChat = true

const jaxaarOpponentData = {}

jaxaarOpponentData.opponentFileName = "opponentData.json"
jaxaarOpponentData.testing = false

jaxaarOpponentData.opponents = {
    "players": {},
}

jaxaarOpponentData.chat = []
jaxaarOpponentData.bools = {
    "gameStarting": false,
    "gameStarted": false,
    "normalMode": false,
    "dreamMode": false,
    "gameRunning": false,
    "gameEnding": false,
    "gameEnded": false,

}

jaxaarOpponentData.flags = {
    "finals": true,
    "usersBedBroken": true,
}

jaxaarOpponentData.currentPlayers = []
jaxaarOpponentData.user = ""
jaxaarOpponentData.userTeamColor = ""



jaxaarOpponentData.initializeOpponents = function () {
    const fileJSON = readJSONFile(`${__dirname}/../../${this.opponentFileName}`)
    if(fileJSON){
        this.opponents = fileJSON
    }
}

jaxaarOpponentData.closeOpponents = function () {
    saveJSONFile(this.opponentFileName, this.opponents)
    if(!jaxaarOpponentData.testing && savingChat){
        this.saveGameChat("gameChat.json")
    }
}

jaxaarOpponentData.saveGameChat  = function (str){
    let jsonObj = {}
    try{
        jsonObj = readJSONFile(`${__dirname}/../../${str}`);
        jsonObj.chat.push(this.chat)
    }
    catch{
        jsonObj = {"chat": []}
        jsonObj.chat.push(this.chat)
    }

    saveJSONFile(str, jsonObj)
}


// BED DESTRUCTION > Your Bed

jaxaarOpponentData.handleChatEvent = function (msg, data, players, user){

    this.user = user
    console.log(msg);
    this.detectColor(msg)
    this.chat.push(msg)
    // console.log(players)

    // Detects Game starting
    if(msg.includes("The game starts in 1 second!") && !msg.includes(":")){
        // Update state vars
        this.bools.gameStarting = true
    }
    // Verify it actual started
    else if(this.bools.gameStarting && msg.includes("??????????????????????????????????????????????????????????????") && !msg.includes(":")){
        // Update state vars
        this.bools.gameStarting = false
        this.bools.gameStarted = true
    }
    // Verify it's bedwars starting
    else if(this.bools.gameStarted && msg.replaceAll(" ", "").includes("BedWars") && !msg.includes(":")){
        // Update state vars
        this.bools.gameStarted = false
        this.bools.gameRunning = true
        // Determine gamemode
        // if(msg.replace(" ", "") === "BedWars"){
        //     this.bools.normalMode = true
        // }
        // else{
        //     this.bools.dreamMode = true
        // }
        this.bools.normalMode = true

        // Log the players who are in the game
        this.logPlayers(players)

    } 
    
    // Catch mid game events
    else if (this.flags.finals && msg.includes('FINAL KILL') && !msg.includes(":")){
        this.handleFinals(msg)
    }
    else if (msg.includes("BED DESTRUCTION") && msg.includes("Your Bed") && !msg.includes(":")){
        this.handleBedsBroken(msg)
    }

    // Detect Game end (Assuming still in lobby)
    else if(this.bools.gameRunning && msg.includes("??????????????????????????????????????????????????????????????") && !msg.includes(":")){
        // Update state vars
        this.bools.gameEnding = true
    }
    // Verify Game end
    else if (this.bools.gameEnding && msg.replaceAll(" ", "").includes("BedWars") && !msg.includes(":")){
        this.bools.gameEnding = false
        this.bools.gameRunning = false
        this.bools.gameEnded = true
    }

    // Game end WIP
    else if (this.bools.gameEnded && msg.toLowerCase().includes(this.userTeamColor) && this.userTeamColor != ""){
        this.bools.gameEnded = false
    }
    else if (this.bools.gameEnded && msg.includes("Slumber Tickets! (Win)")){
        this.bools.gameEnded = false
    }
    





}


// Verifies the player's presence in the file
// Returns true if they existed
// Adds them and Returns false if they did not
jaxaarOpponentData.verifyPlayer = function (player){
    if(this.opponents.players[player]){
        return true
    }
    else{
        this.opponents.players[player] = {
            "name": player,
            "gamesPlayed": 1,
        }
        return false
    }
}


jaxaarOpponentData.detectColor = function(msg){
    if(this.bools.gameRunning && msg.toLowerCase().includes(`${this.user}:`)){
        this.userTeamColor = msg.split(" ")[1].replace("[", "").replace("]", "").toLowerCase()
    }
}

jaxaarOpponentData.logPlayers = function (players){

    for(const p of players){
        const player = p.name.toLowerCase()
        this.currentPlayers.push(player)

        if(this.verifyPlayer(player)){
            this.opponents.players[player].gamesPlayed = this.opponents.players[player].gamesPlayed ? this.opponents.players[player].gamesPlayed + 1 : 1
        }
    }
}

jaxaarOpponentData.handleFinals = function (msg){
    const died = msg.split(' ')[0].toLowerCase();
    const killer = msg.split(' ')[msg.split(' ').length-3].replace(".", "").replace("?", "").replace("!", "").toLowerCase(); //Find a better replace method

    if(died == this.user){
        this.verifyPlayer(killer)
        this.opponents.players[killer].FinaledYou = this.opponents.players[killer].FinaledYou ? 1 + this.opponents.players[killer].FinaledYou : 1
    }
    else if(killer == this.user){
        this.verifyPlayer(died)
        this.opponents.players[died].YouFinaled = this.opponents.players[died].YouFinaled ? 1 + this.opponents.players[died].YouFinaled : 1
    }
}

jaxaarOpponentData.handleBedsBroken = function (msg){
    if(this.flags.usersBedBroken){
        const breaker = msg.split(' ')[msg.split(' ').length-1].replace(".", "").replace("?", "").replace("!", "").toLowerCase(); //Find a better replace method
        this.verifyPlayer(breaker)
        this.opponents.players[breaker].brokeYourBed = this.opponents.players[breaker].brokeYourBed ? 1 + this.opponents.players[breaker].brokeYourBed : 1
    }
}






module.exports = {
    jaxaarOpponentData
}
