export interface GridDataType {
  title: string;
  authors: Array<string>;
  publicationDate: Date;
  relatedtopics: Array<string>;
}

export interface SummariesDataType {
  "Research Problem and Objectives": string;
  Methodology: string;
  Results: string;
  "Conclusion and Implications": string;
}

export interface RecommendationDataType {
  "Related Papers": Array<GridDataType>;
  "Potential Fields": Array<string>;
}
