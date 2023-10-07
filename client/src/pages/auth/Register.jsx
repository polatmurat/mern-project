import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAdminToken } from "../../app/reducers/authReducer";
import { AiFillFacebook } from "react-icons/ai";
import { useUserRegisterMutation } from "../../features/auth/authService";

const Register = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchURI = "http://localhost:5173/footer.json";

    const fetchData = async () => {
      try {
        const response = await fetch(fetchURI);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        throw new Error(error);
      }
    };

    fetchData();
  }, []);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, response] = useUserRegisterMutation();

  const [registerData, setRegisterData] = useState({
    email: "",
    name: "",
    username: "",
    password: "",
  });

  const routeLogin = () => {
    navigate("/login");
  };

  const formChange = (e) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value,
    });
  };

  const handleForm = (e) => {
    e.preventDefault();
    const { email, name, username, password } = registerData;
    console.log("mpol");
    dispatch(register(registerData));
  };

  useEffect(() => {
    if (response.isError) {
      console.error("Kaydolma işlemi başarısız oldu:", response.error);
    }
    if (response.isSuccess) {
      const token = response?.data?.token;

      localStorage.setItem("admin-token", token);
      dispatch(setAdminToken(token));
      navigate("/");
    }
  }, [response]);

  return (
    <>
      <div className="min-h-screen w-full flex justify-center items-center flex-col">
        <div className="sm:w-3/12 border-2 p-4 my-5">
          <img
            src="/instagram-text.png"
            alt=""
            className="w-[183px] h-[85px] mx-auto mt-10 mb-3"
          />
          <div className="text-center">
            <span className="text-gray-500 font-medium text-sm">
              Arkadaşlarının fotoğraf ve videolarını görmek için kaydol.
            </span>
          </div>
          <div className="flex items-center justify-center">
            <button className="py-2 mt-3 w-11/12 rounded-lg bg-btnprimary hover:bg-btnsecondary text-white text-xs font-medium flex justify-center items-center">
              <AiFillFacebook size={20} className="mr-2" />
              <span>Facebook ile giriş yap</span>
            </button>
          </div>
          <div className="text-center mt-4 text-sm text-gray-600"> YA DA </div>
          <form
            className="w-full flex justify-center flex-col items-center  p-4"
            onSubmit={handleForm}
          >
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Cep Telefonu Numarası veya E-posta"
              className="p-3 w-11/12 text-xs bg-slate-50 border rounded-sm mb-2"
              onChange={formChange}
            />
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Adı Soyadı"
              className="p-3 w-11/12 text-xs bg-slate-50 border rounded-sm mb-2"
              onChange={formChange}
            />
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Kullanıcı Adı"
              className="p-3 w-11/12 text-xs bg-slate-50 border rounded-sm mb-2"
              onChange={formChange}
            />
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Şifre"
              className="p-3 w-11/12 text-xs bg-slate-50 border rounded-sm"
              onChange={formChange}
            />
          </form>
          <div className="text-center">
            <div className="text-gray-500 text-xs">
              Hizmetimizi kullanan kişiler senin iletişim bismilerini
              Instagram'a yüklemiş olabilir.{" "}
              <a href="Daha Fazla Bismi Al" className="text-indigo-600 text-xs">
                Daha Fazla Bismi Al
              </a>
            </div>
            <div className="text-gray-500 text-xs mt-4">
              Kaydolarak,{" "}
              <span href="" className="text-indigo-600 text-xs">
                Koşullarımızı, Gizlilik İlkemizi
              </span>{" "}
              ve{" "}
              <span className="text-indigo-600 text-xs" href="">
                Çerezler İlkemizi
              </span>{" "}
              kabul etmiş olursun.
            </div>
          </div>
          <div className="flex justify-center items-center">
            <button
              onClick={handleForm}
              className="py-2 mt-3 w-11/12 rounded-lg bg-btnprimary hover:bg-btnsecondary text-white text-xs font-medium flex justify-center items-center"
            >
              Kaydol
            </button>
          </div>
        </div>
        <div className="sm:w-3/12 border-2 px-6 py-5 flex justify-center items-center">
          Hesabın var mı?{" "}
          <button
            onClick={routeLogin}
            className="ml-1 text-indigo-400 font-normal text-sm"
          >
            Giriş Yap
          </button>
        </div>
        <span className="mt-3">Uygulamayı indir</span>
        <div className="sm:w-3/12 flex justify-center -my-5">
          <img
            src="https://static.cdninstagram.com/rsrc.php/v3/yp/r/XUCupIzGmzB.png"
            alt=""
            className="h-[40px] mb-3 overflow-clip"
          />
          <img
            src="https://static.cdninstagram.com/rsrc.php/v3/yf/r/BFthdeAc5KC.png"
            alt=""
            className="h-[40px] mb-3 overflow-clip"
          />
        </div>
        <div className="flex mt-10 text-xs mb-10 text-gray-500">
          {data.map((text, id) => (
            <span key={id} className="mr-3">
              {text.footerName}
            </span>
          ))}
        </div>
      </div>
    </>
  );
};

export default Register;
