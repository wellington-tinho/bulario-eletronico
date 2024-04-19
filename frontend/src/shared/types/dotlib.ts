export interface MedicationData {
  id: string;
  name: string;
  published_at: string;
  company: string;
  documents: Document[];
  active_principles: ActivePrinciple[];
}

interface Document {
  id: string;
  expedient: string;
  type: 'PROFESSIONAL' | 'PATIENT';
  url: string;
}

interface ActivePrinciple {
  id: string;
  name: string;
}


