const database = require('../database');
const userDetails = require('../userDetails');

module.exports = async (userId, itemId) =>{
    var user = await userDetails(userId);
    for(i=0;i<user.items.length;i++){
        if(user.items[i].itemId === parseInt(itemId, 10)){
            return user;
        }
        if(user.user.currentScore < 200){
            return {error: "cannot afford item"}
        }
    }

    const newCurrency = user.user.currentCurrency - 200;

    await database(`UPDATE userTable SET currentScore = ${newCurrency} where ID = ${userId}`)

    await database(`INSERT INTO userItems VALUES(${userId},${itemId})`);
    return userDetails(userId);
}