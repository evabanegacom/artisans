// add content
import { combineReducers } from 'redux';
// import { userReducer } from './user-reducer';
import authReducer from './auth-reducer';

interface IAppState {
    auth: any;
}

const rootReducer = combineReducers<IAppState>({
    auth: authReducer,
});

export default rootReducer;