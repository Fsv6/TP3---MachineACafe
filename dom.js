/**
 * Mes définitions
 * @typedef {title: string, duree: number} Etape
 * @property {string} title
 * @property {number} duree
 */


/**
 *
 * @param {string} tagName
 * @param {object} attributes
 * @return {HTMLElement}
 */
export function createElement(tagName, attributes = {}) {
    const element = document.createElement(tagName)
    for (const [attribute, value] of Object.entries(attributes)) {
        element.setAttribute(attribute, value)
    }
    return element
}

/**
 * Injecte des éléments de type li
 * @param {[Etape]}lesEtapes
 * @param {HTMLElement}laListe
 */
export function injectElements(lesIngre, laListe) {
    for (let Ingre in lesIngre) {
        let liListe = createElement('li')
        liListe.innerText = Ingre + " : " + lesIngre[Ingre];
        laListe.append(liListe)
    }
}

export async function injectSelects(lesTypes, leSelect) {
    for (let type of Object.values(lesTypes)) {
            let selOption = createElement('option')
            selOption.innerText = type.nom
            leSelect.append(selOption)

    }
}



/**
 * Supprime si nécessaire un tag, puis le recréé
 * @param {string} tagName
 * @return {HTMLElement}
 */
export function renewTag(tagName) {
    const laListe = document.querySelector(tagName)
    if (laListe !== null) {
        laListe.remove()
    }
    return createElement(tagName)
}

/**
 * Permet d'ajouter un délai avant un traitement
 * @param {Number} duree en ms
 * @return {Promise<unknown>}
 */
export function delay(duree) {
    duree = duree || 2000;
    return new Promise(resolve => {
        setTimeout(() => {
            resolve()
        }, duree);
    });
}