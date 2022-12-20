import React from 'react';
import './Preview.css'

export class Preview extends React.Component {
  render() {
    return (
        <div className="PreviewTracks">
            <h2>Preview</h2>
						<hr/>
						<div className='previewCover'>
							<img className='coverImage' alt='Album cover' src={this.props.previewTracks.image}/>
              <div className='description'>
                <h3 className='trackName'>{this.props.previewTracks.name}</h3>
                <h4 className='trackArtist'>{this.props.previewTracks.artists}</h4>
                <audio src={this.props.previewTracks.preview_url} key='track' controls autoPlay></audio>

              </div>
						</div>
						
        </div>
    );
  }
}