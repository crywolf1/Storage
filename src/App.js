import "./App.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import FilesViewer from "./components/FilesViewer";
import SlideIcon from "./components/SideIcons";
import { auth, provider } from "./firebase";
import { signInWithPopup } from "firebase/auth";

import { useState } from "react";
function App() {
  const [user, setUser] = useState(null);

  const handleLogin = () => {
    if (!user) {
      signInWithPopup(auth, provider)
        .then((result) => setUser(result.user))
        .catch((error) => alert(error.message));
    }
  };

  return (
    <div className="app">
      {user ? (
        <>
          <Header userPhoto={user?.photoURL} />
          <div className="app__main">
            <Sidebar />
            <FilesViewer />
            <SlideIcon />
          </div>
        </>
      ) : (
        <div className="app__login">
          <img src="logo512.png" alt="Storage" />
          <button onClick={handleLogin}>Log in to Storage</button>{" "}
        </div>
      )}
    </div>
  );
}
export default App;
