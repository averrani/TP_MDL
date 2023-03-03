const fs = require('fs');
const chalk = require('chalk');
let readlineSync = require('readline-sync');

let rawdata = fs.readFileSync('users.json');
let i, id, email, first, last, company, company1, created, country, country1, user, users, input;

function getData(){
    //on a recupéré les données du fichier et on les stocke dans users
    users = JSON.parse(rawdata);
    country = new Array(users.length);
    company = new Array(users.length);
}

function printQst(){
    // on affiche le menu et les questions en couleur
    console.log(chalk.red("                    Menu : \n"));
    console.log(chalk.blue(" -1- Afficher la liste des pays et le compteur"));
    console.log(chalk.blue(" -2- Afficher la liste des sociétés et le compteur"));
    console.log(chalk.blue(" -3- Ajouter un utilisateur \n"));

    input = readlineSync.question(chalk.yellow('Quel est votre choix ? \n'));
}

function getElement(elt){
    //on met que les elt selectiones dans elt
    if(elt === country){
        for (i = 0; i < users.length; i++) {
            elt[i] = users[i].country;
        }
    }else{
        for (i = 0; i < users.length; i++) {
            elt[i] = users[i].company;
        }
    }
    // on compte les elt et on les met dans l'objet counts
    const counts = {};
    for (const num of elt) {
        counts[num] = counts[num] ? counts[num] + 1 : 1;
    }
    let res = [];
    // on transforme l'objet counts en tableau
    for (i in counts) {
        if(elt === country){
            res.push({ "country": i, "count": counts[i] });
        }else{
            res.push({ "company": i, "count": counts[i] });
        }
    }
    //on sort le tableau
    res.sort((a, b) => b.count - a.count);
    console.log(res);
}

function addUser(){
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


function cases(input){
    if (input === '1') {
        getElement(country);

    }else if(input === '2'){
        getElement(company);

    }else if(input === '3'){
        addUser();
    }
}

getData();
printQst();
cases(input);




