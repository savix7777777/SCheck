export default (state= [],action) => {
    switch (action.type){
        case 'CHANGE_DOC_DATA':
            const newHistory = state.slice();
            if(newHistory.length !==0){
                if(newHistory[newHistory.length-1].percent !== action.payload.percent){
                    newHistory.push(action.payload);
                    return newHistory;
                }
                return state;
            } else {
                newHistory.push(action.payload);
                return newHistory;
            }

        default:
            return JSON.parse(localStorage.getItem('history'))
    }
};
