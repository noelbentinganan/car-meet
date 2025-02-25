import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import CarHome from "../assets/png/car_home.png";
import tradeIcon from "../assets/png/tradeIcon.png";
import saleIcon from "../assets/png/saleIcon.png";
import rentIcon from "../assets/png/rentIcon.png";
// test
import pp from "../assets/mitsuha_pp.jpg";
// firebase imports
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase.config";
import { Link } from "react-router-dom";

const Navbar = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const [userData, setUserData] = useState(null);

  const location = useLocation();

  const pathMatchRoute = (route) => {
    if (route === location.pathname) {
      return true;
    }
  };

  // Get user data from firestore
  useEffect(() => {
    const fetchUser = async () => {
      const docRef = doc(db, "users", auth.currentUser.uid); // reference current users uid
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log(docSnap.data());
        setUserData(docSnap.data());
      }
    };

    fetchUser();
  }, [auth.currentUser.uid]);

  return (
    <>
      <nav className="navbar">
        <div
          className={pathMatchRoute("/") ? "menu-item highlight" : "menu-item"}
        >
          <Link to="/">
            <img className="menu-icon" src={CarHome} alt="car logo" />
          </Link>
        </div>
        <ul className="menu-items text-600">
          <li
            className={
              pathMatchRoute("/category/trade")
                ? "menu-item highlight"
                : "menu-item"
            }
          >
            <Link to="/category/trade">
              <img className="menu-icon" src={tradeIcon} alt="trade icon" />
            </Link>
          </li>
          <li
            className={
              pathMatchRoute("/category/sale")
                ? "menu-item highlight"
                : "menu-item"
            }
          >
            <Link to="/category/sale">
              <img className="menu-icon" src={saleIcon} alt="sale icon" />
            </Link>
          </li>
          <li
            className={
              pathMatchRoute("/category/rent")
                ? "menu-item highlight"
                : "menu-item"
            }
          >
            <Link to="/category/rent">
              <img className="menu-icon" src={rentIcon} alt="rent icon" />
            </Link>
          </li>
        </ul>
        <div>
          {user.photoURL ? (
            <img src={user.photoURL} alt="Profile" width="100" />
          ) : (
            <p>No Profile Picture</p>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
