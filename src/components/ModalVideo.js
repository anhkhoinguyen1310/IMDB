import React from 'react';
import Modal from 'react-bootstrap/Modal';
import YouTube from 'react-youtube';
import './ModalVideo.css'

export default function ModalVideo({showModal, setShowModal, trailerKey}) {
    const opts = {
        width: '100%',   // Width is 100% of the container
        playerVars: {
            autoplay: 1,
            controls: 1,
            modestbranding: 1,
            rel: 0
        },
    };

    return (
        <Modal centered show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Movie Trailer</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {trailerKey && 
              <div className="video-responsive">
                <YouTube videoId={trailerKey} opts={opts} />
              </div>
            }
          </Modal.Body>
        </Modal>
    );
}
