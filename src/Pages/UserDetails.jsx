import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Styles/UserDetails.css';
import Spinner from '../Components/Spinner';

function UserDetails() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(10);
  const [isauth, setauth] = useState(false);

  const idxLast = currentPage * dataPerPage;
  const idxFirst = idxLast - dataPerPage;
  const currentItems = data?.slice(idxFirst, idxLast);
  const totalPages = data.length > 0 ? Math.ceil(data.length / dataPerPage) : 1;

  useEffect(() => {
    getData();
  }, []);

  function getData() {
    setLoading(true); 
    axios
      .get('https://auth-backend-rsrp.onrender.com/api/users/userdetails', {
        withCredentials: true,
      })
      .then((response) => {
        setData(response.data);
        setauth(true);
      })
      .catch((error) => {
        if (error.response?.status === 401) {
          setError("Unauthorized. Please log in.");
          setauth(false);
        } else {
          setError(error.message || "An error occurred.");
        }
      })
      .finally(() => setLoading(false)); 
  }

  function handlePageChange(pageNumber) {
    setCurrentPage(pageNumber);
  }

  function handlePrev() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function handleNext() {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }

  return (
    <div className="container">
      <h2>User Details</h2>
      {!isauth && !loading && (
        <p className="login-prompt">Please log in to view user details.</p>
      )}
      {loading ? (
        <Spinner />
      ) : error ? (
        <p className="error">Error: {error}</p>
      ) : isauth && data.length > 0 ? (
        <>
          <table className="user-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Age</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.age}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination">
            <button className="prev" onClick={handlePrev} disabled={currentPage === 1} aria-label="Previous Page">
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={currentPage === index + 1 ? 'active' : ''}
                aria-label={`Page ${index + 1}`}
              >
                {index + 1}
              </button>
            ))}
            <button className="next" onClick={handleNext} disabled={currentPage === totalPages} aria-label="Next Page">
              Next
            </button>
          </div>
        </>
      ) : (
        <p className="no-data">No user data available.</p>
      )}
    </div>
  );
}

export default UserDetails;
