import React, {useEffect, useState} from "react";
import Button from "../Button";
import dropImg from '../../scss/img/drop.png';


const InputFile = ({filesList, setFilesList}) => {

    const [files, setFiles] = useState([]);

    useEffect(() => {
        setFiles(filesList);
    });

    const drop = (e) => {
        e.preventDefault();
        e.stopPropagation();
       if(e.dataTransfer.files[0].type === 'text/plain'){
           const newFiles = files.slice();
           const file = e.dataTransfer.files[0];
           let reader = new FileReader();
           reader.readAsText(file);
           reader.onload = () => {
               const fileInfo = {
                   name: file.name,
                   size: file.size,
                   value: reader.result,
               }
               newFiles.push(fileInfo);
               setFiles(newFiles);
               setFilesList(newFiles);
           };
       }

    };

    const readFile = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const newFiles = files.slice();
        const file = e.target.files[0];
        let reader = new FileReader();
        reader.readAsText(file);
        reader.onload = () => {
            const fileInfo = {
                name: file.name,
                size: file.size,
                value: reader.result,
            }
            newFiles.push(fileInfo);
            setFiles(newFiles);
            setFilesList(newFiles);
        };
    };

    let inputEvent = new Event("click");

    return(
        <div onDrop={files.length <= 1 ? drop : () => {}} className='drop-area' onDragEnter={(e) => e.preventDefault()} onDragOver={(e) => e.preventDefault()}>
            <div className='drop-area__text-box'>
                <img src={dropImg} alt='drop' />
                <h1>Перетягуйте & Відпускайте <br /> або</h1>
            </div>
            <input onChange={files.length <= 1 ? readFile : () => {}} type="file" accept="text/plain" />
            <Button onClick={({target}) => target.parentNode.childNodes[1].dispatchEvent(inputEvent)} className={`about__first-box__button drop-area__button ${files.length === 2 && 'disabled'}`}>Відкрити “Провідник”</Button>
        </div>
    );
};


export default InputFile;