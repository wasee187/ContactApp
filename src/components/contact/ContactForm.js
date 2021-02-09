import React, { useContext, useState, useEffect } from 'react';
import validator from 'validator';
import { ContactContext } from '../../contexts/Contact.context';
import { async } from 'q';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import TextInputGroup from '../layout/TextInputGroup';
import RadioInputGroup from '../layout/RadioInputGroup';

const ContactForm = (props) => {
  const context = useContext(ContactContext);
  const [contact, setContact] = useState({
    firstName: '',
    lastName: '',
    email: '',
    profession: '',
    selectedValue: 'personal',
  });
  const [errors, setErrors] = useState('');
  const { selectedContact } = context.state;
  const { dispatch } = context;

  useEffect(() => {
    if (selectedContact) {
      setContact(selectedContact);
    }
  }, [selectedContact]);

  const handleChange = (e) => {
    setContact({
      ...contact,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      contact.firstName === '' ||
      !validator.isLength(contact.firstName, { min: 3, max: 8 })
    ) {
      setErrors({
        ...errors,
        firstName: 'FirstName should be within 3 to 6 character',
      });
      return;
    }
    if (
      contact.lastName === '' ||
      !validator.isLength(contact.lastName, { min: 3, max: 8 })
    ) {
      setErrors({
        ...errors,
        lastName: 'LastName should be within 3 to 6 character',
      });
      return;
    }
    if (contact.email === '' || !validator.isEmail(contact.email)) {
      setErrors({
        ...errors,
        email: 'Please provide valid email',
      });
      return;
    }
    if (
      contact.profession === '' ||
      !validator.isLength(contact.profession, { min: 3, max: undefined })
    ) {
      setErrors({
        ...errors,
        profession: 'Please provide profession',
      });
      return;
    }
    const { id } = contact;
    //posting data to server
    if (id) {
      try {
        const result = await axios.put(`/api/contacts/${id}`, contact);
        dispatch({ type: 'CLEAR_SELECTED_CONTACT' });
        dispatch({ type: 'UPDATE_CONTACT', payload: result.data });

        props.history.push('/');
      } catch (e) {
        dispatch({ type: 'CONTACT_ERROR', payload: e.message });
      }
    } else {
      try {
        const result = await axios.post('/api/contacts', contact);
        dispatch({ type: 'CLEAR_SELECTED_CONTACT' });
        dispatch({ type: 'ADD_CONTACT', payload: result.data });
        props.history.push('/');
      } catch (e) {
        dispatch({ type: 'CONTACT_ERROR', payload: e.message });
      }
    }
  };

  const { firstName, lastName, email, profession, selectedValue } = contact;

  return (
    <React.Fragment>
      <h3>{selectedContact ? 'Edit Contact' : 'Add Contact'}</h3>
      <form onSubmit={handleSubmit}>
        <TextInputGroup
          label='FirstName'
          type='text'
          name='firstName'
          value={firstName}
          onChange={handleChange}
          errors={errors.firstName}
        />
        <TextInputGroup
          label='LastName'
          type='text'
          name='lastName'
          value={lastName}
          onChange={handleChange}
          errors={errors.lastName}
        />
        <TextInputGroup
          label='Email'
          type='text'
          name='email'
          value={email}
          onChange={handleChange}
          errors={errors.email}
        />

        <TextInputGroup
          label='Profession'
          type='text'
          name='profession'
          value={profession}
          onChange={handleChange}
          errors={errors.profession}
        />

        <p>
          <RadioInputGroup
            label='Personal'
            name='selectedValue'
            type='radio'
            value='personal'
            onChange={handleChange}
            selectedValue={selectedValue}
          />
          <RadioInputGroup
            label='Professional'
            name='selectedValue'
            type='radio'
            value='professional'
            onChange={handleChange}
            selectedValue={selectedValue}
          />
        </p>
        <button className='btn waves-effect waves-light' type='submit'>
          Submit
        </button>
      </form>
    </React.Fragment>
  );
};
export default withRouter(ContactForm);
