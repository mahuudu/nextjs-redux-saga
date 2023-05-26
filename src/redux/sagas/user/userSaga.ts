import { authAPI } from '@root/src/api';
import { userAction } from '../../ducks/user/userDuck';
import { takeLatest, call, put } from 'redux-saga/effects';
import { setCookie, getCookie, deleteCookie } from 'cookies-next';
import Router from 'next/router';
import { AxiosError } from 'axios';


export function* login({ payload }: any): Generator<any, any, any> {
    try {
        const response = yield call(authAPI.login, payload);

        const { user, tokens } = response;
        const token = tokens?.access?.token;
        const expires = tokens?.access?.expires;
        const maxAge = (new Date(expires).getTime() - Date.now()) / 1000;

        setCookie('jwt_token', token,
            { maxAge }
        );
        setCookie('user', user,
            { maxAge }
        );
        yield put(userAction.loginSuccess({ user, tokens }))
        yield Router.push('/');


    } catch (error) {
        const axiosError = error as AxiosError;
        let rs = axiosError.response?.data

        // Rest of your error handling logic
        yield put(userAction.loginFailure(rs))
        console.log('err login', error)
    }
}

export function* initgetUserInfo() {
    try {
        const token = getCookie('jwt_token', {});
        const user = getCookie('user', {});
        yield put(userAction.getUserInfoSuccess({ user, token }))
    } catch (error) {
        yield put(userAction.getUserFailure(error))
        console.log('err initgetUserInfo', error)
    }
}

export function* logout() {

    try {
        deleteCookie('jwt_token');
        deleteCookie('user');
    } catch (error) {
        console.log('err logout', error)
    }
}

export function* register({ payload }: any): Generator<any, any, any> {
    try {

        const response = yield call(authAPI.register, payload);

        const { user, tokens } = response;
        const token = tokens?.access?.token;
        const expires = tokens?.access?.expires;
        const maxAge = (new Date(expires).getTime() - Date.now()) / 1000;

        setCookie('jwt_token', token,
            { maxAge }
        );
        setCookie('user', user,
            { maxAge }
        );

        yield put(userAction.registerSuccess({ user, tokens }))
        yield Router.push('/');

    } catch (error) {
        const axiosError = error as AxiosError;
        let rs = axiosError.response?.data
        yield put(userAction.registerFailure(rs)); // set failure state
        console.log('err register', error)
    }
}


export default function* userSaga() {
    yield takeLatest(userAction.loginStart, login)
    yield takeLatest(userAction.getUserInfo, initgetUserInfo)
    yield takeLatest(userAction.logout, logout)
    yield takeLatest(userAction.registerStart, register)
}
