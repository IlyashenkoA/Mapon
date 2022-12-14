import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

import Form from './Form';
import { Loader } from './Loader';
import { actionCreators } from '../store';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  const { fetchCars } = bindActionCreators(actionCreators, dispatch);

  useEffect(() => {
    fetchCars(setIsLoading);
  }, [])

  return (
    <div className='wrapper'>
      <div className='logo'>
        <img src={require('../images/logo.png')} alt='Logo' />
      </div>
      {isLoading ? <Loader /> : <Form />}
    </div>
  );
}

export default App;
