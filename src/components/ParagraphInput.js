import React, {useEffect} from 'react';
import ReactQuill, {Quill} from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 
import '../assets/styles/Toolbar.css';

var Font = Quill.import('formats/font');
Font.whitelist = ["Arial", "Arial-Black", "DM-Serif-Text", "Ubuntu", "Raleway", "Roboto", "Georgia", "Impact", "Monospace", "Trebuchet-MS", "Helvetica"];
Quill.register(Font, true);

const ParagraphInput = ({ description, setDescription }) => {
    const handleChange = (value) => {
        setDescription(value);
    };

    const modules = {
        toolbar: [
            [{ 'font': Font.whitelist}, { 'size': [] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'align': [] }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            [{ 'color': [] }, { 'background': [] }],
            ['image'],
            ['clean']
        ]
    };

    const formats = [
        'font', 'size', 'bold', 'italic', 'underline', 'strike', 'align', 
        'list', 'bullet', 'indent', 'color', 'background', 'image'
    ];

    return (
        <div>
            <ReactQuill
                theme="snow"
                value={description}
                onChange={handleChange}
                modules={modules}
                formats={formats}
                style={{ height: '150px' }}
            />
            <br/><br/><br/>
        </div>
    );
};

export default ParagraphInput;
