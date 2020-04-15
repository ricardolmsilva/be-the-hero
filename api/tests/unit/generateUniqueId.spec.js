const generateUniqueID = require('../../utils/generateUniqueID');

describe('Generate Unique ID', () => {
  it('Should generate a unique ID', () => {
    const id = generateUniqueID();
    expect(id).toHaveLength(8);
  });
});
