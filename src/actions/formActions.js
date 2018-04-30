const bluzelle = require('bluzelle');

import {
  SAVE_TRANSCRIPT,
  TRANSCRIPT_VERIFIED,
  TRANSCRIPT_REJECTED
} from './types';
const UUID = 'verif-id-1234567890';

export const submitTranscriptForVerification = transcript => async dispatch => {
  try {
     const key = `${transcript.schoolName}${transcript.studentNumber}`
     bluzelle.connect('ws://13.78.131.140:51010', UUID); //8100
     await bluzelle.create(key, transcript);

     const result = await bluzelle.read(key);

     dispatch({ type: SAVE_TRANSCRIPT, payload: result });

  } catch(err) { console.log('error happened uploading to bluezelle', err)}

}

export const verifiTranscript = transcript => async dispatch => {
  try {
    const key = `${transcript.schoolName}${transcript.studentNumber}`

    transcript.verified = true;

    bluzelle.connect('ws://13.78.131.140:51010', UUID); //8100

    await bluzelle.update(key, transcript);
    const result = await bluzelle.read(key);

    dispatch({ type: TRANSCRIPT_VERIFIED });
  } catch(err) {
    console.log('error verifying transcript', err);
  }

}

export const rejectTranscript = transcript => async dispatch => {
  try {
    const key = `${transcript.schoolName}${transcript.studentNumber}`
    transcript.rejected = true;

    bluzelle.connect('ws://13.78.131.140:51010', UUID); //8100

    await bluzelle.update(key, transcript);
    const result = await bluzelle.read(key);

    dispatch({ type: TRANSCRIPT_REJECTED });
  } catch(err) {
    console.log('error verifying transcript', err);
  }

}
