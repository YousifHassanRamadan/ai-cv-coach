import { TrendingUp } from "lucide-react";

const TopSkills = () => {
  return (
    <div className="bg-bg-card rounded-lg p-6 border border-gray-800">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Top Skills</h2>
        <TrendingUp className="w-5 h-5 text-gray-400" />
      </div>
      <div className="space-y-4">
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm">React</span>
            <span className="text-sm text-indigo-400">95%</span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-2">
            <div
              className="bg-bg-active h-2 rounded-full"
              style={{ width: "95%" }}
            ></div>
          </div>
        </div>
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm">TypeScript</span>
            <span className="text-sm text-indigo-400">88%</span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-2">
            <div
              className="bg-bg-active h-2 rounded-full"
              style={{ width: "88%" }}
            ></div>
          </div>
        </div>
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm">Node.js</span>
            <span className="text-sm text-cyan-400">75%</span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-2">
            <div
              className="bg-cyan-500 h-2 rounded-full"
              style={{ width: "75%" }}
            ></div>
          </div>
        </div>
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm">Leadership</span>
            <span className="text-sm text-cyan-400">70%</span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-2">
            <div
              className="bg-cyan-500 h-2 rounded-full"
              style={{ width: "70%" }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopSkills;
