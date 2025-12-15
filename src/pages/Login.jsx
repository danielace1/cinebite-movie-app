import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";
import { Mail, Lock, ArrowRight, EyeOff, Eye, Popcorn } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);
      await login(email, password);
      navigate("/");
    } catch (err) {
      if (err.message.includes("Email not confirmed")) {
        setError("Please verify your email before logging in.");
      } else {
        setError(err.message || "An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-black via-slate-900 to-black px-4">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-slate-900/70 backdrop-blur-xl shadow-2xl p-6 sm:p-8 animate-fade-in">
        <div className="mb-6 text-center">
          <div className="flex items-center justify-center">
            <Popcorn className="size-8 mr-1 text-yellow-500" />
            <h1 className="text-4xl font-extrabold tracking-tight text-white">
              Cine<span className="text-gray-400">Bite</span>
            </h1>
          </div>
          <p className="text-xs text-gray-400 mt-1 tracking-wide">
            Movies • TV Shows • Entertainment
          </p>
        </div>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white">Welcome Back</h2>
          <p className="text-sm text-gray-400 mt-1">
            Sign in to continue watching
          </p>
        </div>

        <form className="space-y-2" onSubmit={handleLogin}>
          <div className="space-y-6">
            <div>
              <label className="text-sm text-gray-400">Email</label>
              <div className="mt-1 flex items-center gap-2 rounded-xl border border-white/10 bg-black/40 px-3 py-2 focus-within:border-primary-col1 transition">
                <Mail className="w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  placeholder="you@awesome.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent text-white placeholder-gray-500 outline-none text-sm"
                />
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-400">Password</label>

              <div className="mt-1 flex items-center rounded-xl border border-white/10 bg-black/40 px-4 py-2.5 focus-within:border-primary-col1 transition">
                <Lock className="w-5 h-5 text-gray-400 shrink-0" />

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Minimum 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent text-white placeholder-gray-500 outline-none text-sm px-3"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400 hover:text-white transition"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              className="text-sm text-gray-400 hover:underline transition"
            >
              Forgot password?
            </button>
          </div>

          {error && (
            <p className="mb-4 text-sm text-red-400 text-center">{error}</p>
          )}

          <div>
            <button
              disabled={loading}
              className="w-full mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-gray-700 py-2.5 font-semibold text-white shadow-lg hover:bg-gray-600 hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in..." : "Login"}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>

        <div className="my-6 flex items-center gap-3 text-gray-500 text-xs">
          <div className="h-px flex-1 bg-white/10" />
          OR
          <div className="h-px flex-1 bg-white/10" />
        </div>

        <p className="text-center text-sm text-gray-400">
          New here?{" "}
          <Link to="/signup" className="text-gray-300 hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
