import { stat } from 'graceful-fs';
import React, { Component, useReducer, useEffect } from 'react';
import axios from 'axios';
import { initial } from 'lodash';
export const ContactContext = React.createContext();

export const ContactProvider = (props) => {
  const initialState = {
    contacts: [],
    selectedContact: null,
    error: '',
    filterText: '',
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    const getContacts = async () => {
      try {
        const result = await axios.get('/api/contacts');
        dispatch({
          type: 'GET_CONTACTS',
          payload: result.data,
        });
      } catch (e) {
        dispatch({ type: 'CONTACT_ERROR', payload: e.message });
      }
    };
    getContacts();
  }, []);

  return (
    <ContactContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'GET_CONTACTS': {
      return {
        ...state,
        contacts: action.payload,
      };
    }
    case 'ADD_CONTACT': {
      return {
        ...state,
        contacts: [...state.contacts, action.payload],
      };
    }
    case 'DELETE_CONTACT': {
      return {
        ...state,
        contacts: state.contacts.filter(
          (contact) => contact.id !== action.payload
        ),
      };
    }
    case 'EDIT_CONTACT': {
      return {
        ...state,
        selectedContact: action.payload,
      };
    }
    case 'UPDATE_CONTACT': {
      return {
        ...state,
        contacts: state.contacts.map((contact) =>
          contact.id === action.payload.id
            ? (contact = action.payload)
            : contact
        ),
      };
    }
    case 'CONTACT_ERROR':
      return {
        ...state,
        error: action.payload,
      };
    case 'CLEAR_SELECTED_CONTACT':
      return {
        ...state,
        selectedContact: null,
      };
    case 'SEARCH_FILTER':
      return {
        ...state,
        filterText: action.payload,
      };
    default:
      return state;
  }
};
