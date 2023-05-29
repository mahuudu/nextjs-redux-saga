import {all} from 'redux-saga/effects'
import countSaga from '../sagas/count/countSaga';
import cartSaga from '../sagas/cart/cartSaga';
import userSaga from '../sagas/user/userSaga';


export default function* rootSaga(){
    yield all([countSaga()]);
}