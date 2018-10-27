const Hapi = require('hapi');
const login = require('./login');
const userDetails = require('./userDetails');
const location = require('./location');
const scoring = require('./scoring');
const leaderboard = require('./leaderboard');

const server = Hapi.server({
    port: 6006,
    host: 'localhost',
});

const init = async () => {
    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
};

const config = {
    cors: {
        origin: ['*'],
        additionalHeaders: ['cache-control', 'x-requested-with']
    }
};

server.route({
    config,
    method: 'GET',
    path: '/getUserDetails',
    handler: (request, h) => {
        const ID = request.query.ID;
        return userDetails(ID);
    }
});

server.route({
    config,
    method: 'GET',
    path: '/locationtest',
    handler: (request, h) => {
        const lat = request.query.lat;
        const long = request.query.long;
        return location(lat,long);
    }
});

server.route({
    config,
    method: 'GET',
    path: '/score',
    handler: (request, h) => {
        const lat = request.query.lat;
        const long = request.query.long;
        const ID = request.query.ID;
        return scoring(ID,lat,long);
    }
});

server.route({
    config,
    method: 'GET',
    path: '/login',
    handler: (request, h) => {
        const username = request.query.username;
        const password = request.query.password;
        return login(username, password);
    }
});

server.route({
    config,
    method: 'GET',
    path: '/leaderboard',
    handler: (request, h) => {
        return leaderboard();
    }
});


process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();
