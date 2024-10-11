import React, { useState } from 'react';
import axios from 'axios';

const BookForm = () => {
  const admin = localStorage.getItem('admin');
  const token = localStorage.getItem('token');
console.log("admin:",admin);
console.log("token",token);
  const [bookData, setBookData] = useState({
    bookname: '',
    author: '',
    price: '',
    description: '',
    publishDate: '',
    pages: '',
    publisher: '',
    category: '', // Add category field to state
  });
  const [imageFile, setImageFile] = useState(null); // Separate state for the image file

  const handleChange = (e) => {
    setBookData({
      ...bookData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]); // Store the selected file
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Create a FormData object to handle file uploads
    const formData = new FormData();
    formData.append('bookname', bookData.bookname);
    formData.append('author', bookData.author);
    formData.append('price', bookData.price);
    formData.append('description', bookData.description);
    formData.append('publishDate', bookData.publishDate);
    formData.append('pages', bookData.pages);
    formData.append('publisher', bookData.publisher);
    formData.append('category', bookData.category); // Append the category
    if (imageFile) {
      formData.append('image', imageFile); // Append the image file to formData
    }

    try {
      // Make the POST request with formData and appropriate headers
      const response = await axios.post(`http://localhost:5000/api/book/addbook/${admin}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      console.log('Book added successfully:', response.data);

      // Clear form fields after successful submission
      setBookData({
        bookname: '',
        author: '',
        price: '',
        description: '',
        publishDate: '',
        pages: '',
        publisher: '',
        category: '', // Reset category
      });
      setImageFile(null);
      alert("successfully submitted")
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-100 to-green-100 p-8 min-h-screen flex justify-center items-center" style={{marginLeft:'230px',marginTop:'-650px'}}>
     
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Add a New Book</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Column 1 */}
            <div>
              <div className="flex flex-col">
                <label htmlFor="bookname" className="text-lg font-semibold">Book Name</label>
                <input
                  type="text"
                  id="bookname"
                  name="bookname"
                  value={bookData.bookname}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter book name"
                  required
                />
              </div>

              <div className="flex flex-col mt-4">
                <label htmlFor="author" className="text-lg font-semibold">Author</label>
                <input
                  type="text"
                  id="author"
                  name="author"
                  value={bookData.author}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter author name"
                  required
                />
              </div>

              <div className="flex flex-col mt-4">
                <label htmlFor="price" className="text-lg font-semibold">Price</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={bookData.price}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter price"
                  required
                />
              </div>

              <div className="flex flex-col mt-4">
                <label htmlFor="publishDate" className="text-lg font-semibold">Publish Date</label>
                <input
                  type="date"
                  id="publishDate"
                  name="publishDate"
                  value={bookData.publishDate}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex flex-col mt-4">
                <label htmlFor="pages" className="text-lg font-semibold">Pages</label>
                <input
                  type="number"
                  id="pages"
                  name="pages"
                  value={bookData.pages}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter number of pages"
                  required
                />
              </div>
            </div>

            {/* Column 2 */}
            <div>
              <div className="flex flex-col">
                <label htmlFor="publisher" className="text-lg font-semibold">Publisher</label>
                <input
                  type="text"
                  id="publisher"
                  name="publisher"
                  value={bookData.publisher}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter publisher name"
                />
              </div>

              <div className="flex flex-col mt-4">
                <label htmlFor="description" className="text-lg font-semibold">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={bookData.description}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter description"
                  rows={3}
                />
              </div>

              <div className="flex flex-col mt-4">
                <label htmlFor="image" className="text-lg font-semibold">Image</label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  onChange={handleFileChange}
                  className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="flex flex-col mt-4">
                <label htmlFor="category" className="text-lg font-semibold">Category</label>
                <select
                  id="category"
                  name="category"
                  value={bookData.category}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Category</option>
                  <option value="Fiction">Fiction</option>
                  <option value="Non-Fiction">Non-Fiction</option>
                  <option value="Novel">Novel</option>
                  <option value="Science">Science</option>
                  <option value="History">History</option>
                </select>
              </div>
            </div>
          </div>

          <div className="text-center mt-6">
            <button type="submit" className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookForm;
