import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './UploadModal.css';
import ReactModal from "react-modal";
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
        <div className={s.root}>
            <div className={s.container}>
                <button onClick={this.handleOpenModal} >
                    Upload Meme
                </button>
                <ReactModal 
                    isOpen={this.state.showModal}
                    contentLabel="Minimal Modal Example"
                    ariaHideApp={false}
                    >
                    <h1>Drop your meme here</h1>
                    <UploadMeme/>

                    <button onClick={this.handleCloseModal}>Cancel upload</button>
                </ReactModal>
            </div>
        </div>
        );
    }
}


export default withStyles(s)(UploadModal);