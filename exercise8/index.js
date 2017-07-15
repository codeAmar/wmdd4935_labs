const hapi = require('hapi')
const path = require('path')
const server = new hapi.Server();
const fs = require('fs');
const rot13 = require('rot13-transform')


server.connection({
  host:'localhost',
  port:Number(process.argv[2] || 8080)
})

var data = fs.createReadStream('./sample.txt')
.on('error',function(){console.log('error while reading file')})

server.route(
  {
    method:'GET',
    path:'/',
    handler:function(request,reply){
      reply(data.pipe(rot13()))
    }
  }
)

server.start(function(err){
  if(err) console.log('error while connection to server');
})
