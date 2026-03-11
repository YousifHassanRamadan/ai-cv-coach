export interface Question {
  id: string;
  text: string;
  difficulty: "easy" | "medium" | "hard";
  category: string;
  keywords: string[];
}

export interface Track {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
}

export interface TrackDetails extends Track {
  questions: Question[];
}
