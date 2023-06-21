import { Product } from "./product";

describe("Product", () => {
  it("should create an instance", () => {
    expect(
      new Product("a", "a", "a", 100, "a", true, 1, new Date(), new Date())
    ).toBeTruthy();
  });
});
