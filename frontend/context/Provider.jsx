/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';
import { useRouter } from 'next/router';

function Provider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [taskSeted, setTaskSeted] = useState({});
  const route = useRouter()

  const contextValue = { setTasks, tasks, taskSeted, setTaskSeted };

  useEffect(() => {
    try {
      const data = JSON.parse(localStorage.getItem('login'));
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
