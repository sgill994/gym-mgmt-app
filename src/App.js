import React, { useState, useEffect } from 'react';
import './assets/styles/App.css'
import Tabs from './components/Tabs';
import MembersPage from './pages/MembersPage';
import ClassesPage from './pages/ClassesPage';
import ManagePage from './pages/ManagePage';
import LeadsPage from './pages/LeadsPage';
import SchedulePage from './pages/SchedulePage';
import images from './assets/images';

const App = () => {
  const [members, setMembers] = useState([]);
  const [activeTab, setActiveTab] = useState('members');
  const [leads, setLeads] = useState([]);
  const [classes, setClasses] = useState([]);

  // Allows a single (new lead form) or multiple new leads (from archived Members) 
  // to be added to leads array 
  const addLead = (newLeads) => {
    if (Array.isArray(newLeads)) {
      setLeads(prevLeads => [...prevLeads, ...newLeads]);
    } else {
      setLeads(prevLeads => [...prevLeads, newLeads]);
    }
  };

  // Updates 'follow up' status on edit & save in Leads table dropdown menu
  const setLeadStatus = (leadID, newFollowUpStatus) => {
    setLeads((prevLeads) =>
      prevLeads.map((lead) =>
        lead.leadID === leadID ? {
          ...lead, 
          followUpStatus: newFollowUpStatus,
          archived: newFollowUpStatus === 'Archived' ? true : (lead.followUpStatus === 'Archived' ? false : lead.archived),
          declined: newFollowUpStatus === 'Declined' ? true : (lead.followUpStatus === 'Declined' ? false : lead.declined)
        } : lead
      )
    );
  };

  // Deletes lead on delete in delete confirmation pop-up window
  const deleteLead = (leadID) => {
    setLeads((prevLeads) =>
      prevLeads.filter((lead) => lead.leadID !== leadID)
    );
  };

  const updateLead = (updatedLead, originalLead) => {
    setLeads((prevLeads) =>
      prevLeads.map((lead) =>
        lead.leadID === originalLead.leadID ? updatedLead : lead
      )
    );
  };

  const updateLeadList = (updatedLeads) => {
    setLeads(updatedLeads);
  }

  const updateLeadHistory = (lead, leads) => {
    const updatedLeadHistory = lead.leadHistory.map(historyLead => {
      const matchingLead = leads.find(l => l.leadID === historyLead.leadID);
      return matchingLead ? matchingLead : historyLead;
    });
    return { ...lead, leadHistory: updatedLeadHistory };
  }

  const addMember = (member) => {
    setMembers((prevMembers) => [...prevMembers, member]);
  };

  // Replaces existing member with updated member in array on edit & save in MemberDetails window
  const updateMember = (updatedMember, originalMember) => {
    setMembers((prevMembers) =>
      prevMembers.map((member) => 
        member.memberID === originalMember.memberID ? updatedMember : member
      )
    );
  };

  // Deletes member on delete in MemberList delete confirmation pop-up window
  const deleteMember = (memberID) => {
    setMembers((prevMembers) =>
      prevMembers.filter((member) => member.memberID !== memberID)
    );
  };

  const setMemberArchived = (memberID, archivedStatus) => {
    setMembers((prevMembers) =>
      prevMembers.map((member) =>
        member.memberID === memberID ? {...member, archived: archivedStatus} : member
      )
    );
  };

  const addClass = (course) => {
    setClasses([...classes, course]);
  };

  // Replaces existing class with updated class in array on edit & save in ClassDetails window
  const updateClass = (updatedClass, originalClass) => {
    setClasses((prevClasses) => 
      prevClasses.map((course) => 
        course.courseID === originalClass.courseID ? updatedClass : course
      )
    );
  };

  // Deletes class on delete in ClassList delete confirmation pop-up window
  const deleteClass = (courseID) => {
    setClasses((prevClasses) =>
      prevClasses.filter((course) => course.courseID !== courseID)
    );
  }

  // TO DO: have not started on Staff Tab in Manage Page 
  const [employees, setEmployees] = useState([]);
  const addEmployee = (employee) => {
    setEmployees([...employees, employee]);
  };

  const updateEmployee = (updatedEmployee, originalEmployee) => {
    setEmployees((prevEmployees) =>
      prevEmployees.map((employee) =>
        employee.employeeID === originalEmployee.employeeID ? updatedEmployee : employee
      )
    );
  };

  
  useEffect(() => {
    console.log('Current members:', members);
  }, [members]);


  return (
    <div>
      <header style={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
        <img src={images.logo} alt="Mendoza Gym Logo"  style={{height:'50px', marginRight:'10px'}} />
        <h1>Mendoza Gym Management</h1>
      </header>

      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === 'members' && 
      <MembersPage
        members={members} 
        addMember={addMember} updateMember={updateMember} 
        deleteMember={deleteMember} 
        setMemberArchived={setMemberArchived} 
      />}

      {activeTab === 'classes' && 
      <ClassesPage 
        classes={classes} 
        addClass={addClass} 
        updateClass={updateClass}
        deleteClass={deleteClass} 
      />}

      {activeTab === 'manage' && 
      <ManagePage 
        employees={employees} 
        addEmployee={addEmployee} 
        updateEmployee={updateEmployee} 
      />}

      {activeTab === 'leads' && 
      <LeadsPage 
        members={members} 
        leads={leads} 
        addLead={addLead} 
        deleteLead={deleteLead}
        setLeadStatus={setLeadStatus}
        updateLead={updateLead} 
        updateLeadList={updateLeadList}
        updateLeadHistory={updateLeadHistory}
      />}
      {activeTab === 'schedule' &&
      <SchedulePage 
        classes={classes}
      />}
    </div>
  );
};

export default App;
