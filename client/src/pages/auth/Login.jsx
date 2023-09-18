const Login = () => {
    return (
      <div className="min-h-screen w-full flex justify-center items-center">
        <div className="flex items-center">
          <img
            src="https://static.cdninstagram.com/images/instagram/xig/homepage/phones/home-phones.png?__makehaste_cache_breaker=HOgRclNOosk"
            alt=""
            className="mr-4" // Resim ile form arasına bir boşluk eklemek için
          />
          <form>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Telefon numarası, kullanıcı adı veya e-posta"
            />
          </form>
        </div>
      </div>
    );
  };
  
  export default Login;
  