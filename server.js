const Hapi = require('hapi');
const sql = require('mssql');
const server = Hapi.server({
    port: 6006,
    host: 'localhost'
});

const init = async () => {
    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
};

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

server.route({
    method: 'GET',
    path: '/getUserDetails',
    handler: (request, h) => {
        const ID = request.query.ID;
        return {
            ID,
            userName: 'tramagotcha',
            password: 'p4ssw0rd',
            currentLevel: 40,
            currentScore: 9000,
            currentXp: 360,
            PetId: 123,
        };
    }
});

server.route({
    method: 'GET',
    path: '/testdb',
    handler: async (request, h) => {
        try {
            // await sql.connect('mssql://zerodarkqwerty:Laterooms1!@dbzerodarkqwerty.database.windows.net:1433/Hackmcr2018');

            const ID = request.query.ID;
            const pool = await sql.connect(config)
            const result1 = await pool.request()
                .input('input_parameter', sql.Int, ID)
                .query('select * from userTable where id = @input_parameter')

            sql.close();
            return result1;
        } catch(err) {
            console.log(err);
            sql.close();
        }
    }
})

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();
