import { takeLatest, select, put } from "redux-saga/effects";
import { cartAction } from '../../ducks/cart/cartDuck'
import { RootState } from "../../store/store";

export function* initCart() {
    try {
        const cartItems = JSON.parse(localStorage.getItem("cart") || "[]").cartItems;
        yield put(cartAction.initCartSuccess(cartItems))
    } catch (error) {
        console.log('err initCart', error)
    }
}


export function* addItemToCart(action: any) : Generator<any, any, any> {

    try {

        const item = action.payload;

        console.log('payload', action);

        const cart = yield select((state: RootState) => state.cart);

        const isItemExist = cart?.cartItems?.find(
            (i: any) => i.product === item.product
        );

        let newCartItems;

        if (isItemExist) {
            newCartItems = cart?.cartItems?.map((i: any) => {
                if (i.product === isItemExist.product) {
                    return item;
                } else {
                    return i;
                }
            });
        } else {
            newCartItems = [...(cart?.cartItems ?? []), item];
        }

        localStorage.setItem("cart", JSON.stringify({ cartItems: newCartItems }));
        yield put(cartAction.addItemToCartSuccess(newCartItems))

    } catch (error) {
        console.log('err saveCartDataToLocalStorage', error)
    }
}


function* deleteItemFromCart({ payload }: any): Generator<any, any, any> {
    try {
        const cart = yield select((state: RootState) => state.cart);

        let id = payload;
        const newCartItems = cart?.cartItems?.filter((i: any) => i.product !== id);

        localStorage.setItem("cart", JSON.stringify({ cartItems: newCartItems }));
        yield put(cartAction.deleteItemFromCartSuccess(newCartItems))
    } catch (error) {
        console.log('error deleteItemFromCart', error);
    }
}

export default function* cartSaga() {
    yield takeLatest(cartAction.initCart, initCart)
    yield takeLatest(cartAction.addItemToCart, addItemToCart)
    yield takeLatest(cartAction.deleteItemFromCart, deleteItemFromCart)
}