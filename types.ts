
export interface LoveLetterConfig {
  recipientName: string;
  relationshipType: string;
  tone: 'romantic' | 'funny' | 'poetic';
}

export enum AppState {
  ASKING = 'ASKING',
  ACCEPTED = 'ACCEPTED',
  GENERATING_LETTER = 'GENERATING_LETTER'
}
