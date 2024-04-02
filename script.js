
import {addNewPlayer, fetchSinglePlayer} from "./index.js";

//const {fetchAllPlayers} = require('./index.js')
const playerContainer = document.getElementById('all-players-container');
const newPlayerFormContainer = document.getElementById('new-player-form');

// Add your cohort name to the cohortName variable below, replacing the 'COHORT-NAME' placeholder
const cohortName = '2401-FTB-ET-WEB-PT';
// Use the APIURL variable for fetch requests
const APIURL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/`;

/**
 * It fetches all players from the API and returns them
 * @returns An array of objects.
 */
const fetchAllPlayers = async () => {
    try {
        const response = await fetch(`${APIURL}/players`);
        const json = await response.json();
    
        if(!json.success) {
            throw new Error(json.error);
        }
        return json.data.players;
    } catch (err) {
        console.error('Uh oh, trouble fetching players!', err);
    }
};

// const fetchSinglePlayer = async (playerId) => {
//     try {
//         const response = await fetch(`${APIURL}/players/${playerID}`);
//         const json = await response.json();
    
//         if(!json.success) {
//             throw new Error(json.error);
//         }
//         return json.data;
//     } catch (err) {
//         console.error(`Oh no, trouble fetching player #${playerId}!`, err);
//     }
// };

// const addNewPlayer = async (playerObj) => {
//     try {

//         console.log(playerObj);
//         const response = await fetch(`${APIURL}/players`, {
//             method: 'post',
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify(playerObj),
//         });

//         const json = await response.json();
//         console.log(json)
//         if(!json.success) {  
//             throw new Error(json.error.message);
//         }
    
//         return json.data;

//     } catch (err) {
//         console.error('Oops, something went wrong with adding that player!', err);
//     }
// };

const removePlayer = async (playerId) => {
    try {
        //console.log(playerId);
        const response = await fetch(`${APIURL}/players/${playerId}`, {
            method: 'delete'
        });
    
        if(response.status === 204) {
            return true;
        }
    
        throw new Error(` ${id}`);
    } catch (err) {
        console.error(
            `Whoops, trouble removing player #${playerId} from the roster!`,
            err
        );
    }
};

/**
 * It takes an array of player objects, loops through them, and creates a string of HTML for each
 * player, then adds that string to a larger string of HTML that represents all the players. 
 * 
 * Then it takes that larger string of HTML and adds it to the DOM. 
 * 
 * It also adds event listeners to the buttons in each player card. 
 * 
 * The event listeners are for the "See details" and "Remove from roster" buttons. 
 * 
 * The "See details" button calls the `fetchSinglePlayer` function, which makes a fetch request to the
 * API to get the details for a single player. 
 * 
 * The "Remove from roster" button calls the `removePlayer` function, which makes a fetch request to
 * the API to remove a player from the roster. 
 * 
 * The `fetchSinglePlayer` and `removePlayer` functions are defined in the
 * @param playerList - an array of player objects
 * @returns the playerContainerHTML variable.
 */
const renderAllPlayers =  async (playerList) => {
  //  if (!playerList || !playerList.length)
//{return}
    try {
        //console.log(playerList);
        const playerlist = await playerList
         playerlist.forEach((player) => {
         renderplayers(player);
        });


    } catch (err) {
        console.error('Uh oh, trouble rendering players!', err);
    }
};

function renderplayers (player) {  
    const playerElement = document.getElementById('all-players-container');
    const elem = document.createElement('div');
        elem.classList.add('playerone')

        const nameElem = document.createElement('div');
        nameElem.classList.add('name')
        nameElem.append(player.name)
        const breedElem = document.createElement('div');
        breedElem.classList.add('breed')
        breedElem.append(player.breed)
        const statusElem = document.createElement('div');
        statusElem.classList.add('status')
        statusElem.append(player.status)
        const imageUrlElem = document.createElement('div');
        imageUrl.classList.add('imageurl')
        imageUrlElem.append(player.imageUrl)
        const teamIdElem = document.createElement('div');
        teamId.classList.add('teamId')
        teamIdElem.append(player.teamId)

        
        elem.append(nameElem);
        elem.append(breedElem);
        elem.append(statusElem);
        elem.append(imageUrlElem);
        elem.append(teamIdElem);

        playerElement.append(elem);  
}

/**
 * It renders a form to the DOM, and when the form is submitted, it adds a new player to the database,
 * fetches all players from the database, and renders them to the DOM.
 */
const renderNewPlayerForm = () => {
    try { 
        const id = document.getElementById('id');
        const name = document.getElementById('name');
        const breed = document.getElementById('breed');
        const status = document.getElementById('status');
        const imageUrl = document.getElementById('imageUrl');
        const teamId = document.getElementById('teamId');
        
        const players = {
            id: id.value,
            name: name.value,
            breed: breed.value,
            status: status.value,
            imageUrl: imageUrl.value,
            teamId: teamId.value
        }
            //console.log(players);
        const newplayer = addNewPlayer(players);
        console.log(newplayer);
        renderAllPlayers(newplayer);
        //console.log(players);

        
    } catch (err) {
        console.error('Uh oh, trouble rendering the new player form!', err);
    }
}

const init = async () => {
//console.log('hello');
    const players = await fetchAllPlayers();
    //console.log(players);
    await renderAllPlayers(players);

}
    //renderNewPlayerForm();

    const form = document.getElementById('playerid');
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        renderNewPlayerForm();
    });

    //remove players
    const formA = document.getElementById('playeriddelete');
    formA.addEventListener('submit', async (event) => {
       console.log(formA);
        event.preventDefault();
        const playeriddel = document.getElementById('playeriddel');
       const playerId=playeriddel.value
       console.log(playeriddel);
       removePlayer(playerId)
    });

    const formB = document.getElementById('playeridupdate');
    formB.addEventListener('submit', async (event) => {
        console.log(formA);
        event.preventDefault();
        const playeriddel = document.getElementById('playeridud');
       const playerId=playeridud.value
       console.log(playeridud);
       fetchSinglePlayer(playerId)   
    
    });

init();