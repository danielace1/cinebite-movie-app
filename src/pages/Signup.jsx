import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, ArrowRight, Eye, EyeOff, Popcorn } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { signup } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    try {
      setLoading(true);
      await signup(email, password);
      setSuccess(true);
    } catch (error) {
      setError(error.message);
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
            Discover • Watch • Enjoy
          </p>
        </div>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white">Create Account</h2>
          <p className="text-sm text-gray-400 mt-1">
            Start your entertainment journey
          </p>
        </div>

        {success ? (
          <div className="text-center space-y-4">
            <div className="mx-auto w-14 h-14 rounded-full bg-green-500/20 flex items-center justify-center">
              <Mail className="w-7 h-7 text-green-400" />
            </div>

            <h3 className="text-xl font-bold text-white">
              Verification Email Sent
            </h3>

            <p className="text-sm text-gray-400 leading-relaxed">
              We’ve sent a confirmation link to
              <br />
              <span className="text-white font-medium">{email}</span>
              <br />
              Please check your inbox and verify your email to continue.
            </p>

            <button
              onClick={() => navigate("/")}
              className="mt-4 w-full rounded-xl bg-gray-700 py-2.5 text-white font-semibold hover:bg-gray-600 transition"
            >
              Go to Login
            </button>

            <p className="text-xs text-gray-500">
              Didn’t receive the email? Check spam or try again later.
            </p>
          </div>
        ) : (
          <form className="space-y-8" onSubmit={handleSignup}>
            <div className="space-y-6 ">
              <div>
                <label className="text-sm text-gray-400">Email</label>
                <div className="mt-1 flex items-center gap-2 rounded-xl border border-white/10 bg-black/40 px-3 py-2 focus-within:border-primary-col1 transition">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    placeholder="you@example.com"
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

            {error && (
              <p className="mb-3 text-sm text-red-400 text-center">{error}</p>
            )}

            <div className="mt-5">
              <button
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gray-700 py-2.5 font-semibold text-white shadow-lg shadow-primary-col1/30 hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Creating account..." : "Create Account"}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {!success && (
          <p className="mt-6 text-center text-sm text-gray-400">
            Already have an account?{" "}
            <Link to="/login" className="text-gray-300 hover:underline">
              Login
            </Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default Signup;
