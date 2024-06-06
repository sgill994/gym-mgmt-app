import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles/App.css'
import Tabs from './components/Tabs';
import MembersPage from './pages/MembersPage';
import ManageClassesPage from './pages/ManageClassesPage'

const App = () => {
  const [members, setMembers] = useState([]);
  const [activeTab, setActiveTab] = useState('members');

  const addMember = (member) => {
    setMembers([...members, member]);
  };

  const [classes, setClasses] = useState([]);
  const addClass = (course) => {
    setClasses([...classes, course]);
  };

  const updateMember = (updatedMember, originalMember) => {
    setMembers((prevMembers) =>
      prevMembers.map((member) => {
        if (member.memberID === originalMember.memberID) {
          Object.keys(updatedMember).forEach((key) => {
            if (updatedMember[key] !== originalMember[key]) {
              member[key] = updatedMember[key];
            }
          });
          return { ...member }; 
        }
        return member;
      })
    );
  };
  
  return (
    <div>
      <h1>Gym Membership Management</h1>
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === 'members' && <MembersPage members={members} addMember={addMember} updateMember={updateMember} />}
      {activeTab === 'classes' && <ManageClassesPage classes={classes} addClass={addClass} />}
      {/* Add other tab conditions here */}
    </div>
  );
};

export default App;
