import { google } from 'googleapis';

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;

const oAuth2Client = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
);

const getAuthUrl = () => {
  const scopes = ['https://www.googleapis.com/auth/spreadsheets'];
  return oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
  });
};

const getAuthenticatedClient = async (code) => {
  const { tokens } = await oAuth2Client.getToken(code);
  oAuth2Client.setCredentials(tokens);
  return oAuth2Client;
};

export { getAuthUrl, getAuthenticatedClient, oAuth2Client };