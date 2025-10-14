import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = ({ switchToLogin }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePic, setProfilePic] = useState(""); 
  const [loading, setLoading] = useState(false);
  // const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setError("");
    setLoading(true);

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/register`,
        { name, email, password, profilePic }
      );

      // Save user data using context
      switchToLogin();
    } catch (err) {
      console.log(err);

      // setError(
      //   err.response?.data?.message || "Something went wrong. Please try again."
      // );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-white relative bg-[#005d4b] w-2/3 rounded-3xl flex flex-col items-center justify-center md:w-1/4 p-4">
      <h1 className="p-2 text-[20px] font-extrabold">Create New Account</h1>
      <p className="text-[12px] mb-4 text-gray-400">
        Please enter your name, email and password!
      </p>

      {/* {error && <p className="text-red-500 text-[12px] mb-2">{error}</p>} */}

      <form
        className="flex flex-col w-full items-center mb-3"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          className="bg-white mb-3 text-center text-black rounded-full outline-0 h-10 px-2 w-[90%]"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
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
          className="bg-[#054640] p-2 rounded-2xl font-black w-[90%] disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Registering..." : "Submit"}
        </button>
      </form>

      <button
        onClick={switchToLogin}
        className="absolute bottom-2 text-red-600 text-[12px] p-[1px] border-b-[1px] border-b-red-600"
      >
        Already have an account? Login Here
      </button>
    </div>
  );
};

export default Register;

// import { Link } from "react-router-dom"

// const Register = ({switchToLogin}) => {
//   return (
//      <div className="text-white relative bg-[#005d4b] w-2/3 rounded-3xl flex flex-col items-center justify-center md:w-1/4">
//       <h1 className="p-2 text-[20px] font-extrabold">Create New Account</h1>
//       <p className="text-[12px] mb-7 text-gray-400">Please enter your email and password!</p>
//       <form className="flex flex-col w-full items-center mb-3">
//         <input type="text" className="bg-white mb-3 text-center text-black rounded-full outline-0 h-7 px-2 w-[90%]" placeholder="Name" />
//         <input type="text" className="bg-white mb-3 text-center text-black rounded-full outline-0 h-7 px-2 w-[90%]" placeholder="Email" />
//         <input type="password" className="bg-white mb-3 text-center text-black rounded-full outline-0 h-7 px-2 w-[90%]" placeholder="password"/>
//         <Link to='/dashboard' className="bg-[#054640] p-2 rounded-2xl font-black">Submit</Link>
//       </form>
//     </div>
//   )
// }

// export default Register
