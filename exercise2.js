const Hapi=require('hapi');
const server = new Hapi.Server();

server.connection({
  host:"localhost",
  port:Number(process.argv[2] || 8080)
})

server.route(
  {
    method:'GET',
    path:'/{parameter}',
    handler:function(request,reply){
      reply("Hello " + encodeURIComponent(request.params.parameter))
    }
  }
)

server.start(function(){
  console.log("server running on port :" + server.info.uri);
})
