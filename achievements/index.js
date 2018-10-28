const database = require('../database');

module.exports = async (ID, level, delay) =>{
    if(level == 5){
        if(await doesNotHaveAchievement(ID,1)){
            await insertNewAchievement(ID, 1);
            return AchievementDetails(1);
        }
    }

    if(level == 10){
        if(await doesNotHaveAchievement(ID, 2)){
            await insertNewAchievement(ID, 2);
            return AchievementDetails(2);
        }
    }

    if(delay == true){
        if(await doesNotHaveAchievement(ID, 3)){
            await insertNewAchievement(ID, 3);
            return AchievementDetails(3);
        }
    }

    return {};

    async function doesNotHaveAchievement(userID,achievementId){
        const sqlitems = await database(`select * from achievementUser as users RIGHT JOIN achievements as achievements ON users.achivementId = achievements.ID WHERE users.userID = ${userID} AND achievements.ID = ${achievementId}`)
        if(sqlitems.recordset[0] === undefined){
            return true;
        }
        return false;

    }

    async function insertNewAchievement(ID, achievementId){
       await database(`INSERT INTO achievementUser VALUES(${ID},${achievementId})`);
    }

    async function AchievementDetails(achievementId){
        const achievementDetails = await database(`select * from achievements where ID = ${achievementId}`);
        const achievements = achievementDetails.recordset[0];
        return {
                    Id: achievements.ID,
                    Name: achievements.achivementName,
                    Details: achievements.achivementText
                }
        }
}