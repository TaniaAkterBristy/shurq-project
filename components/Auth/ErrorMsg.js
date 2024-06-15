  

const ErrorMsg = (props) => {
  return (
    <div className='text-[red] mb-3'>
      {props.children}
    </div>
  );
};

export default ErrorMsg;
