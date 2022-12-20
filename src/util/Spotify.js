const CLIENT_ID = 'b1d6bc59fb524faba158e317ce58ffff';
const redirectURI = "https://ompatel5.netlify.app";
let userAccessToken = '';
let Spotify = {
    getAccesssToken() {
        console.log('getAccessToken() is working')
        if (userAccessToken) {
            return userAccessToken;
        }
        else {
            let url = window.location.href;
            let access_token = url.match('access_token=([^&]*)')
            let expires_in = url.match('expires_in=([^&]*)')

            console.log(access_token)

            if (access_token && expires_in) {
                userAccessToken = access_token;
            }

            else if (userAccessToken === '') {
                window.location.href = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`
            }
        }
    },
    async search(searchTerm) {
        console.log('search() on Spotify Object is working')
        let baseURL =  'https://api.spotify.com';
        let searchParam = `/v1/search?type=track&q=${searchTerm}`;
        let endpoint = baseURL + searchParam;
        console.log(userAccessToken[1])
        const response = await fetch(endpoint, {
            headers: {Authorization: `Bearer ${userAccessToken[1]}`}
          });
        console.log(response)
        
        try {
            if (response.ok) {
                let jsonResponse = await response.json();
                jsonResponse = jsonResponse.tracks.items;
                let tracks = jsonResponse.map(track => track);
                console.log(tracks)
                return tracks;
            }
        }
        catch(error) {
            console.log(error)
        }
    },

    async savePlaylist(playlistName, trackURIs) {
        if (!playlistName && !trackURIs) {
            return;
        }

        let accessToken = userAccessToken[1];
        let userID;
        let playlistID;

        try {
            const userName = await fetch('https://api.spotify.com/v1/me', {
                headers: {Authorization: `Bearer ${accessToken}`}
            });
            if (userName.ok) {
                const jsonResponse = await userName.json();
                userID = jsonResponse.id;
            }
        }
        catch(error) {
            console.log(error)
        }
        try {
            const response = await fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
                method: 'POST',
                body: JSON.stringify({name: playlistName}),
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": 'application/json'
                }
                
            })
            if (response.ok) {
                const jsonResponse = await response.json();
                playlistID = jsonResponse.id;
            }
        }
        catch(error) {
            console.log(error);
        }

        try {
            const postMusic = await fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify({uris: trackURIs}),
            })
            if (postMusic.ok) {
                const jsonResponse = await postMusic.json();
                console.log(jsonResponse)
            }
        }
        catch(error) {
            console.log(error)
        }
    }
}; 
export {Spotify};