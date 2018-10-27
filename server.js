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

const pool = new sql.ConnectionPool({
    user: 'zerodarkqwerty',
    password: 'Laterooms1',
    server: 'dbzerodarkqwerty.database.windows.net',
    options: {
        database: 'Hackmcr2018',
        encrypt: true,
    }
});

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
            // await sql.connect('mssql://zerodarkqwerty:Laterooms1@dbzerodarkqwerty.database.windows.net:1433/Hackmcr2018');
            // const result = await sql.query`select * from users where id = ${1}`;
            pool.connect(err => {
                console.log(err)
            })
        } catch(err) {
            console.log(err);
        }
    }
})

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();
