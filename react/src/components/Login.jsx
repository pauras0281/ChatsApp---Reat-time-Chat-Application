import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login as loginAction } from "../redux/authSlice";
import { setSocket } from "../redux/socketSlice";
import { io } from "socket.io-client";
import { toast } from "react-hot-toast";


const Login = ({ switchToRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch()



  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        { email, password }
      );
      
            dispatch(loginAction(data));

            const socket = io(import.meta.env.VITE_API_URL, {
        transports: ["websocket"],
        
      });
      socket.emit("setup", data._id);
      dispatch(setSocket(socket));

      // Success toast
      toast.success(`Welcome back, <span className='font-bold text-red-700' >${data.name}!</span>`, {
        duration: 3000,
        position: "top-center",
        style: {
          background: "#054640",
          color: "#fff",
          borderRadius: "12px",
          padding: "10px 16px",
          fontSize: "14px",
          width: window.innerWidth < 768 ? "80%" : "400px", // ✅ Responsive
        },
      });
      

      // Redirect to dashboard
      navigate("/dashboard");
    } catch (err) {
      console.log(err);

       toast.error(
        err.response?.data?.message || "Invalid credentials. Try again.",
        {
          duration: 3000,
          position: "top-center",
          style: {
            background: "#dc2626",
            color: "white",
            borderRadius: "12px",
            fontSize: "14px",
          },
        }
      );
      
      setError(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-white relative bg-[#4f0186] w-2/3 rounded-3xl flex flex-col items-center justify-center md:w-1/4 p-4">
      <h1 className="p-2 text-[20px] font-extrabold">Login</h1>
      <p className="text-[12px] mb-4 text-gray-400">Please enter your email and password!</p>

      {error && <p className="text-red-500 text-[12px] mb-2">{error}</p>}

      <form
        className="flex flex-col w-full items-center mb-3"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
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
          className="bg-[#40016d] hover:bg-[#bd84e5] w-[90%]  p-2 rounded-2xl font-black  disabled:opacity-50 transition-all duration-00"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <button
        onClick={switchToRegister}
        className="absolute bottom-2 text-red-600 text-[12px] p-[1px] border-b-[1px] border-b-red-600"
      >
        Create New Account
      </button>
    </div>
  );
};

export default Login;










// import { Link } from "react-router-dom";



// const Login = ({switchToRegister}) => {

//   return (
//     <div className="text-white relative bg-[#005d4b] w-2/3 rounded-3xl flex flex-col items-center justify-center md:w-1/4">
//       <h1 className="p-2 text-[20px] font-extrabold">Login</h1>
//       <p className="text-[12px] mb-7 text-gray-400">Please enter your email and password!</p>
//       <form className="flex flex-col w-full items-center mb-3">
//         <input type="text" className="bg-white mb-3 text-center text-black rounded-full outline-0 h-7 px-2 w-[90%]" placeholder="Email" />
//         <input type="password" className="bg-white mb-3 text-center text-black rounded-full outline-0 h-7 px-2 w-[90%]" placeholder="password"/>
//         <Link to='/dashboard' className="bg-[#054640] p-2 rounded-2xl font-black">Submit</Link>
//       </form>
//     </div>
//   );
// };

// export default Login;
