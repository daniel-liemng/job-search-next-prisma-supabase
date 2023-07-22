export type Job = {
  id?: string;
  name: string;
  description: string;
  requirement: string;
  location: string;
  salary: string;
  type: string;
  workType: string;
  schedule: string;
  startDate: Date;
  category: string;
  status: string;
  benefit: string;
  categoryId?: string;
};
