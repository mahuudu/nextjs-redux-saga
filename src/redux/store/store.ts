import { configureStore, combineReducers } from "@reduxjs/toolkit";
import createSagaMiddleware from 'redux-saga'
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import userReducer from '../ducks/user/userDuck'
import cartReducer from "../ducks/cart/cartDuck";


import rootSaga from "./rootSaga";

const sagaMiddleware = createSagaMiddleware()

const rootReducer = combineReducers({
    user: userReducer,
    cart: cartReducer,
})

const makeStore = () => {
    const store = configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: {
                    // Ignore HYDRATE action from next-redux-wrapper
                    ignoredActions: [HYDRATE],
                },
            }).concat(sagaMiddleware),
    });

    // Create a custom store type definition
    const customStore = {
        ...store,
        sagaTask: sagaMiddleware.run(rootSaga),
    };

    return customStore;

};


// export const store = configureStore({
//     reducer: persistedReducer,
//     middleware: [sagaMiddleware]
// })

// sagaMiddleware.run(rootSaga)

// export const persistor = persistStore(wrapper);

export const wrapper = createWrapper(makeStore);
export default makeStore;


export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ReturnType<typeof makeStore>['dispatch'];
