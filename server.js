const Hapi = require('hapi');
const sql = require('mssql');
const database = require('./database')
const server = Hapi.server({
    port: 6006,
    host: 'localhost'
});

const init = async () => {
    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
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
            const ID = request.query.ID;
            const result1 = database('select * from userTable where id = 1');
            return result1;
    }
})

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();
