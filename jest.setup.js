import 'whatwg-fetch';

require('dotenv').config({
  path: './.env.test',
});

jest.mock('./src/helpers/get-env-config', () => ({
  getEnvConfig: () => ({ ...process.env }),
}));
