import { useState, useEffect } from "react";
import { useAuthLoginMutation } from "../../features/auth/authService";
import { setAdminToken } from "../../app/reducers/authReducer";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const formChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const [login, response] = useAuthLoginMutation();
  
  const routeRegister = () => {
    navigate('/register')
  }

  console.log("Response : ", response);

  const errors = response.error?.data?.errors ? response.error.data.errors : [];

  const handleForm = (e) => {
    e.preventDefault();
    const { username, password } = loginData;
    if (username && password) {
      login(loginData);
    }
  };

  useEffect(() => {
    if (response.isSuccess) {
      const token = response?.data?.token;

      localStorage.setItem("admin-token", token);
      dispatch(setAdminToken(token));
      navigate("/");
    }
  }, [response.isSuccess]);

  return (
    <>
      <div className="min-h-screen w-full flex justify-center items-center">
        <div className="flex">
          <div className="flex-1">
            <img
              src="https://static.cdninstagram.com/images/instagram/xig/homepage/phones/home-phones.png?__makehaste_cache_breaker=HOgRclNOosk"
              alt=""
              className="mr-4"
            />
          </div>
          <div className="flex-1">
            <div className="border-2">
              <img
                src="/instagram-text.png"
                alt=""
                className="w-[183px] h-[85px] mx-auto mt-10 mb-3"
              />
              <form
                className="w-full flex justify-center flex-col items-center"
                onSubmit={handleForm}
              >
                <input
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Telefon numarası, kullanıcı adı veya e-posta"
                  className="p-3 w-10/12 text-xs bg-slate-50 border rounded-sm mb-2"
                  onChange={formChange}
                />
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Şifre"
                  className="p-3 w-10/12 text-xs bg-slate-50 border rounded-sm"
                  onChange={formChange}
                />
                <button className="py-1 mt-3 w-9/12 rounded-md bg-btnprimary hover:bg-btnsecondary text-white text-sm">
                  Giriş Yap
                </button>
              </form>
              <div className="text-center mt-4 text-sm text-gray-600">
                {" "}
                YA DA{" "}
              </div>
              <div className="text-center mt-3 mb-4">
                <a className="mt-2 text-sm" href="#">
                  {" "}
                  Şifreni mi unuttun?{" "}
                </a>
              </div>
            </div>
            <div className="border-2 py-4 mt-3 text-center text-sm">
              Hesabın yok mu?{" "}
              <button onClick={routeRegister} className="text-btnsecondary font-medium">
                Kaydol
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
