export type TLeftSideProps = {
  companyName: string;
  setCompanyName: (name: string) => void;
  jobDescription: string;
  setJobDescription: (description: string) => void;
  selectedTone: string;
  setSelectedTone: (tone: string) => void;
  isGenerating: boolean;
  handleGenerate: () => void;
};
