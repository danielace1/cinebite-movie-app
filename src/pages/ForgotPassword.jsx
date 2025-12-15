import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, ArrowRight } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const { sendResetEmail } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await sendResetEmail(email);
      setSent(true);
      toast.success("Password reset link sent!");
    } catch (error) {
      toast.error(error.message || "Failed to send reset email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-slate-900 to-black px-4">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-slate-900/70 backdrop-blur-xl p-6 sm:p-8 text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Forgot Password</h2>

        <p className="text-sm text-gray-400 mb-6">
          Enter your email to receive a password reset link
        </p>

        {sent ? (
          <p className="text-green-400 text-sm">
            Check your email for the reset link.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-black/40 px-3 py-2">
              <Mail className="w-5 h-5 text-gray-400" />
              <input
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent text-white outline-none text-sm"
              />
            </div>

            <button
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gray-700 py-2.5 font-semibold text-white hover:bg-gray-600 transition disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Reset Link"}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        <p className="mt-6 text-sm text-gray-400">
          Remembered your password?{" "}
          <Link to="/login" className="text-gray-300 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
