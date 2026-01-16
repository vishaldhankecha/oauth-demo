import { useState } from "react";
import { Login } from "./Login";
import { Callback } from "./Callback";
import { Profile } from "./Profile";

function App() {
  const [token, setToken] = useState<string | null>(null);

  if (window.location.pathname === "/callback") {
    return <Callback onToken={setToken} />;
  }

  if (!token) {
    return <Login />;
  }

  return <Profile token={token} setToken={setToken} />;
}

export default App;
