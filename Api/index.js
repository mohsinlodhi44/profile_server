const fetch = require('node-fetch');

const baseUrl = process.env.API_ROOT || "https://aws.linkst.ar/api";

const getProfileByUsername = (subdomain)=>{
    return new Promise((resolve, reject)=>{
        
        fetch(baseUrl + "/get_fullname",
        {
        method: 'POST',
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: subdomain })
        }).then((res) => {
            console.log('response: ',res)
        return res.json();
        }).then((body) => {
        if (body.success) {
            return resolve({fullname: body.data?.fullname, icon: body.data?.icon});
        }
        reject(body);
        return;
        }).catch(err=>{
        console.log('err response: ',res)

            reject(err);
            return;
        })

    });

}
const updateDomainStatus = (data)=>{
    return new Promise((resolve, reject)=>{
        
        fetch(baseUrl + "/user/update_domain",
        {
        method: 'POST',
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
        }).then((res) => {
        return res.json();
        }).then((body) => {
        if (body.success) {
            return resolve(body.data);
        }
        reject(false);
        return;
        }).catch(err=>{
            reject(false);
            return;
        })

    });

}

module.exports = {getProfileByUsername, updateDomainStatus};