export default (state= 'about',action) => {
    switch (action.type){
        case 'CHANGE_LOCATION':
            return action.payload;
        default:
            return state;
    }
};
