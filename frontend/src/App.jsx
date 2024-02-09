import { ThemeProvider } from "@mui/material/styles";
import { useSelector } from "react-redux";
import themeStyles from "./styles/theme";
import { ToastContainer } from "react-toastify"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";

function App() {
  const { screenThemeMode } = useSelector((state) => state.screenThemeMode)
  return (
    <ThemeProvider theme={themeStyles.custom({ mode: screenThemeMode })}>
      {/** toast section */}
      <ToastContainer
        theme={screenThemeMode}
      >
        {/** routes section */}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home/>}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
        {/** routes section */}

      </ToastContainer>
      {/** toast section */}
    </ThemeProvider>
  );
}

export default App;
