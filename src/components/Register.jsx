import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    // Validate trước khi gửi
    if (!email || !password || !confirmPassword) {
      setError('Vui lòng điền đầy đủ thông tin');
      return;
    }

    if (password !== confirmPassword) {
      setError('Mật khẩu không khớp');
      return;
    }

    if (password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự');
      return;
    }
    try {
      await axios.post('http://localhost:5000/api/auth/register', { email, password });
      alert("Đăng ký thành công!");
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.error || "Lỗi đăng ký");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleRegister} className="w-full max-w-sm bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4">Đăng ký</h2>
        
        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded text-sm">
            {error}
          </div>
        )}

        <div className="mb-4">
          <input
            value={email}
            onChange={e => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div className="mb-4">
          <input
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
            placeholder="Mật khẩu (ít nhất 6 ký tự)"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            required
            minLength={6}
          />
        </div>
        <div className="mb-6">
          <input
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            type="password"
            placeholder="Xác nhận mật khẩu"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Đăng ký
        </button>
        <p className="mt-4 text-center text-sm text-gray-600">
          Đã có tài khoản?{" "}
          <span
            onClick={() => navigate('/login')}
            className="text-blue-500 hover:underline cursor-pointer"
          >
            Đăng nhập
          </span>
        </p>
      </form>
    </div>
  );
};

export default Register;
