import { countAction } from '../../ducks/count/countDuck';
import { takeLatest, call, put } from 'redux-saga/effects';

export function* setCount({ payload }: any) {
    try {
        console.log(payload);
        
        yield put(countAction.setCountSuccess(payload))
    } catch (error) {
        console.log('err', error)
    }
}


export default function* countSaga() {
    yield takeLatest(countAction.setCount, setCount)
}
