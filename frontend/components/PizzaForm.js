import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useSubmitFormMutation } from '../state/ordersApi'
import { setFullName, setSize, setTopping, setSubmitStatus } from 
'../state/formSlice';
import { setErrorMessage } from '../state/ordersSlice';

export default function PizzaForm() {
  const dispatch = useDispatch();
  const [submitForm, { isLoading }] = useSubmitFormMutation();
  const { fullName, size, toppings} = useSelector(state => 
    state.PizzaForm);
  const errorMessage = useSelector(state => state.orders.errorMessage)  
    
    const handleSubmit = async (event) => {
      event.preventDefault();
      
      console.log('event on submit: ', event)

      const formData = {
        fullName,
        size,toppings: Object.keys(toppings).filter(key  => toppings[key] === true)
      };

      console.log('formdata: ', formData);
      
      if (!formData.fullName) {
        dispatch(setErrorMessage('Order failed: fullName is required'));
        return;
      }

      if (!formData.size) {
        dispatch(setErrorMessage("Order failed: size must be one of the following values: S, M, L"));
        return;
      }
      
      if (!formData.fullName || formData.fullName.length < 3 ||
        formData.fullName.length > 20
      ) {
        dispatch(setSubmitStatus('failed'));
        return;
      }
      
      if (!formData.size || !['S', 'M', 'L'].includes(formData.size)) {
        dispatch(setSubmitStatus('failed'));
        console.error('size is required.');
        return;
      }
      
      console.log(fullName, size, toppings)
      
      const payload = {
        fullName: formData.fullName,
        size: formData.size,
        toppings: formData.toppings,
      };
      
      console.log('payload: ', payload)
      
      // const result = await submitForm(payload);
      
      // if(result.error) {
      //   console.error(result.error);
      //   dispatch(setSubmitStatus('failed'));
      // } else {
      //   console.log('result data: ', result.data)
      //   dispatch(setSubmitStatus('idle'));
      // }
      

      try {
        await submitForm(formData).unwrap();
      } catch (error) {
        console.error('Failed to submit order: ', error)
      }
    }
    
    return (
      <form onSubmit={handleSubmit}>
      <h2>Pizza Form</h2>
      {isLoading && <div className='pending'>Order in progress...</div>}
      {errorMessage && <div data-testid='validationMessage' className='failure'>{errorMessage}</div>}
      <div className="input-group">
        <div>
          <label htmlFor="fullName">Full Name</label><br />
          <input
            data-testid="fullNameInput"
            id="fullName"
            name="fullName"
            placeholder="Type full name"
            type="text"
            value={fullName}
            onChange={(e) => dispatch(setFullName(e.target.value))}
          />
        </div>
      </div>

      <div className="input-group">
        <div>
          <label htmlFor="size">Size</label><br />
          <select data-testid="sizeSelect" id="size" name="size" value={size} 
          onChange={(e) => dispatch(setSize(e.target.value))}>
            <option value="">----Choose size----</option>
            <option value="S">Small</option>
            <option value="M">Medium</option>
            <option value="L">Large</option>
          </select>
        </div>
      </div>

      <div className="input-group">
        <label>
          <input data-testid="checkPepperoni" name="1" type="checkbox" checked={toppings['1']} 
          onChange={(e) => dispatch(setTopping({toppingName: '1', value: e.target.checked}))}/>
          Pepperoni<br /></label>
        <label>
          <input data-testid="checkGreenpeppers" name="2" type="checkbox" checked={toppings['2']}
          onChange={(e) => dispatch(setTopping({toppingName: '2', value: e.target.checked}))}/>
          Green Peppers<br /></label>
        <label>
          <input data-testid="checkPineapple" name="3" type="checkbox" checked={toppings['3']}
          onChange={(e) => dispatch(setTopping({toppingName: '3', value: e.target.checked}))}/>
          Pineapple<br /></label>
        <label>
          <input data-testid="checkMushrooms" name="4" type="checkbox" checked={toppings['4']}
          onChange={(e) => dispatch(setTopping({toppingName: '4', value: e.target.checked}))}/>
          Mushrooms<br /></label>
        <label>
          <input data-testid="checkHam" name="5" type="checkbox" checked={toppings['5']}
          onChange={(e) => dispatch(setTopping({toppingName: '5', value: e.target.checked}))}/>
          Ham<br /></label>
      </div>
      <input data-testid="submit" type="submit" disabled={isLoading} />
    </form>
  )
}
