import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Styles/UserDetails.css';
import Spinner from '../Components/Spinner';

function UserDetails() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(10);

  console.log(data);
  console.log(localStorage.getItem('token'))

  const idxLast = currentPage * dataPerPage;
  const idxFirst = idxLast - dataPerPage;
  const currentItems = data?.slice(idxFirst, idxLast);
  const totalPages = Math.ceil(data.length / dataPerPage);

  useEffect(() => {
    getData();
  }, []);

  function getData() {
    setLoading(true); 
    axios
      .get('https://auth-backend-rsrp.onrender.com/api/users/userdetails',{
         headers: {
         Authorization: `Bearer ${localStorage.getItem('token')}`, 
         },
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        setError(error.message);
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
      {loading ? (
        <Spinner />
      ) : error ? (
        <p className="error">Error: {error}</p>
      ) : (
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
                  <td>{user.name} </td>
                  <td>{user.email}</td>
                  <td>{user.age}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination">
            <button className="prev" onClick={handlePrev} disabled={currentPage === 1}>
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={currentPage === index + 1 ? 'active' : ''}
              >
                {index + 1}
              </button>
            ))}
            <button className="next" onClick={handleNext} disabled={currentPage === totalPages}>
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default UserDetails;
