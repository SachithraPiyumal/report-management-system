
import './App.css';
import Login from './Pages/Login/Login';
import Registration from './Pages/Registration/Registration';
import Home from './Pages/Home/Home';
import {BrowserRouter as Router,Route, Routes} from "react-router-dom"

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' exact Component={Login} />
        <Route path='/register' exact Component={Registration} />
        <Route path='/home/:userId' exact Component={Home} />
      </Routes>
    </Router>

  );
}

export default App;
