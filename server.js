const Hapi = require('hapi');

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

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();
