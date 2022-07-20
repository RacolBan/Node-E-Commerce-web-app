import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DataProvider } from "./GlobalState";
import defaultLayout from "./Layout/DefaultLayout/DefaultLayout";
import Admin from "./pages/Admin/Admin";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import DetailProduct from './pages/DetailProduct/DetailProduct'
import Cart from "./pages/Cart/Cart";
import Profile from "./pages/Profile/Profile";
import ChangePassword from "./pages/ChangePassword/ChangePassword";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";


function App() {
  const Layout = defaultLayout;
  return (
    <DataProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />
          <Route
            path="/register"
            element={
              <Layout>
                <Register />
              </Layout>
            }
          />
          <Route
            path="/login"
            element={
              <Layout>
                <Login />
              </Layout>
            }
          />
          <Route
            path="/detail/:id"
            element={
              <Layout>
                <DetailProduct />
              </Layout>
            }
          />
          <Route
            path="/cart"
            element={
              <Layout>
                <Cart />
              </Layout>
            }
          />
          <Route
            path="/profile"
            element={
              <Layout>
                <Profile />
              </Layout>
            }
          />
          <Route
            path="/changepass"
            element={
              <Layout>
                <ChangePassword />
              </Layout>
            }
          />
          <Route
            path="/forgot"
            element={
              <Layout>
                <ForgotPassword />
              </Layout>
            }
          />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Router>
    </DataProvider>
  );
}

export default App;
