import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useSubmitFormMutation } from '../state/ordersApi'
import { setFullName, setSize, setTopping, setSubmitStatus } from 
'../state/formSlice';

export default function PizzaForm() {
  const dispatch = useDispatch();
  const [submitForm, { isLoading }] = useSubmitFormMutation();
  const { fullName, size, toppings, submitStatus } = useSelector(state => 
    state.PizzaForm)

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const result = await submitForm(formData);

    if(result.error) {
      console.error(result.error);
      dispatch(setSubmitStatus('failed'));
    } else {
      console.log('result data: ', result.data)
      dispatch(setSubmitStatus('idle'));
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Pizza Form</h2>
      {submitStatus === 'pending' && <div className='pending'>Order in progress...</div>}
      {submitStatus === 'failed' && <div className='failure'>Order failed: fullName is required</div>}

      <div className="input-group">
        <div>
          <label htmlFor="fullName">Full Name</label><br />
          <input
            data-testid="fullNameInput"
            id="fullName"
            name="fullName"
            placeholder="Type full name"
            type="text"
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
          <input data-testid="checkPepperoni" name="1" type="checkbox" 
          onChange={(e) => dispatch(setTopping({value: e.target.checked}))}/>
          Pepperoni<br /></label>
        <label>
          <input data-testid="checkGreenpeppers" name="2" type="checkbox" 
          onChange={(e) => dispatch(setTopping({value: e.target.checked}))}/>
          Green Peppers<br /></label>
        <label>
          <input data-testid="checkPineapple" name="3" type="checkbox" 
          onChange={(e) => dispatch(setTopping({value: e.target.checked}))}/>
          Pineapple<br /></label>
        <label>
          <input data-testid="checkMushrooms" name="4" type="checkbox" 
          onChange={(e) => dispatch(setTopping({value: e.target.checked}))}/>
          Mushrooms<br /></label>
        <label>
          <input data-testid="checkHam" name="5" type="checkbox" 
          onChange={(e) => dispatch(setTopping({value: e.target.checked}))}/>
          Ham<br /></label>
      </div>
      <input data-testid="submit" type="submit" disabled={isLoading} />
    </form>
  )
}
