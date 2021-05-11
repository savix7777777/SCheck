import React from "react";


const DocumentResult = ({keyWords, settings, first, name, size, value}) => {

    const wordsArr = value.split(' ');
    const signArr = value.split('');

    return(
        <div className='document-result' style={{borderRight: first && '1px solid #8EC5FC'}}>
            <p className='document-result__number-text'>Документ #{first ? '1' : '2'}</p>
            <p className='document-result__line-text'>Назва:<span className='document-result__value-text'>{name}</span></p>
            {settings.showWordsCounter && <p className='document-result__line-text'>Кількість слів:<span className='document-result__value-text'>{wordsArr.length}</span></p>}
            {settings.showSignCounter && <p className='document-result__line-text'>Кількість символів:<span className='document-result__value-text'>{signArr.length}</span></p>}
            <p className='document-result__line-text'>Розмір файлу:<span className='document-result__value-text'>{size} B</span></p>
            {settings.showKeyWords && keyWords[0].length !== 0 && <div className='document-result__keyWords-line'>
                <p className='document-result__line-text'>Ключові слова:</p>
                <div className='document-result__keyWords-line__box'>
                    {keyWords.map((item,index) => {
                        return(
                            <span key={index}>{item}{keyWords.length === index + 1 ? '.' : ', '} </span>
                        )
                    })}
                </div>
            </div>}
        </div>
    );
};


export default DocumentResult;