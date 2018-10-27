const database = require('../database');

module.exports = async () =>{
    const sqlResult = await database(`select * from userTable`);
    
    const result = sqlResult.recordset;
    var users = []
    console.log(result)
    for(var i = 0; i < result.length;i++){
        const score = result[i].currentXp + ((result[i].currentLevel - 1) * 1000);
        users.push({
            username: result[i].Username,
            score: score
        });
    };
    users.sort(function(a, b){
            return b.score-a.score
        });
        
    return users;
}