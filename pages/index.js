import React, { useEffect, useState } from "react";
import { useUser } from "../hooks/useUser";
import { useRouter } from "next/router";

function Home() {
  const {
    setUsername,
    setPassword,
    username,
    password,
    loading,
    error,
    login,
    user,
  } = useUser("user");
  const router = useRouter();

  //route to users page if user exist
  useEffect(() => {
    if (user?.first_name) router?.push("/users");
  }, [router, user]);

  //login method
  //routes to users data pages after login
  //states gets saved in local storage
  const handleSubmit = async (e) => {
    e.preventDefault();
    await login();
  };

  return (
    <div className="container d-flex justify-content-center align-items-center mx-auto vh-100">
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit} className="col-md-5 col-lg-4">
        <div className="form-group mb-3">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            className="form-control"
            name="username"
            id="username"
            aria-describedby="helpId"
            placeholder=""
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group mb-4">
          <label htmlFor="password">Password</label>
          <input
            type="text"
            className="form-control"
            name="password"
            id="password"
            aria-describedby="helpId"
            placeholder=""
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group mb-4 w-100">
          <button
            type="submit"
            className="btn btn-primary btn-block w-100"
            disabled={!username || !password || loading}>
            {loading ? "..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Home;
