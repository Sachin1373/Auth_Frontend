import React from 'react';
import '../Styles/Home.css';

function Home() {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero">
        <h1>Welcome to SecureAuth</h1>
        <p>Empowering you with JWT Authentication for Secure, Modern Applications.</p>
        <button className="get-started">Get Started</button>
      </section>
      
      {/* Info Section */}
      <section className="info-section">
        <h2>What is JWT Authentication?</h2>
        <p>JSON Web Token (JWT) is a compact, URL-safe token format used for securely transmitting information between parties as a JSON object. It's commonly used for user authentication and authorization in web applications.</p>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2>Why Choose JWT Authentication?</h2>
        <ul className="features-list">
          <li>🔒 **Enhanced Security** - Prevent unauthorized access with token-based security.</li>
          <li>⚡ **Efficiency** - Lightweight and fast, perfect for modern web apps.</li>
          <li>🌍 **Scalability** - Easily scalable for applications of any size.</li>
          <li>🔑 **Stateless** - No server-side session storage required, simplifying server architecture.</li>
        </ul>
      </section>
    </div>
  );
}

export default Home;
