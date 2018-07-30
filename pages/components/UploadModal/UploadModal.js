import React from 'react';
import UploadMeme from "../UploadMeme";

class UploadModal extends React.Component {
    constructor () {
        super();
        this.state = {
          showModal: false
        };
        
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    handleOpenModal () {
        this.setState({ showModal: true });
    }
      
    handleCloseModal () {
        this.setState({ showModal: false });
    }
  
    render() {
        return (
        <div className="root">
            <div className="container">
                <button onClick={this.handleOpenModal} >
                    Upload Meme
                </button>
                
                    <h1>Drop your meme here</h1>
                    <UploadMeme/>

                    <button onClick={this.handleCloseModal}>Cancel upload</button>
            </div>
        </div>
        );
    }
}


export default withStyles(s)(UploadModal);