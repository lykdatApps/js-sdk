const assert = require("assert");
const { initImageSearchUI } = require("./dist/main");

assert.equal(typeof initImageSearchUI, "function");

console.log("OK!");
