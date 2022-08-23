import React, { useState } from "react";
import { useUser } from "../hooks/useUser";

function Users({ users }) {
  //cal user from local storage
  const { user } = useUser("user");

  const [data, setData] = useState(users);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const text = e.target.value;

    const results = users.filter(
      (user) =>
        user.username?.includes(text) ||
        user.first_name?.includes(text) ||
        user.last_name?.includes(text) ||
        user.phone_num?.includes(text)
    );

    if (text?.length >= 1) {
      if (results?.length >= 1) {
        setData(results);
        console.log(results);
      } else {
        console.log(message);
        setMessage("There is no data");
        setData([]);
      }
    } else {
      setData(users);
      setMessage("");
    }
  };

  return (
    <div className="container mx-auto py-4 align-items-center">
      <div>
        <h1 className="text-center">
          Welcome, <span className="text-primary">{user?.first_name}</span>
        </h1>
        <div className="my-4">
          <input
            type="search"
            className="form-control"
            placeholder="Search for a user"
            onChange={handleChange}
          />
        </div>
        <div className="my-4">
          {message && <p>{message}</p>}
          {data?.length == 1 ? (
            <>
              <h3>
                {data[0]?.first_name} {data[0]?.last_name} data
              </h3>
              <p>Username: {data[0]?.username}</p>
              <p>Email: {data[0]?.email}</p>
              <p>Phone: {data[0]?.phone_num}</p>
              <p>Birthday: {data[0]?.birthday}</p>
              <p>Verified: {data[0]?.verified}</p>
            </>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>Full name</th>
                  <th>User name</th>
                  <th>Email</th>
                  <th>Phone number</th>
                </tr>
              </thead>
              <tbody>
                {!data ? (
                  "loading..."
                ) : (
                  <>
                    {data?.length > 0 &&
                      data?.map((user) => (
                        <tr key={user?.username}>
                          <td scope="row">
                            {user?.first_name} {user?.last_name}
                          </td>
                          <td>{user?.username}</td>
                          <td>{user?.email}</td>
                          <td>{user?.phone_num}</td>
                        </tr>
                      ))}
                  </>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const response = await fetch(
    "https://otif-server-dot-otif-mx.uc.r.appspot.com/access"
  );
  const data = await response.json();
  console.log(data);

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: { users: data }, // will be passed to the page component as props
  };
}

export default Users;
