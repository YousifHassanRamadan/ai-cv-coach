import { ClipboardList } from "lucide-react";

const NoSessionState = () => (
  <div className="min-h-full bg-[#0a0a0f] text-white flex items-center justify-center p-8">
    <div className="text-center max-w-sm">
      <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
        <ClipboardList className="w-8 h-8 text-gray-500" />
      </div>
      <h2 className="text-lg font-semibold mb-2">No Interview Found</h2>
      <p className="text-gray-400 text-sm">
        Complete an interview session first to view your insights and
        performance results here.
      </p>
    </div>
  </div>
);

export default NoSessionState;
