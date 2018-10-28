const sql = require('mssql');

module.exports = async (query) =>{
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

    const pool = new sql.ConnectionPool(config);
        await pool.connect();
        const request = new sql.Request(pool);
        const result = await request.query(query);
        return result;
}