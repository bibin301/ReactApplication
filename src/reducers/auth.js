import {LOGIN, LOGOUT} from './actionTypes.js';

const loggedIn = (state=false, action)=>{
  switch(action.type){
    case LOGIN: return true;
    case LOGOUT: return false;
    default: return state;
  }
};

export default loggedIn;
