import React from "react";
import type { DeleteAccountModalProps } from "./delete-account-model.types";

const DeleteAccountModal: React.FC<DeleteAccountModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900 border border-slate-700/50 rounded-xl max-w-md w-full p-5">
        <h3 className="text-lg font-semibold mb-2.5 text-white">
          Delete Account?
        </h3>
        <p className="text-gray-400 text-xs mb-5">
          This action cannot be undone. All your interview data, settings, and
          progress will be permanently deleted.
        </p>
        <div className="flex gap-2.5">
          <button
            onClick={onClose}
            className="flex-1 bg-slate-800 hover:bg-slate-700 text-white font-medium px-4 py-2 rounded-lg transition-colors text-sm"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded-lg transition-colors text-sm"
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccountModal;
