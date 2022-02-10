import React from "react";
import "./assets/css/home.css";

const Home = () => {
  return (
    <main className="container-fluid home">
      <div className="jumbotron min-vh-100 hero mx-auto px-4">
        <h1 className="display-4 text-center text-light">
          <strong>Vinyl Collection</strong>
        </h1>
        <hr className="my-4 text-light" />
        <p className="lead text-center text-light">
          Find vinyls online for your favorite artists and records. 
          Upload your personal vinyl collections for others to view
          and access.
        </p>
      </div>
    </main>
  );
};

export default Home;
