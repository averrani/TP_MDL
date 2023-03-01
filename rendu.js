const fs = require('fs');
const chalk = require('chalk');

let readlineSync = require('readline-sync');
let rawdata = fs.readFileSync('users.json');
let i;
//on a recupéré les données du fichier et on les stocke dans users
let users = JSON.parse(rawdata);
let country = new Array(users.length);
let company = new Array(users.length);

console.log(chalk.red("                    Menu : \n"));
console.log(chalk.blue(" -1- Afficher la liste des pays et le compteur"));
console.log(chalk.blue(" -2- Afficher la liste des sociétés et le compteur \n"));

let input = readlineSync.question(chalk.yellow('Quel est votre choix ? \n'));

if (input === '1') {
    //on met que les country dans country
    for (i = 0; i < users.length; i++) {
        country[i] = users[i].country;
    }
    // on compte les country et on les met dans l'objet counts
    const counts = {};
    for (const num of country) {
        counts[num] = counts[num] ? counts[num] + 1 : 1;
    }

    let res = [];
    // on transforme l'objet counts en tableau
    for (i in counts) {
        res.push({ "country": i, "count": counts[i] });
    }

    //on sort le tableau
    res.sort((a, b) => b.count - a.count);
    console.log(res);

}else if(input === '2'){
    //on met que les company dans company
    for (i = 0; i < users.length; i++) {
        company[i] = users[i].company;
    }
    // on compte les company et on les met dans l'objet counts
    const counts = {};
    for (const num of company) {
        counts[num] = counts[num] ? counts[num] + 1 : 1;
    }

    let res = [];
    // on transforme l'objet counts en tableau
    for (i in counts) {
        res.push({ "company": i, "count": counts[i] });
    }

    //on sort le tableau
    res.sort((a, b) => b.count - a.count);
    console.log(res);
}

