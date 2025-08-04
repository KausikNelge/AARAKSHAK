import react, {useState} from 'react';
import {Link} from 'react-router-dom';
function Login() {
    const[email , setEmail] = useState('');
    const[password, setPassword] = useState('');
    const handleSubmit = (e) => {
    e.preventDefault();
    const cleanEmail = email.trim()
    const cleanPassword= password.trim()
    if(!cleanEmail || !cleanPassword)
        alert('please fill in both input fields')
    return;
console.log('Submitting:',cleanEmail, cleanPassword);
};        
    return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-xl w-full max-w-md shadow-lg">
        <h2 className="text-2xl font-semibold mb-6 text-center">Login to Aarakshak</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              className="w-full mt-1 p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              className="w-full mt-1 p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 transition p-2 rounded font-semibold"
          >
            Sign In
          </button>
        </form>
        <p className="text-sm mt-4 text-center text-gray-400">
  Don’t have an account? <Link to="/register" className="text-purple-400 hover:underline">Register</Link>
</p>
      </div>
    </div>
  );
}4444444444 


export default Login;