import {createElement, delay, injectSelects, injectElements, renewTag} from "./functions/dom.js";
const wrapper = document.querySelector('#controle')

const typeCafe = [
    {
    nom : "expresso",
    ingredients : {
        eau : 250,
        grains : 16
    },
    prix : 4
},
    {
        nom : "latte",
        ingredients : {
            eau : 350,
            lait : 75,
            grains : 20
        },
        prix : 7
    },
    {
        nom : "cappuccino",
        ingredients : {
            eau : 200,
            lait : 100,
            grains : 12
        },
        prix : 6
    }]



const machine = {
    qtéEau : 400,
    qtéLait: 540,
    qtéCafé : 120,
    nbTasses: 9,
    argent : 550
}
//Définition des fonctions ----------------------------------------------------------------------------------------------

function afficherIngredients() {
    const listIng = createElement('ul')
    wrapper.append((listIng))
    injectElements(machine,listIng)
}

function achatExpresso() {
    return new Promise(async (resolve) => {
        const expresso = typeCafe.find(cafe => cafe.nom === "expresso");
        if (machine.qtéEau < expresso.ingredients.eau ||
            machine.qtéCafé < expresso.ingredients.grains
        ) {
            alert("Il n'y a pas assez d'ingrédients, veuillez réapprovisionner la machine ")
            resolve(false)
        } else {
            machine.qtéEau -= expresso.ingredients.eau;
            machine.qtéCafé -= expresso.ingredients.grains;
            --machine.nbTasses;
            machine.argent += expresso.prix
            await delay(4000);
            alert("Votre expresso est prêt !")
            resolve(machine)
        }
    });
}

async function achatLatte() {
    return new Promise(async (resolve) => {
        const latte = typeCafe.find(cafe => cafe.nom === "latte");
        if (
            machine.qtéEau < latte.ingredients.eau ||
            machine.qtéCafé < latte.ingredients.grains ||
            machine.qtéLait < latte.ingredients.lait
        ) {
            alert("Il n'y a pas assez d'ingrédients, veuillez réapprovisionner la machine ")
            resolve(false)
        } else {
            machine.qtéEau -= latte.ingredients.eau;
            machine.qtéCafé -= latte.ingredients.grains;
            machine.qtéLait -= latte.ingredients.lait
            --machine.nbTasses;
            machine.argent += latte.prix
            await delay(8000);
            alert("Votre latte est prêt !")
            resolve(machine)
        }
    });
}

async function achatCappuccino() {
    return new Promise(async (resolve) => {
        const cappuccino = typeCafe.find(cafe => cafe.nom === "cappuccino");
        if (
            machine.qtéEau < cappuccino.ingredients.eau ||
            machine.qtéCafé < cappuccino.ingredients.grains ||
            machine.qtéLait < cappuccino.ingredients.lait
        ) {
            alert("Il n'y a pas assez d'ingrédients, veuillez réapprovisionner la machine.");
            revolse(false)
        } else {
            machine.qtéEau -= cappuccino.ingredients.eau;
            machine.qtéCafé -= cappuccino.ingredients.grains;
            machine.qtéLait -= cappuccino.ingredients.lait;
            machine.nbTasses--;
            machine.argent += cappuccino.prix;
            await delay(9000);
            alert("Votre cappuccino est prêt !");
            resolve(machine)
        }
    });
}

 function acheter () {
    button_remplir.hidden = true;
    button_prendre.hidden = true;
    inputInfo.hidden = true;

     renewTag('ul')
    const listCafe = createElement('select')
     let selOption = createElement('option')
     selOption.innerText = ""
     listCafe.append(selOption)
    injectSelects(typeCafe, listCafe)
    wrapper.append(listCafe)
     listCafe.addEventListener("change", async function() {

         const optionSelect = listCafe.value;
         if (optionSelect === "expresso"){
              await achatExpresso();
         } else if (optionSelect === "latte"){
             await achatLatte();
         } else {
             await achatCappuccino();
         }
         console.log(machine)
         afficherIngredients()
         button_remplir.hidden = false;
         button_prendre.hidden = false;
         inputInfo.hidden = false;
         renewTag('select')
     });
}



async function prendre() {
    renewTag('ul')
    button_remplir.hidden = true;
    button_acheter.hidden = true;
    inputInfo.hidden = true;
    machine.argent = 0;
    await delay (2000);
    alert("Vous avez récupéré l'argent présent dans la machine")
    console.log(machine.argent)
    button_remplir.hidden = false;
    button_acheter.hidden = false;
    inputInfo.hidden = false;
    afficherIngredients()

}

//permet de récupérer la valeur tapée par l'utilisateur lorsqu'on lui demande quelle quantité d'un certain ingrédient il veut ajouter git
function demanderAjout(question) {
    return new Promise((resolve) => {
        inputInfo.value = question;

        inputInfo.addEventListener("change", function () {
            const ajout = inputInfo.value;
            resolve(ajout);
        });
    });
}


async function remplir() {
    renewTag('ul')
    button_prendre.hidden = true;
    document.querySelector('#start').hidden = true;
    const ajoutEau = await demanderAjout("Qté d'eau à ajouter ? ");
    const ajoutLait = await demanderAjout("Qté de lait à ajouter ?");
    const ajoutCafe = await demanderAjout("Qté grains de café à ajouter ?");
    const ajoutTasses = await demanderAjout("Nb Tasses à ajouter ?");

    machine.qtéEau += parseInt(ajoutEau);
    machine.qtéLait += parseInt(ajoutLait);
    machine.qtéCafé += parseInt(ajoutCafe);
    machine.nbTasses += parseInt(ajoutTasses);
    console.log(machine)
    afficherIngredients()
    button_prendre.hidden = false;
    document.querySelector('#start').hidden = false;

}

//Mise en place de la page et lancement de la machine à café -------------------------------------------------------------------------------

afficherIngredients();
const button_acheter = document.querySelector('#start');
button_acheter.textContent = "Acheter";
const button_remplir = createElement('button', {id : "Remplir"})
const button_prendre = createElement('button', {id : "Prendre"})
const inputInfo = createElement('input', {type :'text'})
button_remplir.textContent = "Remplir";
button_prendre.textContent = "Prendre";
wrapper.append(button_prendre, button_remplir, inputInfo)

button_acheter.addEventListener("click", acheter)
button_prendre.addEventListener("click", prendre)
button_remplir.addEventListener("click", remplir)





