import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import RecordsPage from "./pages/RecordsPage";
import OperationsFormPage from "./pages/OperationsFormPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import ProtectedRoute from "./ProtectedRoute";
import { OperationProvider } from "./context/OperationsContext";
import Navbar from "./components/Navbar";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <AuthProvider>
      <OperationProvider>
        <BrowserRouter>
          <main className="container mx-auto px-10">
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              <Route element={<ProtectedRoute />}>
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/records" element={<RecordsPage />} />
                <Route path="/save_record" element={<OperationsFormPage />} />
                <Route
                  path="/delete_record/:id"
                  element={<OperationsFormPage />}
                />
              </Route>
            </Routes>
          </main>
        </BrowserRouter>
      </OperationProvider>
    </AuthProvider>
  );
}

export default App;
