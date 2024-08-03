import React, { useState } from 'react';
import SignaturePad from 'react-signature-canvas';
import { Modal, Button} from 'react-bootstrap';

const WaiverButton = ({ onSignatureSave, disabled }) => {
  const [show, setShow] = useState(false);
  const signaturePadRef = React.useRef(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleClear = () => {
    if (signaturePadRef.current) {
      signaturePadRef.current.clear();
    }
  };

  const handleSave = () => {
    if (signaturePadRef.current) {
      const signatureDataURL = signaturePadRef.current.toDataURL();
      onSignatureSave(signatureDataURL);
      handleClose();
    }
  };

  return (
    <>
      <button
        onClick={handleShow}
        disabled={disabled}
        className={`btn btn-secondary ${disabled ? 'btn-disabled' : ''}`}
      >
        {disabled ? 'Please agree to the terms first' : 'Sign Waiver'}
      </button>

      <Modal show={show} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Sign Waiver</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="signature-pad-container">
            <h3 className="signature-heading">
              Terms & Conditions Waiver<br />
              Signature of participant and/or legal guardian/parent of participant 18 years old or younger
            </h3>
            <div className="signature-pad-wrapper">
              <SignaturePad ref={signaturePadRef} canvasProps={{ className: 'signature-pad' }} />
            </div>
            <p className="signature-description">
              Use your mouse or touch screen to sign above.
            </p>
            <p className="signature-description">
              By signing this agreement with an electronic signature, I agree that such signature will be as valid as handwritten signatures to the extent allowed by local law.
            </p>
            <div className="signature-buttons">
              <button variant="secondary" onClick={handleClear} className="btn btn-secondary">Clear</button>
              <Button variant="secondary" onClick={handleSave} disabled={disabled}>
                {disabled ? 'Please agree to the terms first' : 'Save Signature'}
              </Button>
              <button variant="secondary" onClick={handleClose} className="btn btn-secondary">Cancel</button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default WaiverButton;
