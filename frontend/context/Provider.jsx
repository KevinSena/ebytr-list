/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';
import { useRouter } from 'next/router';

function Provider({ children }) {
  const [user, setUser] = useState({});
  const [tasks, setTasks] = useState([]);
  const [taskSeted, setTaskSeted] = useState({});
  const route = useRouter()

  const contextValue = { setUser, user, setTasks, tasks, taskSeted, setTaskSeted };

  useEffect(() => {
    try {
      const data = JSON.parse(localStorage.getItem('login'));
      setUser(data.token)
    } catch (error) {
      route.push('/')
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
