import React from 'react';
import {TrackList} from '../TrackList/TrackList.js'
import './Playlist.css'

export class Playlist extends React.Component {
  constructor(props) {
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);

  }
  handleNameChange(event) {
    this.props.onNameChange(event.target.value)
  }
  
    render() {
      return (
        <div className="Playlist">
            <input defaultValue={'New Playlist'}  onChange={this.handleNameChange}/>
            <TrackList onRemove = {this.props.onRemove} isRemoval={true} playListName={this.props.playlistName} onPreviewAdd={this.props.onPreviewAdd} tracks={this.props.playListTracks} />
            <button className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</button>
        </div>
      );
    }
  }
  