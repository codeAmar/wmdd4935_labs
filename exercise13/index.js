const hapi = require('hapi')
const server = new hapi.Server()
const auth = require('hapi-auth-basic')

var user={name:"hapi",password:"auth"}

var validate = (request, username, password, callback) => {
    var isValid = username === user.name && password === user.password;

    return callback(null, isValid, { name: user.name });
};

server.connection({
  host:'localhost',
  port:Number(process.argv[2] || 8080)
})

server.register(auth,function(err){
  if(err) console.log('error while registering the auth')
  server.auth.strategy('simple','basic',{validateFunc:validate})
  server.route({
    method:'GET',
    path:'/',
    config:{
      auth:'simple',
      handler:function(req,res){
        return res("authentication done")
      }
    }
  })
})


server.start(function(err){
  if(err) console.log('error while connecting to server');
})
