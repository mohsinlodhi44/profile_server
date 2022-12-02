const express = require('express');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3000;

const { updateDomainStatus} = require('./Api/index');

app.use(express.json());

  app.post('/verify/api',(req, res)=>{
    if(!req?.body?.user_id || !req?.body?.domain_id){
        return res.status(400).send('Data required');
    }
    console.log('Received:' ,req.body);
    try{
        updateDomainStatus(req.body)
        .then(data=>{
            return res.status(200).json({success:true})
        })
        .catch(err=>{
        console.log('Err:' ,err);
            return res.status(400).json({success:false})
        })
    }catch(e){
        console.log('error: ',e);
        return res.status(400).send('Something went wrong');
    }
  });

app.listen(PORT, (error) => {
    if (error) {
        return console.log('Error during app startup', error);
    }
    console.log("listening on " + PORT);
});
