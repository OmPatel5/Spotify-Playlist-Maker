const CLIENT_ID = 'b1d6bc59fb524faba158e317ce58ffff';
const redirectURI = "https://ompatel5.netlify.app";
let userAccessToken = '';
let Spotify = {
    getAccesssToken() {
        console.log('getAccessToken() is working')
        if (userAccessToken) {
            console.log(userAccessToken)
            return userAccessToken;
        }
        let access_token = window.location.href.match(/access_token=([^&]*)/)
        let expires_in = window.location.href.match(/expires_in=([^&]*)/)

        if (access_token && expires_in) {
            userAccessToken = access_token[1];
            const expiresIn = Number(expires_in[1]);
            window.setTimeout(() => userAccessToken = '', expiresIn*1000);
            window.history.pushState('Access Token', null, '/');
            return userAccessToken;
        }

        else {
            let scopes = 'user-top-read%20user-library-modify'
            window.location = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${redirectURI}&scope=${scopes}`
        }    
    },
    
    async search(searchTerm) {
        let access_token;
        try {
            access_token = Spotify.getAccesssToken();
        }
        catch {
            userAccessToken='';
            access_token = Spotify.getAccesssToken();
        }
        console.log(access_token)
        console.log('search() on Spotify Object is working')
        let baseURL = 'https://api.spotify.com';
        let searchParam = `/v1/search?type=track&q=${searchTerm}`;
        let endpoint = baseURL + searchParam;
        const response = await fetch(endpoint, {
            headers: {
                Authorization: `Bearer ${access_token}`,
                "Content-Type": 'application/json'
            }
        });
        
        
        try {
            if (response.ok) {
                let jsonResponse = await response.json();
                console.log(jsonResponse)

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

        let accessToken;
        try {
            accessToken = Spotify.getAccesssToken();
        }
        catch {
            userAccessToken='';
            accessToken = Spotify.getAccesssToken();
        }

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

        accessToken = Spotify.getAccesssToken();
        console.log(userID)
        console.log(playlistName)
        try {
            const response = await fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
                method: 'POST',
                body: JSON.stringify({name: playlistName}),
                headers: {
                    Authorization: `Bearer ${accessToken}`,
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