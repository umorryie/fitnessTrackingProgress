import './App.css';
import LeftRouting from './components/LeftRouting/LeftRouting';
import DashboardNav from './components/Navbar/DashboardNav';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useSelector } from 'react-redux';
import { selectUser } from './redux/features/user';
import { selectActiveNavbar } from './redux/features/activeNavbar';
import navbarEnums from './constants/NavbarEnums';
import DashboardContent from './components/DashboardContent/DashboardContent';
import ExercisesContent from './components/ExercisesContent/ExercisesContent';
import FriendsContent from './components/FriendsContent/FriendsContent';

function App() {
  const user = useSelector(selectUser);
  const activeNav = useSelector(selectActiveNavbar);

  const renderContent = () => {
    switch (activeNav.activeNavbar) {
      case navbarEnums.dashboard:
        return <DashboardContent />;
      case navbarEnums.friends:
        return <FriendsContent />;
      case navbarEnums.exercises:
        return <ExercisesContent />;
    }
  }

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/login" exact={true}>
            <Login />
          </Route>
          <Route path="/signup" exact={true}>
            <SignUp />
          </Route>
          <Route path="/dashboard" exact={true}>
            {(!user || !user.jwt || user.jwt === null || user.jwt === '') ? <Redirect to={{ pathname: "/login" }} /> :
              <div className="dashboardContentContainer">
                <LeftRouting></LeftRouting>
                <div className="rightContainer">
                  <DashboardNav></DashboardNav>
                  {renderContent()}
                </div>
              </div>}
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
