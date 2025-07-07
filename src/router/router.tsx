import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import ProductListPage from "../pages/ProductListPage";
import ProductDetailesPage from "../pages/ProductDetailesPage";

export const Router: React.FC = () => (
  <HashRouter>
    <Routes>
      <Route>
        <Route path="/" element={<Navigate to="/products" replace />} />
        <Route path="/products" element={<ProductListPage />} />
        <Route path="/product/:id" element={<ProductDetailesPage />} />
      </Route>
    </Routes>
  </HashRouter>
);
