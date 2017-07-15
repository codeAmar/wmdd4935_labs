const Hapi=require('hapi');
const server = new Hapi.Server();
var inert =require('inert');



server.connection({
  host:"localhost",
  port:Number(process.argv[2] || 8080)
})

server.register(inert,function(err){
  if(err) throw err


  server.route(
    {
      method:'GET',
      path:'/',
      handler:function(request,reply){
        reply.file('index.html')
      }
    }
  )

})



server.start(function(){
  console.log("server running on port :" + server.info.uri);
})
