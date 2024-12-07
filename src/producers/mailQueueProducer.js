import '../processors/mailProcessor.js';

import mailQueue from '../queues/mailQueue.js';

export const addEmailToMailQueue = async (emailData) => {
  try {
    await mailQueue.add(emailData);

    console.log('Email added to the queue');
  } catch (error) {
    console.log('Error in adding data in the queue', error);
  }
};
