import React, {useState} from "react";
import '../../scss/components/switcher.scss';


const Switcher = ({value, getValue, id}) => {

    const [valueCH,setValue] = useState(value !== undefined);

    const changeValue = () => {
        setValue(!valueCH)
        getValue(valueCH);
    };

    return(
        <div className="rss">
            <input checked={value} onChange={changeValue} type="checkbox" id={`buttonThree-${id}`}/>
            <label htmlFor={`buttonThree-${id}`}>
                <i></i>
            </label>
        </div>
    );
};


export default Switcher;