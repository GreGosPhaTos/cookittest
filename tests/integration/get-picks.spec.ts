import axios from 'axios';

describe('GET /picks', () => {
  describe('200 OK', () => {
    it('Should return 200 Ok response', async () => {
      const res = await axios.get('http://127.0.0.1:8080/picks');
      expect(res.status).toStrictEqual(200);
      expect(res.data).toStrictEqual({
        picks: [],
        'out-of-stock': [],
      });
    });

    /**
     * Next tests are testing the output
     * Obviously if the volume change in the response,
     * they are not relevant anymore.
     * Just used to test the logic
     */
    const expectedPicks = [
      ['A1', 'A2', 'C2', 'C3'],  ['A4', 'C4', 'B1', 'C1','C2']
    ];
    const expectedOutOfStock = [['A3'], ['B2']];
    const given = ['123,124,125','126,127,128',];

    given.forEach((parameters, index) => {
      it(`Should return 200 Ok with ${expectedPicks[index]} given ${parameters}`, async () => {
        const res = await axios.get(`http://127.0.0.1:8080/picks?items=${parameters}`);
        expect(res.status).toStrictEqual(200);
        expect(res.data.picks.sort()).toStrictEqual(expectedPicks[index].sort());
        expect(res.data['out-of-stock'].sort()).toStrictEqual(expectedOutOfStock[index].sort());
      });
    });

  });
});
