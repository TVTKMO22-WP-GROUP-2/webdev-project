import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Header from "./components/Header";
import Movies from "./pages/Movies";
import Groups from "./pages/Groups";
import Account from "./pages/Account";
import Home from "./pages/Home";
import Login from "./pages/Login";
import YourReviews from "./pages/YourReviews";
import AtTheaters from "./pages/AtTheaters";
import NoPage from "./pages/NoPage";
import DetailPageWrapper from './pages/DetailPageWrapper';


export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="movies" element={<Movies />} />
        <Route path="/movie/:movie_id" element={<DetailPageWrapper />} />
        <Route path="at-theaters" element={<AtTheaters />} />
        <Route path="your-reviews" element={<YourReviews />} />
        <Route path="groups" element={<Groups />} />
        <Route path="account" element={<Account />} />
        <Route path="login" element={<Login />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}
