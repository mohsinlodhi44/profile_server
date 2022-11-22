const express = require('express');
require('dotenv').config();
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

const {getProfileByUsername} = require('./Api/index');

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

app.listen(PORT, (error) => {
    if (error) {
        return console.log('Error during app startup', error);
    }
    console.log("listening on " + PORT);
});