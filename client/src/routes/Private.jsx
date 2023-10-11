import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Private = ({ children }) => {
  const { userToken } = useSelector((state) => state.authReducer);
  return userToken ? children : <Navigate to="/login" />;
};

export default Private;
