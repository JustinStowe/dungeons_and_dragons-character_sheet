import React, { useState } from "react";
import { Route, Routes, Navigation } from "react-router-dom";
import "./app.css";
import { SignupPage, LoginPage, ProfilePage } from "../../Pages";

export function App() {
  const [user, setUser] = useState({});
  const handleAuth = () => {
    setUser(userService.getUser());
  };

  const handleLogout = () => {
    userService.logout();
    setUser(null);
  };

  if (user) {
    return (
      <Routes>
        <Route
          path="/"
          element={
            <Layout user={user} setUser={setUser} handleLogout={handleLogout} />
          }
        ></Route>
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/login" element={<LoginPage handleAuth={handleAuth} />} />
      <Route path="/signup" element={<SignupPage handleAuth={handleAuth} />} />
    </Routes>
  );
}
