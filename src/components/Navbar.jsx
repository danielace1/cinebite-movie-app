import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-primary-col1 p-5 h-[95vh] grid justify-between rounded-xl">
      <div className="grid justify-center mb-32">
        <Link to={""}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 24 24"
            className="fill-current text-primary-col4 hover:cursor-pointer hover:text-red-600"
          >
            <path d="m4 4l2 4h3L7 4h2l2 4h3l-2-4h2l2 4h3l-2-4h3q.825 0 1.413.588T22 6v12q0 .825-.587 1.413T20 20H4q-.825 0-1.412-.587T2 18V6q0-.825.588-1.412T4 4"></path>
          </svg>
        </Link>

        <ul className="grid space-y-5">
          <li>
            <NavLink to="" className="active-nav" aria-current="page">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
                viewBox="0 0 24 24"
              >
                <path d="M3 3h8v8H3zm0 10h8v8H3zM13 3h8v8h-8zm0 10h8v8h-8z"></path>
              </svg>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/user/movieslist"
              className="active-nav"
              aria-current="page"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
                viewBox="0 0 24 24"
              >
                <path d="M18 4v1h-2V4c0-.55-.45-1-1-1H9c-.55 0-1 .45-1 1v1H6V4c0-.55-.45-1-1-1s-1 .45-1 1v16c0 .55.45 1 1 1s1-.45 1-1v-1h2v1c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-1h2v1c0 .55.45 1 1 1s1-.45 1-1V4c0-.55-.45-1-1-1s-1 .45-1 1M8 17H6v-2h2zm0-4H6v-2h2zm0-4H6V7h2zm10 8h-2v-2h2zm0-4h-2v-2h2zm0-4h-2V7h2z"></path>
              </svg>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/user/TVshows"
              className="active-nav"
              aria-current="page"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
                viewBox="0 0 48 48"
              >
                <defs>
                  <mask id="ipSTvOne0">
                    <g fill="none" strokeLinejoin="round" strokeWidth={4}>
                      <path
                        fill="#fff"
                        stroke="#fff"
                        d="M42 12H6a2 2 0 0 0-2 2v26a2 2 0 0 0 2 2h36a2 2 0 0 0 2-2V14a2 2 0 0 0-2-2Z"
                      />
                      <path fill="#000" stroke="#000" d="M31 19H11v16h20z" />
                      <path
                        stroke="#fff"
                        strokeLinecap="round"
                        d="m14 4.5l9.09 7.5L34 2"
                      />
                      <path
                        stroke="#000"
                        strokeLinecap="round"
                        d="M38 18v1m0 6v1"
                      />
                    </g>
                  </mask>
                </defs>
                <path
                  fill="currentColor"
                  d="M0 0h48v48H0z"
                  mask="url(#ipSTvOne0)"
                />
              </svg>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/user/watchlist"
              className="active-nav"
              aria-current="page"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
                viewBox="0 0 256 256"
              >
                <path d="M184 32H72a16 16 0 0 0-16 16v176a8 8 0 0 0 12.24 6.78L128 193.43l59.77 37.35A8 8 0 0 0 200 224V48a16 16 0 0 0-16-16"></path>
              </svg>
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="grid items-end justify-center">
        <img
          src="https://ui-avatars.com/api/?name=John+Doe"
          alt="name"
          className="w-10 h-10 rounded-full"
        />
      </div>
    </nav>
  );
};

export default Navbar;
