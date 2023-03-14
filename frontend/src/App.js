import { BrowserRouter, Routes, Route } from "react-router-dom";
import Heaader from './components/Header'
import MainPage from './pages/MainPage'
import SignupPage from './pages/User/SignupPage'
import LoginPage from "./pages/User/LoginPage";

function App() {
  return (
    <div>
    <BrowserRouter>
      <Heaader/>
      <Routes>
        <Route exact path="/" element={<MainPage/>}/>
        <Route exact path="/signup" element={<SignupPage/>}/>
        <Route exact path="/login" element={<LoginPage/>}/>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
