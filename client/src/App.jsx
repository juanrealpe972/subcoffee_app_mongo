import { BrowserRouter, Routes, Route } from "react-router-dom"

import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import { AuthProvider } from "./context/AuthContext"

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<h1>Home Page</h1>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/tasks" element={<h1>Tasks Page</h1>} />
          <Route path="/add-task" element={<h1>Create task</h1>} />
          <Route path="/tasks/:id" element={<h1>Update task</h1>} />
          <Route path="/profile" element={<h1>Profile</h1>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App