const sql = require('mssql');

module.exports = async (query) =>{
    try {
    const config = {
        user: 'zerodarkqwerty',
        password: 'Laterooms1!',
        server: 'dbzerodarkqwerty.database.windows.net',
        database: 'Hackmcr2018',
        options: {
            database: 'Hackmcr2018',
            encrypt: true,
        }
    };
    const pool = await sql.connect(config)
            const result1 = await pool.request()
                .query(query)
            sql.close();
            
    return result1; 
    }
    catch(err) {
        console.log(err);
        sql.close();
    }
}