export default function MessagesSkeleton() {
  const items = [
    { sender: "assistant", width: "w-3/4" },
    { sender: "user", width: "w-1/2" },
    { sender: "assistant", width: "w-5/6" },
    { sender: "assistant", width: "w-2/3" },
    { sender: "user", width: "w-2/5" },
  ];

  return (
    <div className="space-y-5 py-4">
      {items.map((item, i) => (
        <div
          key={i}
          className={`
            "flex gap-3",
            ${item.sender === "user" ? "justify-end" : "justify-start"}
          `}
        >
          {item.sender === "assistant" && (
            <div className="w-7 h-7 rounded-xl bg-bg-tertiary animate-pulse shrink-0 mt-1" />
          )}
          <div
            className={`
              "h-10 rounded-2xl animate-pulse bg-bg-subcard"
              ${item.width}
            `}
            style={{ animationDelay: `${i * 100}ms` }}
          />
          {item.sender === "user" && (
            <div className="w-7 h-7 rounded-xl bg-bg-tertiary animate-pulse shrink-0 mt-1" />
          )}
        </div>
      ))}
    </div>
  );
}
