import './new-class-form.css';
import React from 'react';

export interface NewClassFormProps {
    className?: string;
}

export const NewClassForm: React.FC<NewClassFormProps> = ({ className = '' }) => (
    <div className="newclass"><h1>Create New Class<br /></h1>Class Name: <input />
<br />
<input type="checkbox" />Show class on public schedule<br />Class Length: <select><option>60 min</option><option>1 hr 15 min</option><option>1 hr 30 min</option>
<option>1 hr 45 min</option>
<option>2 hr</option>
</select>
<br />Instructor: <select><option>Michael</option><option>Alvin</option><option>Naseem</option>
<option>Terrence</option>
<option>Coach</option>
<option>???</option>
</select>
<br />Class Description: <br /><textarea />
<br />
<br />
<br />
<input type="checkbox" />Limit number of reversations
<br />
<input type="checkbox" />Send customers email reminder
<br />Class Limit: 

<input />
<button>Save</button>
<br />
<br />
<br />
<button>Create Class</button>
</div>
);