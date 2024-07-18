import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useSubmitFormMutation } from '../state/ordersApi'
import { setFullName, setSize, setTopping, setSubmitStatus } from 
'../state/formSlice';

export default function PizzaForm() {
  const dispatch = useDispatch();
  const [submitForm, { isLoading }] = useSubmitFormMutation();
  const { fullName, size, toppings, submitStatus } = useSelector(state => 
    state.PizzaForm);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const formObject = Object.fromEntries(formData.entries());

    if (formObject.toppings) {
      formObject.toppings = Object.keys(formObject.toppings).filter(key =>
        formObject.toppings[key] === 'true'
      );
    } else {
      formObject.toppings = [];
    }


    console.log('formObject: ', formObject)

    if (!formObject.fullName || formObject.fullName.length < 3 ||
      formObject.fullName.length > 20
    ) {
      dispatch(setSubmitStatus('failed'));
      return;
    }

    if (!formObject.size || !['S', 'M', 'L'].includes(formObject.size)) {
      dispatch(setSubmitStatus('failed'));
      console.error('size is required.');
      return;
    }


    console.log(fullName, size, toppings)

    const payload = {
      fullName: formObject.fullName,
      size: formObject.size,
      toppings: formObject.toppings,
    };


    console.log('payload: ', payload)

    const result = await submitForm(JSON.stringify(payload));

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
