import React from 'react';
import "./Track.css"

export class Track extends React.Component {
  constructor(props) {
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.addToPreview = this.addToPreview.bind(this);
  }
  renderAction() {
      let renderActionButton = this.props.isRemoval ? <button className='Track-action' onClick={this.removeTrack}>-</button> : <button className='Track-action' onClick={this.addTrack}>+</button>;
      return renderActionButton;
  }

  addTrack() {
    this.props.onAdd(this.props.track);
  }

  removeTrack() {
    this.props.onRemove(this.props.track);
  }

  addToPreview() {
    this.props.onPreviewAdd(this.props.track)
  }

  render() {
    return (
      <div className="Track">
          <div className="Track-information">
              <h3>{this.props.track.name}</h3>
              <p>{this.props.track.artists[0].name} | {this.props.track.album.name}{this.renderAction()}<button className='Track-action' onClick={this.addToPreview}>*</button></p>
          </div>
      </div>
    );
  }
}