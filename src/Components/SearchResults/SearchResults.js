import React from 'react';
import './SearchResults.css'
import {TrackList} from '../TrackList/TrackList.js'

export class SearchResults extends React.Component {
  render() {
    return (
        <div className="SearchResults">
            <h2>Results</h2>
            <TrackList tracks={this.props.searchResults} isRemoval={false} onPreviewAdd={this.props.onPreviewAdd} onAdd={this.props.onAdd}/>
        </div>
    );
  }
}
