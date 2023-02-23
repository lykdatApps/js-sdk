const assert = require("assert");
const { initImageSearchUI, extractProduct } = require("./dist/main");

assert.equal(typeof initImageSearchUI, "function");
assert.equal(typeof extractProduct, "function");

console.log("OK!");
