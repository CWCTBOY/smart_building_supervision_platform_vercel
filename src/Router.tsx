import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import GlobalContainer from "./components/global";
import Member from "./components/member";
import Forgot from "./components/member/forgot";
import SignIn from "./components/member/signin";
import SignUp from "./components/member/signup";
import Main from "./pages";
import AddNew from "./pages/others/addNew";
import Edit from "./pages/others/edit";
import Upload from "./pages/others/upload";
import VirtualTour from "./pages/others/virtualTour";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route>
          <Route path="/" element={<Navigate to="/member/signin" />} />
          <Route path="/member" element={<Member />}>
            <Route path="signin" element={<SignIn />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="find" element={<Forgot />} />
          </Route>
          <Route element={<GlobalContainer />}>
            <Route path="/project" element={<Main />}>
              <Route path="new" element={<AddNew />} />
              <Route path=":id">
                <Route path="edit" element={<Edit />} />
                <Route path="upload" element={<Upload />} />
                <Route path="virtualtour" element={<VirtualTour />} />
              </Route>
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
