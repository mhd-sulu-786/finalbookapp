import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Footer from '../Layout/Footer';
import { toast, ToastContainer } from 'react-toastify';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userId = localStorage.getItem('UserId');
  const navigate = useNavigate();

  // Fetch Cart Data
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/cart/getCart/${userId}`)
      .then((res) => {
        setCart(res.data.books);
        calculateTotal(res.data.books);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userId]);

  // Calculate total price of the cart
  const calculateTotal = (cartItems) => {
    const total = cartItems.reduce(
      (acc, item) => acc + (item.bookId?.price || 0) * item.quantity,
      0
    );
    setTotalPrice(total);
  };

  // Remove item from cart
  const removeFromCart = (bookId) => {
    axios
      .post(`http://localhost:5000/api/cart/removeFromCart`, { userId })
      .then(() => {
        const updatedCart = cart.filter((item) => item.bookId?._id !== bookId);
        setCart(updatedCart);
        calculateTotal(updatedCart);
        toast.success('Item removed from cart', { position: 'top-right' });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Handle checkout and initiate PayPal payment
  const handleCheckout = async () => {
    try {
      // Submit order data
      const response = await axios.post(
        `http://localhost:5000/api/orders/checkout`,
        { userId }
      );

      console.log('Order placed successfully:', response.data);

      // PayPal payment request
      const paymentResponse = await axios.post(
        `http://localhost:5000/api/payment/pay`,
        {
          amount: totalPrice,
          currency: 'USD',
          description: 'Order payment',
        }
      );
      toast.success('Order placed successfully', { position: 'top-center' });


      const { forwardLink } = paymentResponse.data;
      if (forwardLink) {
        window.location.href = forwardLink; // Redirect user to PayPal for payment approval
      } else {
        console.error('No forward link found in response');
        toast.error('Error initiating payment');
      }

      setCart([]); // Clear cart after successful checkout
      setTotalPrice(0); // Reset total price
      navigate(`/order/${userId}`);
    } catch (error) {
      console.error('Error during checkout:', error.response ? error.response.data : error);
      toast.error(`Error: ${error.message}`);
    }
  };

  // Open Modal for confirmation
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Close Modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <ToastContainer />
      <div className="container mx-auto mt-8 px-4">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Your Cart</h2>
        {cart.length === 0 ? (
          <p className="text-gray-600">No items in cart.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cart.map((item) => (
              item.bookId && (
                <div key={item.bookId._id} className="bg-white shadow-md rounded-lg overflow-hidden">
                  <img
                    className="w-full h-48 object-cover"
                    src={`http://localhost:5000/images/${item.bookId.image || 'placeholder.png'}`}
                    alt={item.bookId.bookname}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/placeholder.png';
                    }}
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-semibold mb-2">{item.bookId.bookname}</h3>
                    <p className="text-gray-600 mb-4">Price: ${item.bookId.price} x {item.quantity}</p>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => removeFromCart(item.bookId._id)}
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-200"
                      >
                        Remove
                      </button>
                      <button
                        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-200"
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              )
            ))}
          </div>
        )}
        <div className="mt-8">
          <h3 className="text-xl font-bold">Total: ${totalPrice}</h3>
          {cart.length > 0 && (
            <button
              onClick={openModal}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
            >
              Checkout
            </button>
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm">
            <h2 className="text-lg font-semibold mb-4">Confirm Checkout</h2>
            <p className="mb-6">Are you sure you want to proceed with the checkout?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleCheckout}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-200"
              >
                Confirm
              </button>
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div style={{ paddingTop: '50px' }}>
        <Footer />
      </div>
    </>
  );
};

export default Cart;
