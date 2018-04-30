import {
  SAVE_TRANSCRIPT,
  TRANSCRIPT_VERIFIED
} from '../actions/types';

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SAVE_TRANSCRIPT:
      return [action.payload, ...state];

    case TRANSCRIPT_VERIFIED:
      return [...state];

    default: return state;
  }
}
