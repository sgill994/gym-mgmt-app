import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Tabs from './components/Tabs';
import NewMembersPage from './pages/NewMembersPage';
import ExistingMembersPage from './pages/ExistingMembersPage';
// Import other pages here

const App = () => {
  const [members, setMembers] = useState([]);
  const [activeTab, setActiveTab] = useState('new');

  const addMember = (member) => {
    setMembers([...members, member]);
  };

  return (
    <div>
      <h1>Gym Membership Management</h1>
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === 'new' && <NewMembersPage addMember={addMember} />}
      {activeTab === 'existing' && <ExistingMembersPage members={members} />}
      {/* Add other tab conditions here */}
    </div>
  );
};

export default App;
