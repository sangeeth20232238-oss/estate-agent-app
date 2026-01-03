const { TextEncoder, TextDecoder } = require('util');

// --- THIS IS THE MISSING LINE THAT FIXES THE "NOT A FUNCTION" ERROR ---
require('@testing-library/jest-dom'); 

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// MOCK FETCH
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ properties: [] }),
  })
);