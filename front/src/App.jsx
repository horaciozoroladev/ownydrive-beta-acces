import { Routes, Route, useNavigate } from "react-router-dom";

import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "/node_modules/primeflex/primeflex.css";

import { SignIn } from "./pages/SignIn";
import { Home } from "./pages/Home";
import { SignUp } from "./pages/SignUp";
import { Notes } from "./pages/Notes";
import { NoteAction } from "./pages/NoteAction";
import { Albums } from "./pages/Albums";
import { AlbumAction } from "./pages/AlbumAction";
import { Navigation } from "./components/Navigation";
import axios from "axios";
import { getToken } from "./services/auth.service";

function App() {
  const navigate = useNavigate();
  if (getToken() == "") {
    navigate("/");
  }
  axios.interceptors.request.use(
    function (response) {

      return response;
    },
    function (error) {
  
      return Promise.reject(error);
    }
  );
  axios.interceptors.response.use(
    function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      // console.log(response);

      return response;
    },
    function (error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      console.log(error);

      if (error.response.data.message == "You should sign in again") {
        localStorage.clear();
        navigate("/");
      }
      return Promise.reject(error);
    }
  );
  return (
    <PrimeReactProvider>
      <Navigation />
      <Routes>
        <Route path="/" exact element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/notes/:id" element={<NoteAction />} />
        <Route path="/albums" element={<Albums />} />
        <Route path="/albums/:id" element={<AlbumAction />} />
      </Routes>
    </PrimeReactProvider>
  );
}

export default App;
