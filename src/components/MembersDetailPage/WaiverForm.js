import React, { useState } from 'react';
import WaiverButton from './WaiverPageButtons/Waiverbutton';

const WaiverForm = ({ member, updateMember, updatedMember, setUpdatedMember }) => {
  const [waiverDate, setWaiverDate] = useState(member.waiverDate || 'Not yet signed');
  const [agreed, setAgreed] = useState(false);

  const handleSignatureSave = (signatureDataURL) => {
    const currentDate = new Date().toLocaleDateString();
    setWaiverDate(currentDate);
    setUpdatedMember({
      ...updatedMember,
      waiverDate: currentDate,
      signature: signatureDataURL,
      waiverSigned: true
    });
    updateMember(updatedMember, member);
  };

  const handleAgreeChange = (e) => {
    setAgreed(e.target.checked);
  };

  return (
    <div className="waiver-form">
      <h2>Waiver Agreement</h2>
      <p><strong>Date Signed:</strong> {waiverDate}</p>
      <button onClick={() => window.print()} className="btn btn-secondary">Print</button>
      <button onClick={() => alert('Email functionality not yet implemented')} className="btn btn-secondary">Email</button>
      
      <div className="scrollable-form-container waiver-text">
        <p>This is a binding legal agreement. As a Participant in the competitions, programs, activities and events with Mendoza Boxing Club, the undersigned acknowledges and agrees to the following terms:</p>

        <h3>Description of Risks</h3>
        <p>1. In consideration of my participation in the competitions, programs, activities and events, I hereby acknowledge that I am aware of the risks and hazards associated with or related to any such competitions, programs, activities and events. The risks and hazards include, but are not limited to, injuries from:</p>
        <ul>
          <li>a) Physical contact with the instructor, students or other participants;</li>
          <li>b) Striking students, participants, objects or equipment;</li>
          <li>c) Being struck by the instructor, students, participants, objects or equipment;</li>
          <li>d) Contact, colliding, falling or being struck by other participants, spectators or equipment;</li>
          <li>e) Executing strenuous and demanding physical techniques;</li>
          <li>f) Vigorous physical exertion, strenuous cardiovascular workouts, k movements and quick turns and stops;</li>
          <li>g) Exerting and stretching various muscle groups;</li>
          <li>h) Dry land training including weights, running, circuit training and massage;</li>
          <li>i) Extreme weather and temperature conditions which may result in heatstroke, sunstroke or hypothermia;</li>
          <li>j) Falling or colliding with the ring, walls, stands, equipment or with other participants;</li>
          <li>k) Failure to properly use any piece of equipment or from the mechanical failure of any piece of equipment;</li>
          <li>l) Spinal cord injuries which may render me permanently paralyzed;</li>
          <li>m) Travel to and from competitive events and associated non-competitive events which are an integral part of Boxing</li>
        </ul>
        <p>2. Furthermore, I am aware:</p>
        <ul>
          <li>a) That injuries sustained can be severe;</li>
          <li>b) That I may experience anxiety while challenging myself during the activities, events and programs;</li>
          <li>c) That I may come into close contact with other participants;</li>
          <li>d) That my risk of injury is reduced if I follow all rules established for participation; and</li>
          <li>e) That my risk of injury increases as I become fatigued.</li>
          <li>f) That participant acknowledged that they do not have any physical or mental limitations, that would prevent the participant in engaging in the activity</li>
        </ul>

        <h3>Release of Liability and Disclaimer</h3>
        <p>In consideration of the Canadian Amateur Boxing Association and Boxing BC at Mendoza Boxing Club allowing me to participate, I agree:</p>
        <ul>
          <li>a) That my physical condition has been verified by a medical doctor within the last six (6) months;</li>
          <li>b) To assume all risks arising out of, associated with or related to my participation and am fully aware of the nature of these risks;</li>
          <li>c) To be solely responsible for any injury, loss or damage that I might sustain while participating; and</li>
          <li>d) To RELEASE and DISCHARGE Mendoza Boxing Club and all directors, officers, committee members, clubs, members, employees, coaches, volunteers, officials, judges, participants, agents and representatives from any and all liability, for any and all claims, demands, actions, judgments, executions and costs that might arise out of my participating, even though any such risks, injuries, loss, damage, claims, demands, actions or costs may have been caused by any manner whatsoever, including but not limited to, the negligence of the Canadian Amateur Boxing Association or Boxing BC.</li>
        </ul>

        <h3>Youth Video Waiver / Media Consent</h3>
        <p>1. I hereby authorize any images or video footage taken of my youth (under 18 years of age), in whole or in part, individually or in conjunction with other images and video footage, to be displayed on the Mendoza Boxing Website and other official channels, and to be used for media purposes including promotional presentations and marketing campaigns. I also authorize the display and use of any media material created by my youth under Mendoza Boxing Club.</p>
        <p>2. I waive rights to privacy and compensation, which I may have in connection with such use of my youth’s name and likeness, including rights to be written copy that may be created in connection with video production, editing and promotion therewith.</p>
        <p>3. I am over 19 years-of-age and the parent or legal guardian of the youth, and I have read this waiver and am familiar with its content.</p>

        <h3>Adult Waiver / Media Consent</h3>
        <p>1. I hereby authorize any images or video footage taken of myself, in whole or in part, individually or in conjunction with other images and video footage, to be displayed on the Mendoza Boxing Website and other official channels, and to be used for media purposes including promotional presentations and marketing campaigns. I also authorize any media material created by myself within the Mendoza Boxing Club.</p>
        <p>2. I waive rights to privacy and compensation, which I may have in connection with such use of my name and likeness, including rights to be written copy that may be created in connection with video production, editing and promotion therewith.</p>

        <h3>Acknowledgement</h3>
        <p>1. I acknowledge that I have read and understand this agreement, that I have executed this agreement voluntarily, and that this agreement is to be binding upon myself, my heirs, executors, administrators, and representatives.</p>
        {!updatedMember.waiverSigned ? (
          <>
            <div className="form-check">
              <input
                type="checkbox"
                id="agreeCheckbox"
                checked={agreed}
                onChange={handleAgreeChange}
                className="form-check-input"
              />
              <label htmlFor="agreeCheckbox" className="form-check-label">
                I agree to the terms and use electronic signature
              </label>
            </div>
            <WaiverButton onSignatureSave={handleSignatureSave} disabled={!agreed} />
          </>
        ) : (
          <div className="signature-display">
            <img src={updatedMember.signature} alt="Saved Signature" className="signature-img" />
            <p>{updatedMember.firstName} {updatedMember.lastName} signed on {updatedMember.waiverDate}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WaiverForm;
