const location = require('../location');
const database = require('../database');
const userDetails = require('../userDetails');
const metroApi = require('../metroApi')

module.exports = async (ID, lat, long, score) =>{
    const { user } = await userDetails(ID);
    const currentlocation = await location(lat,long);
    var delay = await metroApi(currentlocation.metroline);
    if (currentlocation == {}){
        return user;
    }
    
    var level = user.currentLevel;
    var scoreing = parseInt(score, 10);;
    if(delay.delay == true){
        scoreing += parseInt(score, 10);;
    }
    var newXp = user.currentXp + scoreing;
    var newCurrency = user.currentCurrency + scoreing;
    var petId = user.PetId;

    if(newXp > 1000) {
        newXp -= 1000;
        level += 1;

        if((level % 5) == 0){
            petId ++ 
        }
    }

    const query = `UPDATE userTable SET currentLevel = ${level}, currentScore = ${newCurrency}, currentXp = ${newXp}, PetId = ${petId}  where ID = ${ID}`
    
    await database(query);
    var userbasic = await userDetails(ID);
    var delayUser = {
        user: userbasic.user,
        items: userbasic.items,
        delay: delay
    }
    return delayUser;
}