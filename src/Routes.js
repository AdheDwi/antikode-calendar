import { Route, Routes } from "react-router-dom";
import RecipesPage from "./pages/RecipesPage";

function RoutesApp() {
  return (
    <Routes>
      <Route path="/" element={<RecipesPage />} />
    </Routes>
  );
}

export default RoutesApp;
