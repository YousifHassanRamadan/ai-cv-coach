import { useNavigate } from "react-router-dom";
import { useLogout } from "../../../../hooks/useAuth";
import { LogOut } from "lucide-react";

const Logout = () => {
  const navigate = useNavigate();
  const { mutate: logout, isPending } = useLogout(navigate);

  return (
    <div
      className="rounded-xl border border-yellow-500/20 p-6"
      style={{ background: "rgba(234, 179, 8, 0.05)" }}
    >
      <div className="flex items-center gap-2 mb-4">
        <span className="text-yellow-400 text-lg">⚠️</span>
        <h2 className="text-white font-semibold text-base">Session</h2>
      </div>

      <div className="rounded-lg border border-white/10 bg-white/5 px-5 py-4 flex items-center justify-between">
        <div>
          <p className="text-yellow-400 font-medium text-sm">Sign Out</p>
          <p className="text-gray-400 text-sm mt-0.5">
            End your current session and return to the login page
          </p>
        </div>

        <button
          onClick={() => logout()}
          disabled={isPending}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-yellow-600 hover:bg-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-white"
        >
          <LogOut size={15} />
          {isPending ? "Signing out..." : "Sign Out"}
        </button>
      </div>
    </div>
  );
};

export default Logout;
