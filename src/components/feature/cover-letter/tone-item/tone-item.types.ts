export type TToneItemProps = {
  tone: { id: string; label: string; description: string };
  selectedTone: string;
  setSelectedTone: (tone: string) => void;
};
