export const STATES = {
  STARTED: 'STARTED',
  SELECTING: 'SELECTING',
  CYCLING: 'CYCLING',
  SHOWRESULT: 'SHOWRESULT',
  ENDED: 'ENDED',
};

export interface Model {
  state: {
    currentResultIndex: number;
    currentUserSelectedIndex: number;
    currentState: string;
    timeRemaining: number;
    score: number;
  };
  ui: {
    roundResult: string;
  };
  settings: {
    colours: number[];
  };
}
