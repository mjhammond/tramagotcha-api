const database = require('../database')

module.exports = async (username, password) =>{
    const result = await database(`select * from userTable where username = '${username}'`);
    const Sqlpassword = result.recordset[0].passwrd;
    if(password === Sqlpassword){
        return {
            userid: result.recordset[0].ID
        };
    }
    return false;
}