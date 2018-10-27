const database = require('../database')

module.exports = async (ID) =>{
    const sqlUser = await database(`select * from userTable as users LEFT JOIN petTable as pets ON users.PetId = pets.id where users.id = ${ID}`);
    const sqlitems = await database(`select * from userItems as users RIGHT JOIN itemsTable as items ON users.itemId = items.ID WHERE users.userID = ${ID}`)
    const user = sqlUser.recordset[0];
    const items = sqlitems.recordset;

    var userDto = {
        ID: user.userID,
        Username: user.Username,
        CurrentLevel: user.currentLevel,
        CurrentCurrency: user.currentScore,
        CurrentXp: user.CurrentXp,
        PetId: user.PetId,
        PetName: user.PetName
    }

    
    return {
        user: userDto,
        items: items
    };
}