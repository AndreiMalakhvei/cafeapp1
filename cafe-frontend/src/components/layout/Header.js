import { NavLink } from 'react-router-dom';


const Header = () => {
  return (
    <header >
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
          <li>
            <NavLink to='/stat' >
              Статистика
            </NavLink>
          </li>
          <li>
            <NavLink to='/menu' >
              Login
            </NavLink>
          </li>
          <li>
            <NavLink to='/menu' >
              Logout
            </NavLink>
          </li>
          <li>
            <NavLink to='/menu' >
              New account
            </NavLink>
          </li>
          <li>
            <NavLink to='/menu' >
              Тайная комната Админа
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
