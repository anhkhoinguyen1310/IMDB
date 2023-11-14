import React from 'react'
import Modal from 'react-bootstrap/Modal';
import './ModalVideo.css'

export default function ModalVideo({showModal, setShowModal, trailerKey}) {
    const VideoModal = () => (
        <Modal show={showModal} onHide={() => setShowModal(false)} className='modal-backdrop show'>
          <Modal.Header closeButton>
            <Modal.Title>Movie Trailer</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {trailerKey && <iframe
              width="100%"
              height="315"
              src={`https://www.youtube.com/embed/${trailerKey}`}
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen></iframe>}
          </Modal.Body>
        </Modal>
      );
      
  return (
    <VideoModal />

  )
}
