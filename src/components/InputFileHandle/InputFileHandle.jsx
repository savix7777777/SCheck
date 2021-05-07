import React, {useState} from "react";
import Button from "../Button";


const InputFileHandle = ({filesList, setFilesList}) => {

    const [name,setName] = useState('');
    const [text, setText] = useState('');

    function byteCount(s) {
        return encodeURI(s).split(/%..|./).length - 1;
    }

    const sendFile = () => {
        const newFiles = filesList.slice();
        const fileInfo = {
            name: name,
            size: byteCount(text),
            value: text
        };
        newFiles.push(fileInfo);
        setFilesList(newFiles);
        setName('');
        setText('');
    }

    return(
        <div className='input-file'>
            <div className='input-file__first-line'>
                <input value={name} onChange={({target}) => {setName(target.value)}} maxLength='20' placeholder='Title (MAX SYMBOLS 20)' className='input-file__first-line__input' type="text"/>
                {name && text && filesList.length <= 1&& <Button onClick={sendFile} className='about__first-box__button'>Завантажити</Button>}
                {(!name || !text || filesList.length > 1) && <div className='input-file__button input-file__disabled'>Завантажити</div>}
            </div>
            <textarea value={text} onChange={({target}) => {setText(target.value)}} maxLength='70000' className='input-file__input-text' placeholder='Enter your text...' />
        </div>
    );
};


export default InputFileHandle;