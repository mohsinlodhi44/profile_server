const express = require('express');
require('dotenv').config();
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

const {getProfileByUsername, updateDomainStatus} = require('./Api/index');

app.use(express.json());
// static resources should just be served as they are
app.use(express.static(
    path.resolve(__dirname, 'html'),
));

const indexPath  = path.resolve(__dirname, 'html', 'index.html');
app.get('/*', (req, res, next) => {
    fs.readFile(indexPath, 'utf8', (err, htmlData) => {
        if (err) {
            console.error('Error during file reading', err);
            return res.status(301).redirect('https://linkst.ar');
        }
        // get post info
        const username = req.subdomains?.length>0 ? req.subdomains[0] : null;
        if(!username) return res.status(301).redirect('https://linkst.ar');

        let icon = "https://linkst.ar/logo.png";
        getProfileByUsername(username)
        .then(data=>{
            if(data?.icon){
                icon = data?.icon;
            }
            htmlData = htmlData
            .replace('__META_OG_TITLE__', data.fullname +" - Linkstar")
            .replace('__META_TITLE__', data.fullname +" - Linkstar")
            .replace('__META_OG_IMAGE__', icon)
            return res.send(htmlData);
        })
        .catch(()=> res.status(301).redirect('https://linkst.ar') );

    });
  });

  app.post('/verify/api',(req, res)=>{
    if(!req?.body?.user_id || !req?.body?.domain_id){
        return res.status(400).send('Data required');
    }
    try{
        updateDomainStatus(req.body)
        .then(data=>{
            return res.status(200).json({success:true})
        })
        .catch(err=>{
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
