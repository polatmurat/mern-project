import React from "react";
import { logout } from "../../app/reducers/authReducer";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {

  const { user, userToken } = useSelector((state) => state.authReducer);

  console.log(user, userToken);
  const dispatch = useDispatch();

  return (
    <>
      <div>Home</div>
      <h1>Welcome {user.name}</h1>
      <button onClick={() => dispatch(logout('user-token'))} className="p-3 border-1 bg-rose-500 text-white rounded-lg">Logout</button>
    </>
  );
};

export default Home;
