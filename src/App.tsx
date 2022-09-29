import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import './App.scss';
import Form from './components/Form';
import { fetchCars } from './store/action-creators/action-creators';
import { ICars } from './types/ICars';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, [])

  async function fetchData() {
    try {
      setIsLoading(true);
      const response = await axios.get<ICars[]>(`https://mapon.com/api/v1/unit/list.json?key=${process.env.REACT_APP_MAPON_API}`);
      dispatch(fetchCars(response.data));
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
    }
  }

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
