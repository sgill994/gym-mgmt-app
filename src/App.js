import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles/App.css'
import Tabs from './components/Tabs';
import MembersPage from './pages/MembersPage';
import ClassesPage from './pages/ClassesPage';
import ManagePage from './pages/ManagePage';

const App = () => {
  const [members, setMembers] = useState([]);
  const [activeTab, setActiveTab] = useState('members');

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

  const setArchived = (memberID, archivedStatus) => {
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
  
  return (
    <div>
      <h1>Gym Membership Management</h1>
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === 'members' && <MembersPage members={members} addMember={addMember} updateMember={updateMember} setArchived={setArchived} />}
      {activeTab === 'classes' && <ClassesPage classes={classes} addClass={addClass} updateClass={updateClass} />}
      {activeTab === 'manage' && <ManagePage employees={employees} addEmployee={addEmployee} updateEmployee={updateEmployee} />  }
    </div>
  );
};

export default App;
