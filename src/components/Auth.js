import { useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../store/authContext";

const Auth = () => {
  const authCtx = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [register, setRegister] = useState(true);

  const usernameChangeHandler = (event) => {
    setUsername(event.target.value);
  };
  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    //!Add a validation of the username and passowrd here
    // if (!username || !password) {
    //   return alert('Please fill out both fields')
    // }

    const body = {
      username,
      password,
    };

    if (register) {
      axios
        .post("http://localhost:4000/register", body)
        .then(({ data }) => {
          authCtx.login(data.token, data.exp, data.userId);
          console.log("after auth", data);
        })
        .catch((err) => {
          console.log(err)
          alert(`Sorry, there was an error with your registration. Error Message: ${err}`);
        });
    } else {
      axios
        .post("http://localhost:4000/login", body)
        .then(({ data }) => {
          authCtx.login(data.token, data.exp, data.userId);
          console.log("after auth", data);
        })
        .catch((err) => {
          console.log(err)
          alert(`Sorry, there was a problem logging in. Error Message: ${err.response.data}`)
        });
    }

    setUsername("");
    setPassword("");
  };

  return (
    <main>
      <h1>Welcome!</h1>
      <form className="form auth-form" onSubmit={submitHandler}>
        <input
          className="form-input"
          type="text"
          value={username}
          placeholder="username"
          onChange={usernameChangeHandler}
        />
        <input
          className="form-input"
          type="password"
          value={password}
          placeholder="password"
          onChange={passwordChangeHandler}
        />
        <button className="form-btn">{register ? "Sign Up" : "Login"}</button>
      </form>
      <button className="form-btn" onClick={() => setRegister(!register)}>
        Need to {register ? "Login" : "Sign Up"}?
      </button>
    </main>
  );
};

export default Auth;
