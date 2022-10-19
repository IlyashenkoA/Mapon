import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import './App.scss';
import Form from './components/Form/Form';
import { Loader } from './components/Loader/Loader';
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
      <header className='header__logo'>
        <img src={require('./images/mapon-colour.png')} alt='Logo' />
      </header>
      {isLoading ? <Loader /> : <Form />}
    </div>
  );
}

export default App;
