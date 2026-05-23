import { useNavigate } from "react-router-dom";
import { useLogout } from "../../../../hooks/useAuth";
import { LogOut } from "lucide-react";
import { useTranslation } from "react-i18next";

const Logout = () => {
  const navigate = useNavigate();
  const { mutate: logout, isPending } = useLogout(navigate);

  const { t } = useTranslation();

  return (
    <div className="rounded-xl border border-border-light bg-bg-subcard p-6">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-yellow-400 text-lg">⚠️</span>
        <h2 className="text-text-primary font-semibold text-base">
          {t("logout.session")}
        </h2>
      </div>

      <div className="rounded-lg border border-white/10 bg-white/5 px-5 py-4 flex items-center justify-between sm:flex-row flex-col gap-4">
        <div>
          <p className="text-yellow-400 font-medium text-sm">
            {t("logout.title")}
          </p>
          <p className="text-gray-400 text-sm mt-0.5">
            {t("logout.description")}
          </p>
        </div>

        <button
          onClick={() => {
            localStorage.clear();
            logout(undefined, {
              onSuccess: () => {
                localStorage.clear();
              },
            });
          }}
          disabled={isPending}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-yellow-600 hover:bg-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-white"
        >
          <LogOut size={15} />
          {isPending ? t("logout.loading") : t("logout.button")}
        </button>
      </div>
    </div>
  );
};

export default Logout;
