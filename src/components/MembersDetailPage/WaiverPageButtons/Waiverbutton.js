import React from 'react';
import SignaturePad from 'react-signature-canvas';

const WaiverButton = ({ onSignatureSave, disabled }) => {
  const signaturePadRef = React.useRef(null);

  const handleClear = () => {
    if (signaturePadRef.current) {
      signaturePadRef.current.clear();
    }
  };

  const handleSave = () => {
    if (signaturePadRef.current) {
      const signatureDataURL = signaturePadRef.current.toDataURL();
      onSignatureSave(signatureDataURL);
    }
  };

  return (
    <div className="waiver-button-container">
      <h3 className="signature-heading">
        Terms & Conditions Waiver<br />
        Signature of participant and/or legal guardian/parent of participant 18 years old or younger
      </h3>
      <div className="signature-pad-container">
        <SignaturePad ref={signaturePadRef} />
        <p className="signature-description">
          Use your mouse or touch screen to sign above.
        </p>
        <button onClick={handleSave} disabled={disabled} className="btn btn-primary">
          {disabled ? 'Please agree to the terms first' : 'Sign Waiver'}
        </button>
      </div>
    </div>
  );
};

export default WaiverButton;
