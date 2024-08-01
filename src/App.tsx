import { HomePage } from "./views/HomePage/HomePage";
import { Routes, Route } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/notifications/styles.css";
import { FormPage } from "./views/FormPage/FormPage";
import { Notifications } from "@mantine/notifications";

function App() {
  return (
    <MantineProvider>
      <Notifications position="top-right" zIndex={2000} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/FormPage" element={<FormPage />} />
      </Routes>
    </MantineProvider>
  );
}

export default App;
