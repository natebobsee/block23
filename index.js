export const fetchAllPlayers = async () => {
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

export const fetchSinglePlayer = async (playerId) => {
    try {
        const response = await fetch(`${APIURL}/players/${playerID}`);
        const json = await response.json();
    
        if(!json.success) {
            throw new Error(json.error);
        }
        return json.data;
    } catch (err) {
        console.error(`Oh no, trouble fetching player #${playerId}!`, err);
    }
};
export const addNewPlayer = async (playerObj) => {
    try {

        console.log(playerObj);
        const response = await fetch(`${APIURL}/players`, {
            method: 'post',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(playerObj),
        });

        const json = await response.json();
        console.log(json)
        if(!json.success) {  
            throw new Error(json.error.message);
        }
    
        return json.data;

    } catch (err) {
        console.error('Oops, something went wrong with adding that player!', err);
    }
};