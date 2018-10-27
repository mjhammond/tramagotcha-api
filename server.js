const Hapi = require('hapi');
const database = require('./database');
const login = require('./login');
const userDetails = require('./userDetails')

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
        return userDetails(ID);
    }
});

server.route({
    method: 'GET',
    path: '/login',
    handler: (request, h) => {
        const username = request.query.username;
        const password = request.query.password;
        return login(username, password);
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
