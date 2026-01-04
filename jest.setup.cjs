const { TextEncoder, TextDecoder } = require('util');


require('@testing-library/jest-dom'); 

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// MOCK FETCH
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ properties: [] }),
  })
);