import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      window.dispatchEvent(new Event('tokenChanged'));
      navigate('/Products'); 
    } catch (err) {
      console.log('Lỗi đăng nhập:', err);
      alert(err.response?.data?.error || "Lỗi đăng nhập");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Đăng nhập</h2>

        <input
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
          type="email"
          className="w-full mb-4 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Mật khẩu"
          className="w-full mb-6 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Đăng nhập
        </button>
        <p className="mt-4 text-center text-sm text-gray-600">
          Chưa có tài khoản?{" "}
          <span
            onClick={() => navigate('/register')}
            className="text-blue-500 hover:underline cursor-pointer"
          >
            Đăng ký ngay
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
