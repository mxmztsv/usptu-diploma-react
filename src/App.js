import {AuthPage} from "./pages/AuthPage";
import toast, { Toaster } from 'react-hot-toast';
import {BrowserRouter as Router} from "react-router-dom";
import {getUserInfo} from "./controllers/authController";
import {AuthContext} from "./context/authContext";
import {useRoutes} from "./routes";
import Navbar from "./components/Navbar";

export const App = () => {
  // const {token, login, logout, userId, ready} = useAuth()
  const userInfo = getUserInfo()
  const isAuthenticated = userInfo.id
  const isSuperuser = userInfo.isSuperuser
  // const isAuthenticated = false
  const routes = useRoutes(isAuthenticated)
  return (
      <AuthContext.Provider value={{
        id: userInfo.id, name: userInfo.name, surname: userInfo.surname, middleName: userInfo.middleName, isAuthenticated, isSuperuser
      }}>
        <Router>
          { isAuthenticated && <Navbar/>}
          <div>
            {routes}
          </div>
        </Router>
        <Toaster/>
      </AuthContext.Provider>
  )
}

