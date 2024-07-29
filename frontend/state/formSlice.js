import { createSlice } from "@reduxjs/toolkit"

export const initialFormState = {
    fullName: '',
    size: '',
    toppings: {
    '1': false,
    '2': false,
    '3': false,
    '4': false,
    '5': false,
    },
    submitStatus: 'idle',
};

const pizzaFormSLice = createSlice({
    name: 'pizzaForm',
    initialState: initialFormState,
    reducers: {
        setFullName(state, action) {
            state.fullName = action.payload;
        },
        setSize(state, action) {
            console.log('set size action payload: ', action.payload)
            state.size = action.payload;
        },
        setTopping(state, action) {
            const { toppingName, value } = action.payload
            state.toppings[toppingName] = value;
        },
        setSubmitStatus(state, action) {
            state.submitStatus = action.payload;
        },
        resetForm(state) {
            return initialFormState
        },
        
    }
});

export const { setFullName, setSize, setTopping, setSubmitStatus, resetForm } 
= pizzaFormSLice.actions;

export default pizzaFormSLice.reducer;
