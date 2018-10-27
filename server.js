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
    path: '/',
    handler: (request, h) => {

        return 'Tramagotcha api!';
    }
});

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();
