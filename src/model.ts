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
    nextResultIndex: number;
    currentUserSelectedIndex: number;
    currentState: string;
  };
  settings: {
    colours: number[];
  };
}
