import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login as loginAction } from "../redux/authSlice";
import { setSocket } from "../redux/socketSlice";
import { io } from "socket.io-client";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";


const AuthForm = ({ isLogin, switchToRegister, switchToLogin }) => {
  const [email, setEmail] = useState("tom@tom.com");
  const [password, setPassword] = useState("1234");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      let response;
      if (isLogin) {
        // Login request
        response = await axios.post(`http://192.168.1.40:5000/api/auth/login`, { email, password });
      } else {
        // Register request
        response = await axios.post(`http://192.168.1.40:5000/api/auth/register`, { name, email, password });
      }

      const data = response.data;

      if (isLogin) {
        dispatch(loginAction(data));

        const socket = io(`http://192.168.1.40:5000`, { transports: ["websocket"] });
        socket.emit("setup", data._id);
        dispatch(setSocket(socket));
        
        // toast.success(`Welcome back, ${data.name}!`, {
        //   duration: 3000,
        //   position: "top-center",
        //   style: {
        //     background: "#c598e5ff",
        //     color: "#fff",
        //     borderRadius: "12px",
        //     padding: "10px 16px",
        //     fontSize: "14px",
        //     width: window.innerWidth < 768 ? "80%" : "400px",
        //   },
        // });

          
toast.custom((t) => (
  <div
    className={`${t.visible ? 'animate-custom-enter' : 'animate-custom-leave'} bg-[#054640] text-white rounded-2xl px-6 py-4 flex items-center`}
    style={{
      background: "#bd84e5",
      color: "#40016d",
      borderRadius: "12px",
      padding: "10px 16px",
      fontSize: "14px",
      width: window.innerWidth < 768 ? "80%" : "400px",
    }}
  >
    <span>
      ✅ Welcome back,{' '}
      <span className="font-bold text-[#3b0f5b] text-2xl ">
        {data.name}
      </span>!
    </span>
  </div>
), {
  duration: 3000,
  position: 'top-center',
});




            navigate("/dashboard");


        // Redirect to dashboard after login
        // navigate("/dashboard"); // Uncomment if using navigation
      } else {
        // Handle register logic here
        switchToLogin();
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Something went wrong. Please try again.", {
        duration: 3000,
        position: "top-center",
        style: {
          background: "#dc2626",
          color: "white",
          borderRadius: "12px",
          fontSize: "14px",
        },
      });
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-white relative bg-[#4f0186] w-2/3 rounded-3xl flex flex-col items-center justify-center md:w-1/4 p-4">
      <h1 className="p-2 text-[20px] font-extrabold">{isLogin ? "Login" : "Create New Account"}</h1>
      <p className="text-[12px] mb-4 text-gray-400">
        Please enter your {isLogin ? "email and password" : "name, email, and password"}!
      </p>

      {error && <p className="text-red-500 text-[12px] mb-2">{error}</p>}

      <form className="flex flex-col w-full items-center mb-3" onSubmit={handleSubmit}>
        {!isLogin && (
          <input
            type="text"
            className="bg-white mb-3 text-center text-black rounded-full outline-0 h-10 px-2 w-[90%]"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required={!isLogin}
          />
        )}
        <input
          type="email"
          className="bg-white mb-3 text-center text-black rounded-full outline-0 h-10 px-2 w-[90%]"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="bg-white mb-3 text-center text-black rounded-full outline-0 h-10 px-2 w-[90%]"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-[#40016d] hover:bg-[#bd84e5] w-[90%] p-2 rounded-2xl font-black disabled:opacity-50 transition-all duration-700"
          disabled={loading}
        >
          {loading ? (isLogin ? "Logging in..." : "Registering...") : isLogin ? "Login" : "Register"}
        </button>
      </form>

      <button
        onClick={isLogin ? switchToRegister : switchToLogin}
        className="absolute bottom-2 text-red-600 text-[12px] p-[1px] border-b-[1px] border-b-red-600"
      >
        {isLogin ? "Create New Account" : "Already have an account? Login Here"}
      </button>
    </div>
  );
};

export default AuthForm;
