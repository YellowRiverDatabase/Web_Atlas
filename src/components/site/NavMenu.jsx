import { Link, useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { isNavMenuState } from "./globalState";

export function NavMenu() {
  const [isNavMenu, setIsNavMenu] = useRecoilState(isNavMenuState);
  const location = useLocation();

  const menuItemsArray = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "About",
      path: "/about",
    },
    {
      name: "Contact",
      path: "/contact",
    },
  ];

  const menuItems = menuItemsArray.filter(
    (item) => item.path !== location.pathname
  );

  const Menu = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    color: lightgrey;
    background-color: #242424;
    z-index: 100;

    @media (max-width: 500px) {
      top: 10.1%;
      left: 0;
      width: 100vw;
      height: 90vh;
    }

    @media (min-width: 501px) {
      top: 10.1%;
      left: 0;
      width: 250px;
      height: 90vh;
      border-left: solid 1px grey;
      border-right: solid 1px grey;
    }
  `;

  const MenuItems = styled.nav`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    height: 50%;
  `;

  return (
    <Menu>
      <MenuItems>
        {menuItems.map((item, i) => (
          <Link
            key={`${item.name}-${i}`}
            to={item.path}
            onClick={() => setIsNavMenu(false)}
          >
            {item.name}
          </Link>
        ))}
      </MenuItems>
      <button>Close</button>
    </Menu>
  );
}
