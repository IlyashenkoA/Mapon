import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

import Form from './Form';
import { Loader } from './Loader';

import { actionCreators } from '../store';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  const { fetchCars } = bindActionCreators(
    actionCreators,
    dispatch
  );

  useEffect(() => {
    fetchCars(setIsLoading);
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className='app__logo'>
            <img
              src={require('../assets/images/logo.png')}
              alt='Mapon Logo'
            />
          </div>
          <Form />
        </>
      )}
    </>
  );
};

export default App;
