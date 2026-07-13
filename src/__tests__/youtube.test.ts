import { describe, it, expect } from "vitest";
import { createYouTubeSearchUrl } from "../utils/youtube";

describe("createYouTubeSearchUrl", () => {
  it("returns a YouTube search URL", () => {
    const url = createYouTubeSearchUrl("Chicken Tikka Masala");
    expect(url).toContain("https://www.youtube.com/results?search_query=");
  });

  it("encodes the recipe title and appends 'recipe'", () => {
    const url = createYouTubeSearchUrl("Chicken Tikka Masala");
    expect(url).toBe(
      "https://www.youtube.com/results?search_query=Chicken%20Tikka%20Masala%20recipe"
    );
  });

  it("encodes special characters in title", () => {
    const url = createYouTubeSearchUrl("Mac & Cheese");
    expect(url).toContain(encodeURIComponent("Mac & Cheese recipe"));
  });

  it("handles empty string gracefully", () => {
    const url = createYouTubeSearchUrl("");
    expect(url).toBe(
      "https://www.youtube.com/results?search_query=%20recipe"
    );
  });
});
