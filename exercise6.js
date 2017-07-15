const hapi = require('hapi')
const h2o2 = require('h2o2')

var server = new hapi.Server();

server.connection({
  host:'localhost',
  port:Number(process.argv[2] || 8080)
})

server.register(h2o2,function(err){
  if(err) throw err;
})

server.route({
  method: 'GET',
  path: '/proxy',
  handler:{
      proxy:{
        host: '127.0.0.1',
        port:65535
      }

  }
})

server.start(function(err){
  if(err) console.log("err while starting server");
})
