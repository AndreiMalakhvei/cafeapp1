import {Link, NavLink} from 'react-router-dom';
import {useContext} from "react";
import ContextStorage from "../../context/contextStorage";


const Header = () => {
  let {user, logoutUser} = useContext(ContextStorage)
  return (
    <header >
      {user && <h2>Welcome to our Restaurant, {user.username}!</h2>}
      <nav >
        <ul>
          <li>
            <NavLink to='/home' >
              HOME
            </NavLink>
          </li>
          <li>
            <NavLink to='/menu' >
              Меню
            </NavLink>
          </li>


          { user &&
            <li>
            <NavLink to='/stat'>
              Статистика
            </NavLink>
          </li>}


          { user?
              (<li>
            <Link onClick={logoutUser}> Logout </Link>
          </li>) :
            (<li>
            <NavLink to='/login'> Login </NavLink>
            </li>)}


          { user && user.username === 'admin'&& <li><NavLink to='/adminpage'>Тайная комната Админа</NavLink></li>}


        </ul>
      </nav>
    </header>
  );
};

export default Header;
