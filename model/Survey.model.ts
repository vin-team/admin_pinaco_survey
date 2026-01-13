export interface Survey {
  _id: string;
  createdBy: string;
  createdByUser: string;
  surveyData: SurveyData,
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface SurveyData {
  title: string;
  description: string;
  sources: any,
  questions: any[],
}

export function parseSurveyData(data: any): SurveyData {
  return {
    title: data.title,
    description: data.description,
    sources: data.sources,
    questions: data.questions,
  };
}
export function parseSurvey(data: any): Survey {
  return {
    _id: data._id,
    createdBy: data.createdBy,
    createdByUser: data.createdByUser,
    surveyData: parseSurveyData(data.surveyData),
    isActive: data.isActive,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
    __v: data.__v,
  };
}

export function parseSurveys(data: any): Survey[] {
  if (!Array.isArray(data)) return [];
  return data.map(parseSurvey);
}