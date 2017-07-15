const hapi = require('hapi')
const boom = require('boom')
const server = new hapi.Server()

server.connection({
  host:'localhost',
  port: Number(process.argv[2] || 8080)
})

server.state('session',{
  path:'/',
  domain:'localhost',
  ttl:10,
  encoding:'base64json',
  isSameSite:false,
  isSecure:false,
  isHttpOnly:false
})

server.route({
    method: 'GET',
    path: '/set-cookie',
    handler: (request, reply) => {
        return reply({
            message : 'cookie set'
        }).state('session', { key : 'makemehapi' });
    },
    config: {
        state: {
            parse: true,
            failAction: 'log'
        }
    }
})

  server.route({
      method: 'GET',
      path: '/check-cookie',
      handler: (request, reply) => {
          var session = request.state.session;
          var result;

          if (session) {
              result = { user : 'hapi' };
          } else {
              result = boom.unauthorized('Missing authentication');
          }

          reply(result);
      }
  });

  server.start(function(err){
  if(err) console.log("error while starting the server");
})
