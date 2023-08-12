import logo from './logo.svg';
import { Routes, Route } from "react-router-dom";
import './App.css';
import Home from './Pages/Home';
import DashBoard from './Pages/DashBoard';
import Products from './Pages/Products';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<DashBoard/>}/>
        <Route path="/departments" element={<DashBoard/>}/>
        <Route path="/products" element={<Products/>}/>
      </Routes>
    </div>
  );
}

export default App;