import axios from 'axios';
import React, { memo, useContext, useState } from 'react';

import { Link } from 'react-router-dom';
import { ContactContext } from '../../contexts/Contact.context';

const Contact = (props) => {
  const context = useContext(ContactContext);
  const { dispatch } = context;

  const [toggleContact, setToggleContact] = useState(false);
  const handleDelete = (id) => async () => {
    try {
      await axios.delete(`/api/contacts/${id}`);
      dispatch({ type: 'DELETE_CONTACT', payload: id });
      dispatch({ type: 'CLEAR_SELECTED_CONTACT' });
    } catch (e) {
      dispatch({ type: 'CONTACT_ERROR', payload: e.message });
    }
  };
  const handleToggleContact = () => {
    setToggleContact(!toggleContact);
  };
  const handleEdit = (contact) => () => {
    dispatch({ type: 'EDIT_CONTACT', payload: contact });
  };

  const {
    contact,
    contact: { id, firstName, lastName, email, profession },
  } = props;
  return (
    <div className='card'>
      <div className='card-content z-depth-3'>
        <h5 className='card-title'>
          {firstName} {lastName}
          <a href='#!' onClick={handleToggleContact}>
            <i className='material-icons small right'>
              {toggleContact ? 'arrow_drop_up' : 'arrow_drop_down'}
            </i>
          </a>
          <a href='#!' onClick={handleDelete(id)}>
            <i className='material-icons small right '>delete</i>
          </a>
          <Link to={`/edit/${id}`} onClick={handleEdit(contact)}>
            <i className='material-icons  small right'>edit</i>
          </Link>
        </h5>
        {toggleContact && (
          <ul>
            <li>{email}</li>
            <li>{profession}</li>
          </ul>
        )}
      </div>
    </div>
  );
};
export default memo(Contact);
