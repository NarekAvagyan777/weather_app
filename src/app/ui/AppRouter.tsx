import { Route, Routes } from "react-router-dom";
import { HomePage } from "../../pages/HomePage/ui/HomePage";

export const AppRouter = () => {
  return (
    <Routes>
      <Route element={<HomePage />} path="/" />
    </Routes>
  );
};
