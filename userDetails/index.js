const database = require('../database')

module.exports = async (ID) =>{
    const sqlUser = await database(`select * from userTable as users LEFT JOIN petTable as pets ON users.PetId = pets.id where users.id = ${ID}`);
    const sqlitems = await database(`select * from userItems as users RIGHT JOIN itemsTable as items ON users.itemId = items.ID WHERE users.userID = ${ID}`)
    const user = sqlUser.recordset[0];
    const items = sqlitems.recordset;
    console.log(user)
    var userDto = {
        ID: user.ID[0],
        username: user.Username,
        currentLevel: user.currentLevel,
        currentCurrency: user.currentScore,
        currentXp: user.currentXp,
        PetId: user.PetId,
        petName: user.petName
    }

    return {
        user: userDto,
        items: items
    };
}