const config=require('config');
module.exports =function(){
      if(!config.get('jwtPrivateKey'))
      {
      console.error('Failed Error');
      //process.exit(1);
     }
}