import { useState } from "react";
import { checkKey } from "./Utils";

interface Props {
  toggle: () => void;
}

export let passwordGlobal = "";
export let passwordStatus: string;

function Login(props: Props) {
  const [password, setPassword] = useState("");

  async function handleLogin(e: { preventDefault: () => void }) {
    e.preventDefault();
    passwordGlobal = password;
    if (JSON.parse(await checkKey(password))) {
      passwordStatus = "Password Correct";
    } else {
      passwordStatus = "Password Incorrect";
    }

    props.toggle();
  }

  return (
    <div className="popup">
      <div className="popup-inner">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button type="submit">Login</button>
        </form>
        <button onClick={props.toggle}>Close</button>
      </div>
    </div>
  );
}

export default Login;
