import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Route, Routes, Link } from 'react-router-dom';
import Home from './components/home/Home';
import ListUsers from './components/List_Users/ListUsers';
import CreateUser from './components/create_user/CreateUser';
import EditUser from './components/EditUser';

function App() {
  return (
    <div className="App">
      <Home />
      <Routes>
        <Route path='list-user' element={<ListUsers/>}/>
        <Route path='create-user' element={<CreateUser />} />
        <Route path='/edit-user/:id/' element={<EditUser />}/>
        </Routes>
    </div>
  );
}

export default App;
