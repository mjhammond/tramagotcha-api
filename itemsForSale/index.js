const database = require('../database');
const userDetails = require('../userDetails');


module.exports = async (ID) =>{
    const Sqlresult = await database(`select * from itemsTable`);
    const users = await userDetails(ID);
    const result = Sqlresult.recordset;
    var items = [];
    for(i=0;i<result.length;i++){
        for(j=0;j<users.items.length;j++){
            var purchased = false;
            if(users.items[j].itemId == result[i].ID){
                purchased = true;
            }
            items.push({
                Id: result[i].ID,
                Name: result[i].itemName,
                Cost: 300,
                purchased: purchased
            });
        }
    }
    return items;
}