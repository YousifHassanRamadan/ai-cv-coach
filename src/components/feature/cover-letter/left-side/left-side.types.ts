export type TLeftSideProps = {
  jobTitle: string;
  setJobTitle: (name: string) => void;
  jobDescription: string;
  setJobDescription: (description: string) => void;
  selectedTone: string;
  setSelectedTone: (tone: string) => void;
  isGenerating: boolean;
  handleGenerate: () => void;
  selectedRole: string;
  setSelectedRole: (roleId: string) => void;
};
