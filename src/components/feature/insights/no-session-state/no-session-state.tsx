import { ClipboardList } from "lucide-react";
import { useTranslation } from "react-i18next";

const NoSessionState = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-full bg-[#0a0a0f] text-white flex items-center justify-center p-8">
      <div className="text-center max-w-sm">
        <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
          <ClipboardList className="w-8 h-8 text-gray-500" />
        </div>

        <h2 className="text-lg font-semibold mb-2">
          {t("session.noSessionTitle")}
        </h2>

        <p className="text-gray-400 text-sm">{t("session.noSessionDesc")}</p>
      </div>
    </div>
  );
};

export default NoSessionState;
