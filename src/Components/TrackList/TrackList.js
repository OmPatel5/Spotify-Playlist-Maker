import React from 'react';
import {Track} from '../Track/Track.js'
import "./TrackList.css"
export class TrackList extends React.Component {
    render() {
        return (
            <div className="TrackList">
                {this.props.tracks.map(track => <Track onRemove={this.props.onRemove} isRemoval={this.props.isRemoval} onPreviewAdd={this.props.onPreviewAdd} onAdd={this.props.onAdd} track={track} key={track.id} />)}
            </div>
        )
    }
}
