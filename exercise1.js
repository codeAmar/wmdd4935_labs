const Hapi=require('hapi');
const server = new Hapi.Server();

server.connection({
  host:"localhost",
  port:Number(process.argv[2] || 5000)
})

server.route(
  {
    method:'GET',
    path:'/',
    handler:function(request,reply){
      reply("Hello hapi")
    }
  }
)

server.start(function(){
  console.log("server running on port :" + server.info.uri);
})
