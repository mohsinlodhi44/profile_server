const baseUrl = process.env.API_ROOT || "https://aws.linkst.ar/api";

const getProfileByUsername = (subdomain)=>{
    return Promise((resolve, reject)=>{
        
        fetch(baseUrl + "/get_fullname",
        {
        method: 'POST',
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: subdomain })
        }).then((res) => {
        return res.json();
        }).then((body) => {
        if (body.success) {
            return resolve({fullname: body.data?.fullname, icon: body.data?.icon});
        }
        reject(false);
        return;
        })

    });

}

module.exports = {getProfileByUsername};