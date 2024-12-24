import { APP_LINK, MAIL_ID } from '../../config/serverConfig.js';

export const workspaceJoinMail = function (workspace) {
  return {
    from: MAIL_ID,
    subject: 'You have been added to a workspace',
    text: `Congratulations! You have been added to a workspace ${workspace.name}`
  };
};

export const forgetPasswordMail = function (token) {
  return {
    from: MAIL_ID,
    subject: 'Reset Password For Your Message Slack App',
    html: `<h1>Reset Your Password </h1>
    <p>Click on the following link to reset your password:</p>
    <a href="http://localhost:5173/auth/reset-password/${token}">http://localhost:5173/auth/reset-password/${token}</a>
    <p>The link will expire in 10 minutes.</p>
    <p>If you didn't request a password reset, please ignore this email.</p>`
  };
};

export const verifyEmailMail = function (verificationToken) {
  return {
    from: MAIL_ID,
    subject: 'Welcome to the app . Please verify your email',
    text: `
     Welcome to the app. Please verify your email by clicking on the link below:
     ${APP_LINK}/verify/${verificationToken}
    `
  };
};
