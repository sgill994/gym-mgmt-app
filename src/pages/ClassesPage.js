import React, {useEffect} from 'react';
import { Button } from 'react-bootstrap';
import ClassList from '../components/ClassList';
const { ipcRenderer } = window.require('electron'); // Import Electron's ipcRenderer

const ClassesPage = ({ classes, addClass, updateClass, deleteClass }) => {
  const handleOpen = () => {
    ipcRenderer.send('open-new-class-window'); // Send message to main process to open a new window
  };

  useEffect(() => {
    // Listen for the "add-class" event from the new window
    ipcRenderer.on('add-class', (event, classData) => {
      addClass(classData); // Call the addClass function with the new class data
    });

    // Cleanup the event listener when the component is unmounted
    return () => {
      ipcRenderer.removeAllListeners('add-class');
    };
  }, [addClass]);

  return (
    <div id="manage-classes" className="tab active">
      <h1>Manage Classes</h1><br />
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
