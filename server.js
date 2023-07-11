const express = require('express');
const bodyParser = require('body-parser');
const Redis = require('redis');
const app = express();
const port = 3000;
const { createHash } = require('node:crypto');
const https = require('https')
const fs = require('fs')

// https.createServer({
//   key: fs.readFileSync('/etc/letsencrypt/archive/kyleechapman.cit270.com/privkey1.pem'),
//   cert: fs.readFileSync('/etc/letsencrypt/archive/kyleechapman.cit270.com/cert1.pem'),
//   ca: fs.readFileSync('/etc/letsencrypt/archive/kyleechapman.cit270.com/chain1.pem')
// }, app).listen(port, () => {
//   redisClient.connect(); 
//   console.log('Listening...')
// });

app.get('/', (req, res) => {
  res.send('Welcome to my web server ya dork!')
})

//https.createServer({}, app).listen(3000, () => {
 // console.log('Listening...')
//})

const redisClient = Redis.createClient({
  socket: {
    host: 'redis-stedi-kylee',
    port: '6379'
  }
});

app.use(bodyParser.json()); //allow json request

app.listen(port, () => {
  redisClient.connect(); //the api server is trying to connect with redis
   console.log("listening on port: " + port); //connecting to the database
});

app.post('/login',async (req,res)=>{ //async ->
    const loginBody = req.body;
    const userName = loginBody.userName;
    const password = loginBody.password; //we need to hashe the password the user gave to us
    const hashedPassword = password==null? null : createHash('sha3-256').update(password).digest('hex');
    console.log("Hashed Password: "+hashedPassword);
    const redisPassword = password==null ? null : await redisClient.hGet('hashedpasswords', userName);
    if (password!=null && hashedPassword===redisPassword){
        //this happens if the password is correct
        res.send("welcome "+ userName);
    }else {
        //this happens if the password is not correct
        res.status(401); //unauthorized 
        res.send("incorrect password");
    }
});

//redis-server to start redis
//npm run dev to start it
// ./login.sh login script 
//P@ssw0rd

