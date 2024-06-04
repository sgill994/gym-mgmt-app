import React from 'react';
import ClassList from '../components/ClassList';
import NewClassForm from '../components/NewClassForm'

const ManageClassesPage = ({ classes }) => (
  <div id="manage-classes" className="tab active">
    <h1>Manage Classes</h1>
    <ClassList classes={classes} />
  </div>
);

export default ManageClassesPage;