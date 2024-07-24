import React, { useState } from 'react';

const Collapsible = ({ title, icon, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCollapse = () => setIsOpen(!isOpen);

  return (
    <div>
      <button className="btn btn-toggle d-flex align-items-center" onClick={toggleCollapse}>
        <i className={`bi ${icon} me-2`}></i>
        {title}
        <i className={`bi ${isOpen ? 'bi-chevron-down' : 'bi-chevron-right'} ms-auto`}></i>
      </button>
      {isOpen && (
        <div className="collapse-content" style={{paddingLeft:'10%'}}>
          {children}
        </div>
      )}
    </div>
  );
};

export default Collapsible;
