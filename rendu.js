const fs = require('fs');
const chalk = require('chalk');

let readlineSync = require('readline-sync');
let rawdata = fs.readFileSync('users.json');
let i, id, email, first, last, company1, created, country1, user;
//on a recupéré les données du fichier et on les stocke dans users
let users = JSON.parse(rawdata);
let country = new Array(users.length);
let company = new Array(users.length);

console.log(chalk.red("                    Menu : \n"));
console.log(chalk.blue(" -1- Afficher la liste des pays et le compteur"));
console.log(chalk.blue(" -2- Afficher la liste des sociétés et le compteur"));
console.log(chalk.blue(" -3- Ajouter un utilisateur \n"));

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
}else if(input === '3'){
    id = readlineSync.question(chalk.green('Quel est l`id ? \n'));
    email = readlineSync.question(chalk.green('Quel est l`email ? \n'));
    first = readlineSync.question(chalk.green('Quel est le prenom ? \n'));
    last = readlineSync.question(chalk.green('Quel est le nom? \n'));
    company1 = readlineSync.question(chalk.green('Quel est le nom de la société ? \n'));
    created = readlineSync.question(chalk.green('Quand a elle été créee ? \n'));
    country1 = readlineSync.question(chalk.green('Quel est en est le pays ? \n'));

    user = {
        id: id,
        email: email,
        first: first,
        last: last,
        company: company1,
        created_at: created,
        country: country1
    };

    users.push(user)

    var newdata = JSON.stringify(users);
    fs.writeFile('users.json', newdata, err => {
        // error checking
        if(err) throw err;
        
        console.log(chalk.yellow("Utilisateur ajouté"));
    });
}

