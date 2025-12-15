import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, ArrowRight, Eye, EyeOff } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { updatePassword } = useAuthStore();
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);
      await updatePassword(password);
      toast.success("Password updated successfully!");
      navigate("/login");
    } catch (error) {
      toast.error(error.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-slate-900 to-black px-4">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-slate-900/70 backdrop-blur-xl p-6 sm:p-8 animate-fade-in">
        <h2 className="text-2xl font-bold text-white text-center mb-6">
          Reset Password
        </h2>

        <form onSubmit={handleReset} className="space-y-5">
          <div>
            <label className="text-sm text-gray-400">New Password</label>

            <div className="mt-1 flex items-center gap-2 rounded-xl border border-white/10 bg-black/40 px-3 py-2 focus-within:border-primary-col1 transition">
              <Lock className="w-5 h-5 text-gray-400 shrink-0" />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Minimum 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent text-white outline-none text-sm px-2"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-400 hover:text-white transition"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          <button
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gray-700 py-2.5 font-semibold text-white shadow-lg hover:bg-gray-600 hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Updating..." : "Update Password"}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
