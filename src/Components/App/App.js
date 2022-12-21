import React from 'react';
import {SearchBar} from '../SearchBar/SearchBar.js'
import {SearchResults} from '../SearchResults/SearchResults.js'
import {Playlist} from '../Playlist/Playlist.js'
import './App.css';
import { Spotify } from '../../util/Spotify.js';
import { Preview } from '../Preview/Preview.js';
Spotify.getAccesssToken();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {searchResults: [], 
                  playlistName: "New Playlist", 
                  playListTracks: [],
                  previewTracks: {}
                }
    this.addTrack = this.addTrack.bind(this);
    this.addToPreview = this.addToPreview.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  savePlaylist() {
    let trackURIs = this.state.playListTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackURIs);
    this.setState({playListTracks: []})
  }

  search(searchTerm) {    
    if (searchTerm) {
      let tracks = Spotify.search(searchTerm);
      tracks.then((result)=>{
        this.setState({searchResults: result})
      });
    }
    else {
      this.setState({searchResults: []})
    }
  }

  addTrack(track) {
    if (this.state.playListTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }
    else {
      this.state.playListTracks.push({
        name: track.name, artists: track.artists, album: track.album, id: track.id, uri: track.uri, preview_url: track.preview_url, image: track.album.images[0].url
      });
      
      this.setState(this.state.playListTracks)

    } 
  }

  addToPreview(track) {
      let previewTrack = {name: track.name, artists: track.artists[0].name, album: track.album.name, id: track.id, uri: track.uri, preview_url: track.preview_url, image: track.album.images[0].url}
      this.setState({previewTracks: previewTrack});

  }

  removeTrack(track) {
    let removedItem = this.state.playListTracks.findIndex(element => element.id === track.id);
    this.state.playListTracks.splice(removedItem, 1)

    this.setState(this.state.playListTracks)
  }

  updatePlaylistName(name) {
    this.setState({
      playlistName: name
    })
  }

  render() {
    return (
      <div>
        <h1>Spotify <span className="highlight">Playlist</span> Maker</h1>
        <div className="App">
          <SearchBar onSearch={this.search}/>
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} onPreviewAdd={this.addToPreview}/>
            <Playlist playListName={this.state.playlistName} playListTracks={this.state.playListTracks} onPreviewAdd={this.addToPreview} onSave={this.savePlaylist} onNameChange={this.updatePlaylistName} onRemove={this.removeTrack}/>
          </div>
          <div className="Preview">
            <Preview previewTracks={this.state.previewTracks}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
