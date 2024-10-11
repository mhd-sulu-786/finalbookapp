import React from 'react';
import { useNavigate } from 'react-router-dom';
const successImage = 'https://tse1.mm.bing.net/th?id=OIP.okEbXP6IVFnLIRKtI4wajwHaHa&pid=Api&rs=1&c=1&qlt=95&w=123&h=123'; 

const PaymentDone = () => {
  const navigate=useNavigate()
  return (
    <div style={styles.container}>
      <img src={successImage} alt="Payment Done" style={styles.image} />
      <h2>Payment Done!</h2>
      <p>Thank you for completing your secure online payment.</p>
      <p>Have a great day!</p>
      {localStorage.setItem("path", "Content")}
      <button className='btn btn-primary' onClick={()=> navigate('/')} style={styles.button} >
        GO BACK
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    textAlign: 'center',
  },
  image: {
    width: '100px',
    height: '100px',
    marginBottom: '20px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#6a4bc9', // Adjust to match the color in your image
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default PaymentDone;
