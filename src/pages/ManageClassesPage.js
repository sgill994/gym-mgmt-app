import React from 'react';
import ClassList from '../components/ClassList';
import NewClassForm from '../components/NewClassForm';
import { Modal, Button } from 'react-bootstrap'

const ManageClassesPage = ({ classes, addClass }) => {
    const [showModal, setShowModal] = useState(false);

    const handleOpen = () => setShowModal(true);
    const handleClose = () => setShowModal(false);
    
    return (
        <div id="manage-classes" className="tab active">
            <h1>Manage Classes</h1>
            
            <ClassList classes={classes} />
        </div>
    );
}

export default ManageClassesPage;