import React from "react";
import type { DeleteAccountModalProps } from "./delete-account-model.types";
import { useTranslation } from "react-i18next";

const DeleteAccountModal: React.FC<DeleteAccountModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  const { t } = useTranslation();

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900 border border-slate-700/50 rounded-xl max-w-md w-full p-5">
        <h3 className="text-lg font-semibold mb-2.5 text-white">
          {t("deleteModal.title")}
        </h3>
        <p className="text-gray-400 text-xs mb-5">
          {t("deleteModal.description")}
        </p>
        <div className="flex gap-2.5">
          <button
            onClick={onClose}
            className="flex-1 bg-slate-800 hover:bg-slate-700 text-white font-medium px-4 py-2 rounded-lg transition-colors text-sm"
          >
            {t("deleteModal.cancel")}
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded-lg transition-colors text-sm"
          >
            {t("deleteModal.confirm")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccountModal;
