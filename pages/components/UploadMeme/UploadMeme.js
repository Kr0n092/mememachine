import React from "react";
import Dropzone from "react-dropzone";

class UploadMeme extends React.Component {
    constructor() {
        super()
        this.state = {
          accept: 'image/jpeg',
          accepted: [],
          rejected: [],
          dropzoneActive: false
        }
      }
    
      onDragEnter() {
        this.setState({
          dropzoneActive: true
        });
      }
    
      onDragLeave() {
        this.setState({
          dropzoneActive: false
        });
      }
    
      onDrop(accepted, rejected) {
          let prevAccepted = this.state.accepted;
          if (accepted) {
              accepted.map(acceptedFile => {
                  prevAccepted.push(acceptedFile);
              });
          }

          let prevRejected = this.state.rejected;
          if (rejected) {
            rejected.map(rejectedFile => {
                prevRejected.push(rejectedFile);
            });
          }
        this.setState({
          accepted: prevAccepted,
          rejected: prevRejected,
          dropzoneActive: false
        });
      }
    
      applyMimeTypes(event) {
        this.setState({
          accept: event.target.value
        });
      }
    
      render() {
        const { accept, files, dropzoneActive } = this.state;
        const overlayStyle = {
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          padding: '2.5em 0',
          background: 'rgba(0,0,0,0.5)',
          textAlign: 'center',
          color: '#fff'
        };
        return (
          <Dropzone
            disableClick
            style={{position: "relative"}}
            accept={accept}
            onDrop={this.onDrop.bind(this)}
            onDragEnter={this.onDragEnter.bind(this)}
            onDragLeave={this.onDragLeave.bind(this)}
          >
            { dropzoneActive && <div style={overlayStyle}>Drop files...</div> }
            <div>
    
            <h2>Accepted files</h2>
            <ul>
                {
                this.state.accepted.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
                }
            </ul>
            <h2>Rejected files</h2>
            <ul>
                {
                this.state.rejected.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
                }
            </ul>
    
            </div>
          </Dropzone>
        );
      }
}

export default UploadMeme;