import React from 'react';

const ProfileOverview = (member) => {
    console.log(member.firstName);
    return(
            <p>{member.firstName}</p>
    );
};

export default ProfileOverview;
