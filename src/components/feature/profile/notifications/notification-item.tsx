import ToggleSwitch from "./toggle-switch";

interface NotificationItemProps {
  title: string;
  description: string;
  enabled: boolean;
  onToggle: () => void;
  showBorder?: boolean;
}

const NotificationItem = ({
  title,
  description,
  enabled,
  onToggle,
  showBorder = true,
}: NotificationItemProps) => {
  return (
    <div
      className={`flex items-center justify-between py-4 ${showBorder ? "border-b border-gray-800" : ""}`}
    >
      <div>
        <div className="font-medium text-white">{title}</div>
        <div className="text-sm text-gray-400 mt-0.5">{description}</div>
      </div>
      <ToggleSwitch enabled={enabled} onToggle={onToggle} />
    </div>
  );
};

export default NotificationItem;
