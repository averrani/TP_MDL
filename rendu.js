const fs = require('fs');
let rawdata = fs.readFileSync('users.json');
//console.log(rawdata);
let users = JSON.parse(rawdata);
let country = new Array(users.length);

for(i = 0; i < users.length; i++){
    country[i] = users[i].country;
}

const counts = {};
for (const num of country) {
    counts[num] = counts[num] ? counts[num] + 1 : 1;
}

let res = []; 


for(i in counts){
    res.push({"country" : i, "count" : counts[i]});
}

res.sort((a,b) => b.res - a.res);
console.log(res);
