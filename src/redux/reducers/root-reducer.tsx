// add content
import { combineReducers } from 'redux';
// import { userReducer } from './user-reducer';
import authReducer from './auth-reducer';
import searchReducer from './search-reducer';

interface IAppState {
    auth: any;
    search: any;
}

const rootReducer = combineReducers<IAppState>({
    auth: authReducer,
    search: searchReducer
});

export default rootReducer;