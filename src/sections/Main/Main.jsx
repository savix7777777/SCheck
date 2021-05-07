import React, {useState} from "react";
import InputFile from "../../components/InputFile";
import file from '../../scss/img/file.png';
import Button from "../../components/Button";
import InputFileHandle from "../../components/InputFileHandle";
import {useHistory} from "react-router";


const Main = ({setFilesStore}) => {

    const history = useHistory();

    const [inputType, setInputType] = useState('download');

    const [filesList, setFilesList] = useState([]);

    const deleteFile = ({target}) => {
        const index = target.parentNode.classList[1];
        const newFilesList = filesList.slice();
        if(index === 'elem-0') newFilesList.splice(0,1);
        if(index === 'elem-1') newFilesList.splice(1,1);
        setFilesList(newFilesList);
    };

    const continueWork = () => {
        setFilesStore(filesList);
        history.push('/settings');
    };

    return(
        <section className='main'>
            <div className='main__input-type-box'>
                <p onClick={() => setInputType('download')} style={{borderBottom: inputType === 'download' && '1px solid #FE66B8'}}>Завантажити документи</p>
                <p onClick={() => setInputType('handle')} style={{borderBottom: inputType === 'handle' && '1px solid #FE66B8'}}>Ввести тексти власноруч</p>
            </div>
            {inputType === 'download' && <InputFile filesList={filesList} setFilesList={setFilesList} />}
            {inputType === 'handle' && <InputFileHandle filesList={filesList} setFilesList={setFilesList} />}
            {filesList.length !==0 && <h2 className='main__download-text'>Завантажені тексти</h2>}
            {filesList.length !==0 && <div className='main__download'>
                {filesList.map((elem, index) => {
                    return(
                        <div key={index} className='main__download__item'>
                            <img alt='file' src={file}/>
                            <p>{elem.name}</p>
                            <Button onClick={deleteFile} className={`main__download__item-delete elem-${index}`}><i className="fas fa-times"> </i></Button>
                        </div>
                    )
                })}
            </div>}
            {filesList.length > 1 && <Button onClick={continueWork} className='about__first-box__button main__confirm-button'>Продовжити</Button>}
            {filesList.length <= 1 && <div className='input-file__button main__confirm-button input-file__disabled'>Продовжити</div>}
        </section>
    );
};


export default Main;