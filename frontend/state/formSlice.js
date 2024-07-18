import { createSlice } from "@reduxjs/toolkit"

const initialFormState = { // suggested
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
            state.size = action.payload;
        },
        setTopping(state, action) {
            state.toppings = action.payload;
        },
        setSubmitStatus(state, action) {
            state.submitStatus = action.payload;
        },
    }
});

export const { setFullName, setSize, setTopping, setSubmitStatus } 
= pizzaFormSLice.actions;

export default pizzaFormSLice.reducer;
