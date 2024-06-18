import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles/App.css'
import Tabs from './components/Tabs';
import MembersPage from './pages/MembersPage';
import ClassesPage from './pages/ClassesPage';
import ManagePage from './pages/ManagePage';
import LeadsPage from './pages/LeadsPage';

const App = () => {
  const [members, setMembers] = useState([]);
  const [activeTab, setActiveTab] = useState('members');
  const [leads, setLeads] = useState([]);

  const addLead = (newLeads) => {
    if (Array.isArray(newLeads)) {
      setLeads(prevLeads => [...prevLeads, ...newLeads]);
    } else {
      setLeads(prevLeads => [...prevLeads, newLeads]);
    }
  };

  const setLeadStatus = (leadID, newFollowUpStatus) => {
    setLeads((prevLeads) =>
      prevLeads.map((lead) =>
      lead.leadID === leadID ? {...lead, followUpStatus: newFollowUpStatus} : lead
      )
    );
  };

  const addMember = (member) => {
    setMembers([...members, member]);
  };

  const updateMember = (updatedMember, originalMember) => {
    setMembers((prevMembers) =>
      prevMembers.map((member) => 
        member.memberID === originalMember.memberID ? updatedMember : member
      )
    );
  };

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

  const [classes, setClasses] = useState([]);
  const addClass = (course) => {
    setClasses([...classes, course]);
  };

  const updateClass = (updatedClass, originalClass) => {
    setClasses((prevClasses) => 
      prevClasses.map((course) => 
        course.courseID === originalClass.courseID ? updatedClass : course
      )
    );
  };

  const deleteClass = (courseID) => {
    setClasses((prevClasses) =>
      prevClasses.filter((course) => course.courseID !== courseID)
    );
  }

  // TO DO: have not started on Staff Tab in Manage Page 
  // const [employees, setEmployees] = useState([]);
  // const addEmployee = (employee) => {
  //   setEmployees([...employees, employee]);
  // };

  // const updateEmployee = (updatedEmployee, originalEmployee) => {
  //   setEmployees((prevEmployees) =>
  //     prevEmployees.map((employee) =>
  //       employee.employeeID === originalEmployee.employeeID ? updatedEmployee : employee
  //     )
  //   );
  // };

  return (
    <div>
      <h1>Gym Membership Management</h1>
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
      />  }

      {activeTab === 'leads' && 
      <LeadsPage 
        members={members} 
        leads={leads} 
        addLead={addLead} 
        setLeadStatus={setLeadStatus} 
      /> }
    </div>
  );
};

export default App;
