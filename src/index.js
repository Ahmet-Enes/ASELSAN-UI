import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage";
import NoPage from "./pages/NoPage";
import ProductsPage from "./pages/ProductsPage";
import TopUpPage from "./pages/TopUpPage";
import AdminLoginPage from "./pages/AdminLoginPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="topup" element={<TopUpPage />} />
        <Route path="*" element={<NoPage />} />
        <Route path="admin/login" element={<AdminLoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);