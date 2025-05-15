export interface Course {
    id: number;
    professorId: number;
    name: string;
    description: string;
    domain: string;
    startDate: string;
    endDate: string;
    price: number;
    discount: number;
    availablePlaces: number;
    vacancies: number;
    languages: string[];
  }