import React, {useEffect} from 'react';
import { Button } from 'react-bootstrap';
import ClassList from '../components/ClassList';
const { ipcRenderer } = window.require('electron'); 

const ClassesPage = ({classes, addClass, updateClass, deleteClass}) => {
  const handleOpen = () => {
    ipcRenderer.send('open-new-class-window'); // Send message to main process to open a new window
  };

  useEffect(() => {
    const handleAddClass = (event, classData) => {
      addClass(classData);
    };
    // Listen for the "add-class" event from the new window
    ipcRenderer.on('add-class', handleAddClass);
    // Cleanup the event listener when the component is unmounted
    return () => {
      ipcRenderer.removeListener('add-class', handleAddClass);
    };
  }, [addClass]);

  return (
    <div id="manage-classes" className="tab active">
      <h1>Manage Classes</h1><br/>
      <Button variant="primary" onClick={handleOpen}>Add New Class</Button>
      <h2>Active Classes</h2>
      <ClassList 
        classes={classes} 
        updateClass={updateClass}
        deleteClass={deleteClass}
      />
    </div>
  );
};

export default ClassesPage;
