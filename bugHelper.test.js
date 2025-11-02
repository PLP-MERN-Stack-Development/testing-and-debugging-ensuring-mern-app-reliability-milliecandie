// tests/bugHelper.test.js
// 🧠 Simple unit test for validation helper

function validateBug(bug) {
  if (!bug.title || bug.title.trim() === "") {
    return false;
  }
  return true;
}

test("should return false if title is empty", () => {
  expect(validateBug({ title: "" })).toBe(false);
});

test("should return true for valid title", () => {
  expect(validateBug({ title: "Fix login issue" })).toBe(true);
});