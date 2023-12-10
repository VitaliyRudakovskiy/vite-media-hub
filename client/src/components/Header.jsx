import React, { useEffect, useState, memo } from "react";
import Button from "../UI/Button/Button";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Avatar from "../UI/Avatar/Avatar";
import decode from "jwt-decode";

const Header = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  //Рендеринг имени пользователя сразу при аутентификации
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        handleLogOut();
      }
    }
  });

  const handleLogOut = () => {
    dispatch({ type: "LOGOUT" });
    setUser(null);
    navigate("/");
  };

  const handleLogIn = () => {
    navigate("/");
  };

  return (
    <div className="flex items-center justify-between gap-4 p-4 pl-[5rem] bg-[#f3f3f3] w-full mb-4">
      <Link to="/cards">
        <h1 className="text-3xl font-bold text-green-600 select-none cursor-pointer">
          Media Content Hub
        </h1>
      </Link>

      <div className="flex flex-wrap gap-5">
        {user && <Avatar user={user} />}
        {user ? (
          <Button
            variant="primary"
            style={{ padding: "0.5rem 1rem" }}
            onClick={handleLogOut}
          >
            Log Out
          </Button>
        ) : (
          <Button
            variant="primary"
            style={{ padding: "0.5rem 1rem" }}
            onClick={handleLogIn}
          >
            Log In
          </Button>
        )}
      </div>
    </div>
  );
};

export default memo(Header);
