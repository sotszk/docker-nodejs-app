/* global describe, test, expect */

function addOne(num) {
  return num + 1;
}

describe("source", () => {
  test("数字が1増えていること", () => {
    expect(addOne(20)).toStrictEqual(21);
  });
});
