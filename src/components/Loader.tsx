import ReactDOM from 'react-dom';

export const Loader = () => {
  const root = document.getElementById('root')!;

  return ReactDOM.createPortal(
    <div className='loader'>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>,
    root
  );
};
