import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { useAuthState } from "react-firebase-hooks/auth";
import { firebaseAuth } from "./firebase";

import ProtectedRoutes from "./components/ProectedRoutes";
import NavBar from "./components/layout/NavBar";
import Home from "./pages/Home";
import GroupFinder from "./pages/GroupFinder";
import IndexSwap from "./pages/IndexSwap";
import IndexSwapSearch from "./pages/IndexSwapSearch";
import Forum from "./pages/Forum";
import ModForum from "./pages/ModForum";
import Loader from "./components/Loader";
import GFModClassPage from "./pages/GFModClassPage";
import Profile from "./pages/Profile"
import Account from './pages/Account'

function App() {
  const [user, loading, error] = useAuthState(firebaseAuth);

  return (
    <Router>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <NavBar />
          <Routes>
            <Route path="/*" element={<Home />} />
            <Route element={<ProtectedRoutes />}>
              <Route path="/indexSwap" element={<IndexSwap />} />
              <Route path="/indexSwap/:moduleCode/:currentIndex/:desiredIndex" element={<IndexSwapSearch />} />
              <Route path="/groupFinder" element={<GroupFinder />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/account" element={<Account />} />
              <Route
                path="/groupFinder/:moduleCode/:classIndex"
                element={<GFModClassPage />}
              />
              <Route path="/forum" element={<Forum />} />
              <Route path="/forum/:moduleCode" element={<ModForum />} />
            </Route>
          </Routes>
        </div>
      )}
    </Router>
  );
}

export default App;
