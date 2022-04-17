import { Route, Routes } from "react-router-dom";
import CalendarPage from "./pages/CalendarPage";

function RoutesApp() {
  return (
    <Routes>
      <Route path="/" element={<CalendarPage />} />
    </Routes>
  );
}

export default RoutesApp;
