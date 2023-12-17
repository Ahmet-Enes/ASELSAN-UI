import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage";
import NoPage from "./pages/NoPage";
import ProductsPage from "./pages/ProductsPage";
import TopUpPage from "./pages/TopUpPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminPage from "./pages/AdminPage";
import { useCallback, useEffect, useState } from "react";
import api from "./common/api";
import { message } from "antd";


export default function App() {
  const [balance, setBalance] = useState();

  const getBalance = useCallback(() => {
    api.get('/balance/CURRENT_SUM').then((response) => {
      setBalance(response.data.amount);
    })
    .catch((err) => message.error(err.response.data));
  }, []);

  useEffect(() => { 
    getBalance();
  }, [getBalance]);

  const refreshBalance = () => {
    getBalance();
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home balance={balance} />} />
        <Route path="products" element={<ProductsPage balance={balance} refreshBalance={refreshBalance} />} />
        <Route path="topup" element={<TopUpPage balance={balance} refreshBalance={refreshBalance} />} />
        <Route path="*" element={<NoPage />} />
        <Route path="admin" element={<AdminPage />} />
        <Route path="admin/login" element={<AdminLoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);