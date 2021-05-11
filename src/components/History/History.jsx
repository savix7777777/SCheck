import React from "react";
import {useSelector} from "react-redux";


const History = ({historyState}) => {

    const docsArr = useSelector(({getDocData}) => getDocData);

    return (
        <div style={{top: historyState && '80%'}} className='history'>
            <h2 className='history__h2'>{docsArr.length === 0 ? 'На жаль, Ви ще не зробили жодного запиту' : 'Перегляд історії'}</h2>
            {docsArr.map((item, index) => {
                return(
                    <div className='history__data-box' key={index}>
                        <div className='history__first-line'>
                            <p className='history__text'>{item.date}</p><p className='history__percent'>{item.percent.toFixed(2)}%</p>
                        </div>
                        <div className='history__second-line'>
                            <p className='history__text'>Files:</p><p className='history__file-names'>{item.files[0].name}</p><p className='history__file-names'>{item.files[1].name}</p>
                        </div>
                        <div className='history__black-line'> </div>
                    </div>
                )
            })}
        </div>
    );
};


export default History;