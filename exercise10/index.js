const hapi = require('hapi')
const server = new hapi.Server()
const path = require('path')
const joi = require('joi')

server.connection({
  host:'localhost',
  port:Number(process.argv[2] || 8080)
})

server.route(
  {
    method:'POST',
    path:'/login',
    config:{
      handler:function(request,reply){
        reply('login successful')
      },
      validate:{
        payload: joi.object({
          isGuest:joi.boolean().required(),
          username:joi.string().when('isGuest',{is:false, then:joi.required()}),
          password:joi.string().alphanum(),
          accessToken:joi.string().alphanum()
        }).options({allowUnknown:true}).without('password','accessToken0')
      }
    }
  }
)

server.start(function(err){
  if(err) console.log('error while starting server');
})
