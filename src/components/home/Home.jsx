// import { memo } from 'react';
// import { Link } from 'react-router-dom';

// const Home = () => {
//   return (
//     <div>
//       <h5>React CRUD Operations Using PHP API and MySQL</h5>{" "}
//       <nav>
//         <ul>
//           <li>
//             <Link to="list-user">List Users</Link>
//           </li>
//           <li>
//             <Link to="create-user">Create User</Link>
//           </li>
//         </ul>
//       </nav>
//     </div>
//   );
// };

// export default memo(Home);



import { memo } from "react";
import { Link } from "react-router-dom";
import './Home.modules.css';
const Home = () => {
  return (
    <div className="home-container">
      <h1>React CRUD with PHP & MySQL</h1>
      <nav>
        <ul className="nav-links">
          <li>
            <Link to="list-user" className="btn-link">
              List Users
            </Link>
          </li>
          <li>
            <Link to="create-user" className="btn-link">
              Create User
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default memo(Home);
