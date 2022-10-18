import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import './App.scss';
import Form from './components/Form';
import { actionCreators } from './store';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const { fetchCars } = bindActionCreators(actionCreators, dispatch);

  useEffect(() => {
    fetchCars(setIsLoading);
  }, [])

  return (
    <div className='container'>
      <div className='logo'>
        <img src={require('./images/mapon-colour.png')} alt='Logo' />
      </div>
      {isLoading ? null : <Form />}
    </div>
  );
}

export default App;
