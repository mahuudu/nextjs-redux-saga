import {createSlice} from '@reduxjs/toolkit'

const initialState : any = {
    count : 1
}

const countSlice = createSlice({
    name : 'countInfo',
    initialState: initialState,
    reducers:
    {
        setCount: (state, {payload}) => {},
        setCountSuccess : (state, {payload}) => {
            state.count = payload
        }
    }
})

export const countAction = countSlice.actions;

//selector
export const selectcount = (state: any) => state.count;

//reducer
const countReducer = countSlice.reducer;

export default countReducer;