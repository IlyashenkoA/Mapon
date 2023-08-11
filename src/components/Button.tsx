export const Button: React.FC<{
  title: string;
  form: string;
}> = ({ title, form }) => {
  return (
    <button
      className='btn btn-submit'
      type='submit'
      form={form}
    >
      {title}{' '}
    </button>
  );
};
