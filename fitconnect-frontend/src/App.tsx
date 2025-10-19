import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/AuthContext";
import Layout from "./components/Layout";

import Main from "./pages/Main";
import Login from "./pages/Auth/Login";
import Register from "./pages/Main/Register";

import SetProfile from "./pages/Profile/SetProfile";
import JobProfile from "./pages/Profile/JobProfile";

import Interview from "./pages/Assessment/Interview";
import Result from "./pages/Assessment/Result";

import Recommendation from "./pages/Search/Recommendation";
import Like from "./pages/Search/Like";
import Weight from "./pages/Search/Weight";

function App() {
    return (
      <AuthProvider>
        <Router>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Main />} />
              <Route path="/auth/login" element={<Login />} />
              <Route path="/auth/register" element={<Register />} />

              <Route path="/profile/setprofile" element={<SetProfile />} />
              <Route path="/profile/jobprofile" element={<JobProfile />} />

              <Route path="/assessment/interview" element={<Interview />} />
              <Route path="/assessment/result" element={<Result />} />
              
              <Route path="/search/recommendation" element={<Recommendation />} />
              <Route path="/search/recommendation/weight" element={<Weight />} />
              <Route path="/search/like" element={<Like />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    );
}

export default App;