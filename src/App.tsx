import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Product from "./pages/Product";
import ProductDetail from "./pages/ProductDetail";
import MainLayout from "./layouts/MainLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import Category from "./pages/Category";
import LoginPage from "./pages/LoginPage";

// Create a client
const queryClient = new QueryClient();

function App() {
  

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout/>}>
            <Route index element={<LoginPage />} />
            <Route path="/home" element={<Home />} />
          </Route>
    
          <Route path="dashboard" element={<DashboardLayout/>} >
            <Route index element={<Product/>} />
            <Route path="category" element={<Category/>} />
            <Route path="product/:id" element={<ProductDetail/>} />
          </Route>
        </Routes>
    </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
