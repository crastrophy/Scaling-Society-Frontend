import { NavLink } from 'react-router-dom';

export function NavigationTabs() {
  return (
    <nav className="flex gap-8 border-b border-gray-200 px-8 bg-white sticky top-0 z-20">
      <NavLink
        to="/dashboard"
        className={({ isActive }) =>
          `py-4 font-medium transition-colors duration-200 ${isActive ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600 hover:text-blue-500'}`
        }
      >
        Dashboard
      </NavLink>
      <NavLink
        to="/sdr-sales"
        className={({ isActive }) =>
          `py-4 font-medium transition-colors duration-200 ${isActive ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600 hover:text-blue-500'}`
        }
      >
        SDR Sales
      </NavLink>
      <NavLink
        to="/closer-sales"
        className={({ isActive }) =>
          `py-4 font-medium transition-colors duration-200 ${isActive ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600 hover:text-blue-500'}`
        }
      >
        Closer Sales
      </NavLink>
    </nav>
  );
} 