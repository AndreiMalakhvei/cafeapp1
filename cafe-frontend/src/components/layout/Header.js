import {Link, NavLink} from 'react-router-dom';
import {useContext} from "react";
import ContextStorage from "../../context/contextStorage";


const Header = () => {
  let {user, logoutUser} = useContext(ContextStorage)
  return (

      <div className="container">
        <header>
          <div className="col-md-12">
            <div className="row">

              <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                  <a className="navbar-brand" href="#">CAFE APPLICATION</a>
                    <span className="navbar-toggler-icon"></span>

                  <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                      <li className="nav-item">
                        <NavLink to='/home' className="nav-link" > HOME </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink to='/menu' className="nav-link" > Меню </NavLink>
                      </li>
                      {user &&
                          <li className="nav-item">
                        <NavLink to='/stat' className="nav-link" > Статистика </NavLink>
                      </li>}
                      {user && user.username === 'admin' &&
                          <li className="nav-item">
                        <NavLink to='/adminpage' className="nav-link" > Тайная комната Админа </NavLink>
                      </li>}

                    </ul>
                    <form className="d-flex" role="search">
                      {user ?
                        (<li className="nav-item">
                          <Link to="/#" onClick={logoutUser} className="nav-link"> Logout </Link>
                        </li>) :
                        (<li className="nav-item">
                          <NavLink to='/login' className="nav-link"> Login </NavLink>
                       </li>)}
                    </form>

                  </div>
                </div>
              </nav>
            </div>
          </div>

        </header>
      </div>
  );
};

export default Header;
