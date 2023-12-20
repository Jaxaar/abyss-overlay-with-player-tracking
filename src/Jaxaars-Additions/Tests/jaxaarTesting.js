const { jaxaarOpponentData } = require('../jaxaarMain.js');
const { saveJSONFile, readJSONFile } = require('../jaxaarHelpers.js');
require("./jaxaarTestingData.json")






console.log("Running test file...")

jaxaarOpponentData.testing = true
jaxaarOpponentData.opponentFileName = "TestingOpponentFile.json"

jaxaarOpponentData.initializeOpponents()
const gameChatJSON = readJSONFile(`${__dirname}/jaxaarTestingData.json`)
if (!gameChatJSON) return

for(const s of gameChatJSON.chat){
    for(const line of s){
        jaxaarOpponentData.handleChatEvent(line, line, [{"name": "SouthPaw16"}, {"name": "SilverHalo_"}, {"name": "BorisTheDog22"}, {"name": "toast_br"}, {"name": "dreamvsty"}, {"name": "markercroker"}, {"name": "___Selah___"}, {"name": "Showblown"}, {"name": "jackamel"}, {"name": "Mr_Apple_Pie"}, {"name": "BenBen17s"}, {"name": "shiestydecember"}, {"name": "JumpyRelaxo"}, {"name": "VTCrafter14"}, {"name": "Phili_299"}], "jaxaar")
    }
}

jaxaarOpponentData.closeOpponents()




