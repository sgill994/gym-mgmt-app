import React, { useState, useEffect } from 'react';
import './assets/styles/App.css';
import Tabs from './components/Tabs';
import MembersPage from './pages/MembersPage';
import ClassesPage from './pages/ClassesPage';
import ManagePage from './pages/ManagePage';
import LeadsPage from './pages/LeadsPage';
import SchedulePage from './pages/SchedulePage';
import images from './assets/images';
import 'react-signature-canvas';


const App = () => {
  const [members, setMembers] = useState([]);
  const [activeTab, setActiveTab] = useState('members');
  const [leads, setLeads] = useState([]);
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    console.log('Members updated:', members);
  }, [members]);

  const addLead = (newLeads) => {
    if (Array.isArray(newLeads)) {
      setLeads(prevLeads => [...prevLeads, ...newLeads]);
    } else {
      setLeads(prevLeads => [...prevLeads, newLeads]);
    }
  };

  const setLeadStatus = (leadID, newFollowUpStatus) => {
    setLeads(prevLeads =>
      prevLeads.map(lead =>
        lead.leadID === leadID ? {
          ...lead,
          followUpStatus: newFollowUpStatus,
          archived: newFollowUpStatus === 'Archived' ? true : (lead.followUpStatus === 'Archived' ? false : lead.archived),
          declined: newFollowUpStatus === 'Declined' ? true : (lead.followUpStatus === 'Declined' ? false : lead.declined)
        } : lead
      )
    );
  };

  const deleteLead = (leadID) => {
    setLeads(prevLeads =>
      prevLeads.filter(lead => lead.leadID !== leadID)
    );
  };

  const updateLead = (updatedLead, originalLead) => {
    setLeads(prevLeads =>
      prevLeads.map(lead =>
        lead.leadID === originalLead.leadID ? updatedLead : lead
      )
    );
  };

  const updateLeadList = (updatedLeads) => {
    setLeads(updatedLeads);
  };

  const updateLeadHistory = (lead, leads) => {
    const updatedLeadHistory = lead.leadHistory.map(historyLead => {
      const matchingLead = leads.find(l => l.leadID === historyLead.leadID);
      return matchingLead ? matchingLead : historyLead;
    });
    return { ...lead, leadHistory: updatedLeadHistory };
  }

  const addMember = (member) => {
    setMembers(prevMembers => [...prevMembers, member]);
  };

  const updateMember = (updatedMember, originalMember) => {
    setMembers(prevMembers => {
      if (!Array.isArray(prevMembers)) {
        console.error('prevMembers is not an array');
        return prevMembers;
      }

      // Update the primary member
      const newMembers = prevMembers.map(member =>
        member.memberID === originalMember.memberID ? updatedMember : member
      );

      // Update related members
      updatedMember.relationships?.forEach(rel => {
        const relatedMember = newMembers.find(m => m.memberID === rel.memberID);
        if (relatedMember) {
          const reciprocalRelationshipType = rel.type === 'Parent' ? 'Child' :
                                              rel.type === 'Child' ? 'Parent' :
                                              rel.type === 'Sibling' ? 'Sibling' :
                                              'Relative';

          // Add or update the reciprocal relationship
          const updatedRelatedMember = {
            ...relatedMember,
            relationships: [
              ...(relatedMember.relationships || []).filter(r => r.memberID !== updatedMember.memberID),
              { memberID: updatedMember.memberID, type: reciprocalRelationshipType }
            ]
          };

          // Replace the updated related member in the list
          newMembers[newMembers.indexOf(relatedMember)] = updatedRelatedMember;
        }
      });

      return newMembers;
    });
  };

  const deleteMember = (memberID) => {
    setMembers(prevMembers =>
      prevMembers.filter(member => member.memberID !== memberID)
    );
  };

  const setMemberArchived = (memberID, archivedStatus) => {
    setMembers(prevMembers =>
      prevMembers.map(member =>
        member.memberID === memberID ? { ...member, archived: archivedStatus } : member
      )
    );
  };

  const addClass = (course) => {
    setClasses([...classes, course]);
  };

  const updateClass = (updatedClass, originalClass) => {
    setClasses(prevClasses =>
      prevClasses.map(course =>
        course.courseID === originalClass.courseID ? updatedClass : course
      )
    );
  };

  const deleteClass = (courseID) => {
    setClasses(prevClasses =>
      prevClasses.filter(course => course.courseID !== courseID)
    );
  };

  const [employees, setEmployees] = useState([]);
  const addEmployee = (employee) => {
    setEmployees([...employees, employee]);
  };

  const updateEmployee = (updatedEmployee, originalEmployee) => {
    setEmployees(prevEmployees =>
      prevEmployees.map(employee =>
        employee.employeeID === originalEmployee.employeeID ? updatedEmployee : employee
      )
    );
  };

  return (
    <div>
      <header style={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
        <img src={images.logo} alt="Mendoza Gym Logo" style={{ height: '50px', marginRight: '10px' }} />
        <h1>Mendoza Gym Management</h1>
      </header>

      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
<<<<<<< HEAD
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
=======
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
>>>>>>> members-detail-page
    </div>
  );
};

export default App;
