import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Route, Routes } from 'react-router-dom';
import { Link } from 'react-router-dom';
import ViewUsers from './pages/ViewUsers';
import CreateUsers from './pages/CreateUser';

function App() {
  return (
    <div className="App">
      {/* <Home />
      <Routes>
        <Route path='list-user' element={<ListUsers/>}/>
        <Route path='create-user' element={<CreateUser />} />
        <Route path='/edit-user/:id/' element={<EditUser />}/>
        </Routes> */}

      <nav>
        <Link to="/">View Users</Link> | <Link to="/create">Create User</Link>
      </nav>
      <Routes>
        <Route path="/" element={<ViewUsers />} />
        <Route path="/create" element={<CreateUsers />} />
      </Routes>
    </div>
  );
}

export default App;
