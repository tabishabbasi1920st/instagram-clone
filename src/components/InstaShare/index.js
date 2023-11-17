import Login from "../Login";
import Home from "../Home";
import MyProfile from "../MyProfile";
import UserProfile from "../UserProfile";
import NotFound from "../NotFound";
import { Routes, Route } from "react-router-dom";

export default function InstaShare() {
  return (
    <Routes>
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/" element={<Home />} />
      <Route exact path="/my-profile" element={<MyProfile />} />
      <Route exact path="/users/:id" element={<UserProfile />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
