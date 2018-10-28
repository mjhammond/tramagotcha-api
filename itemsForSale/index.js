const database = require('../database')

module.exports = async () =>{
    const Sqlresult = await database(`select * from itemsTable`);
    const result = Sqlresult.recordset;
    var items = [];

    for(i=0;i<result.length;i++){
        items.push({
            Id: result[i].ID,
            Name: result[i].itemName,
            Cost: 300
        });
    }
    return items;
}