import { useEffect, useState } from "react";
import Login from "../components/Login";
import Register from "../components/Register";
import { useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";

const HomePage = () => {
  const navigate = useNavigate()
  

  
  
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div className="bg-[#40016d] w-full h-screen flex flex-col items-center justify-center relative">
        <h1 className="text-white mb-[5px] text-3xl md:text-[60px]">ChatsApp</h1>
        <p className="text-white mb-[30px] text-[12px] text-center md:text-[20px]">World's best free Chat Application where you can chat with anyone sitting anywhere in the world</p>
      <AuthForm isLogin={isLogin} switchToRegister={() => setIsLogin(false)} switchToLogin={() => setIsLogin(true)}/>
    </div>
  );
};

export default HomePage;

// useEffect(() => {
//   const timer = setInterval(() => {
//     setTime(prevTime => {
//       if (prevTime === 1) {
//         clearInterval(timer); // Clear the interval when countdown reaches 0
//         navigate('/sample'); // Navigate to dashboard
//       }
//       return prevTime - 1;
//     });
//   }, 1000);

//   // Clean up interval when component is unmounted or timer finishes
//   return () => clearInterval(timer);
// }, [navigate]);