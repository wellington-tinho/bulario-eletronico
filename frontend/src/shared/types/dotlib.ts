export interface IMedicationData {
  id: string;
  name: string;
  published_at: string;
  company: string;
  documents: IDocument[];
  active_principles: IActivePrinciple[];
}

interface IDocument {
  id: string;
  expedient: string;
  type: 'PROFESSIONAL' | 'PATIENT';
  url: string;
}

interface IActivePrinciple {
  id: string;
  name: string;
}


