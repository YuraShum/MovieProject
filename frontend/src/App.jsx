import { ThemeProvider } from "@mui/material/styles";
import { useSelector } from "react-redux";
import themeStyles from "./styles/theme";
import { ToastContainer } from "react-toastify"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home/Home";
import Wrapper from "./components/Page/Wrapper/Wrapper";
import ContentSearch from "./pages/Content/ContentSearch/ContentSearch";
import Protected from "./components/Page/Wrapper/Protected";
import FavoriteList from "./pages/Favorite/FavoriteList";
import CommentList from "./pages/Comment/CommentList";
import PasswordUpdate from "./pages/PasswordUpdate/PasswordUpdate";
import PersonDetail from "./pages/Person/PersonDetail";
import ContentList from "./pages/Content/ContentList/ContentList";
import ContentDetail from "./pages/Content/ContentDetail/ContentDetail";
import { useEffect } from "react";
import 'react-toastify/dist/ReactToastify.css';
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
function App() {
  const { screenThemeMode } = useSelector((state) => state.screenThemeMode)
  useEffect(() => {
    console.log(themeStyles.custom({ screenThemeMode }))
  }, [screenThemeMode])
  return (
    <ThemeProvider theme={themeStyles.custom({ mode: screenThemeMode })}>
      {/** toast section */}
      <ToastContainer
        theme={screenThemeMode}
      />
      {/** toast section */}
      {/** routes section */}
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<Layout />}>

            <Route index element={<Wrapper state='home'>
              <Home />
            </Wrapper>} />

            <Route path="/search" element={
              <Wrapper state='search'>
                <ContentSearch />
              </Wrapper>
            } />

            <Route path="/favorites" element={
              <Wrapper state='favorites'>
                <Protected>
                  <FavoriteList />
                </Protected>
              </Wrapper>
            } />

            <Route path="/comments" element={
              <Wrapper state='comments'>
                <Protected>
                  <CommentList />
                </Protected>
              </Wrapper>
            } />

            <Route path="/password-update" element={
              <Wrapper state='password.update'>
                <Protected>
                  <PasswordUpdate />
                </Protected>
              </Wrapper>
            } />

            <Route path="/person/:id" element={
              <Wrapper state="person.detail">
                <PersonDetail />
              </Wrapper>
            } />

            <Route path="/:type" element={<ContentList />} />

            <Route path="/:type/:id" element={<ContentDetail />} />

          </Route>
        </Routes>
      </BrowserRouter>
      {/** routes section */}
    </ThemeProvider>
  );
}

export default App;
