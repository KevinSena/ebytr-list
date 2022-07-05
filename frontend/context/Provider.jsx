/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

function Provider({ children }) {
  const [user, setUser] = useState({});

  const contextValue = { setUser, user };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('login'));
    if (data.token) {
      setUser(data)
    }
  }, []);

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.element,
}.isRequired;

export default Provider;
