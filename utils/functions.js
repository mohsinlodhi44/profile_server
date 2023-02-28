const fs = require('fs');
const logsDir = 'logs';

function makeLog(content, file='logs.txt'){
    if (!fs.existsSync(logsDir)){
        fs.mkdirSync(logsDir);
    }

    content = `\r\n ${(new Date()).toISOString()} - ${content}`  
    fs.writeFile( `${logsDir}/${file}`, content, {flag: 'a+'}, err => {
        if (err) {
            console.error(err);
        }
    });
}

module.exports = {
    makeLog,
}