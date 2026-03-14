export interface WeightProfileProperty {
  label: string;
  value: number;
  color: string;
}

export interface WeightProfile {
  id: string;
  label: string;
  description: string;
  technical: number;
  behavioral: number;
  situational: number;
  tag: string;
}

export interface WeightProfilesCardProps {
  profile: WeightProfile;
  selectedWeightProfile: string;
  setSelectedWeightProfile: (id: string) => void;
}
