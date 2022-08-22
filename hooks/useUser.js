import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useStorage } from "./useStorage";

export const useUser = (type) => {
  const [user, setUser] = useState(null);
  const { localStorage } = useStorage();

  //list states for username and password
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const getUserInLocalStorage = useCallback(() => {
    const data = localStorage.getItem("user");

    if (data?.username) {
      setUser(data);
    }
  }, [localStorage]);

  async function login() {
    setLoading(true);

    let headersList = {
      "Content-Type": "application/x-www-form-urlencoded",
    };

    let bodyContent = "username=" + username + "&password=" + password;

    let response = await fetch(
      "https://otif-server-dot-otif-mx.uc.r.appspot.com/access/signin",
      {
        method: "POST",
        body: bodyContent,
        headers: headersList,
      }
    );

    let data = await response.json();

    setLoading(false);

    if (data?.username) {
      //create a new session object
      localStorage.setItem("user", data);
      getUserInLocalStorage();
      router?.push("/users");
    } else {
      setError("There was an error");
    }
  }

  function signOut() {
    localStorage.clearSession();
    router?.push("/");
  }

  useEffect(() => {
    if (type == "user") {
      getUserInLocalStorage();
    }
  }, [getUserInLocalStorage, type]);

  return {
    username,
    password,
    setUsername,
    setPassword,
    user,
    loading,
    error,
    login,
    signOut,
  };
};
