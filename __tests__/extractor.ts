import extractor from "../src/utils/extractor";

describe("Extractor", () => {
  it("should get command and args with the correct prefix", () => {
    const result = extractor("!", "!play some thing");
    expect(result.args).toStrictEqual(["some", "thing"]);
    expect(result.command).toBe("play");
  });

  it("should get null if not have a expected prefix", () => {
    const result = extractor("!", "@play some thing");
    expect(result).toBe(null);
  });
});
