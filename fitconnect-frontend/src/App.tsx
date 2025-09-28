import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/AuthContext";
import Layout from "./components/Layout";

import Main from "./pages/Main";
import Login from "./pages/Auth/Login";
import Register from "./pages/Main/Register";

import Profile from "./pages/profile";
import SetProfile from "./pages/profile/SetProfile";

function App() {
    return (
      <AuthProvider>
        <Router>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Main />} />
              <Route path="/auth/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              <Route path="/profile" element={<Profile />} />
              <Route path="/profile/setprofile" element={<SetProfile />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    );
}

export default App;