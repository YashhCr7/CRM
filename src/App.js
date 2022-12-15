import "./App.css";
import NavBar from "./Components/NavBar/Navbar.jsx";
import ForgotPassword from "./Components/ForgotPassword";
import Login from "./Components/Login";
import People from "./Components/People/People"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import StorageService from "./Services/StorageServices";

function App() {
  let user = StorageService.get("userInfo");
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="*"
            element={
              user ==null? <Navigate to="/login"/> :<Navigate to="/"/>
            }
          />
          <Route path="/login" element={<Login/>} />
          <Route path="/" element={<NavBar/>} />
          <Route path="/" element={<ForgotPassword />} />
          <Route path="/people" element={<People/>} />
        </Routes>
      </Router>
    </div>
  );
}
export default App;
