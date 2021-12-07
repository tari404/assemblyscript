import assert from "assert";
import { Transform } from "../../dist/transform.js";

var afterParseCalled = false;
var afterInitializeCalled = false;
var afterCompileCalled = false;

export default class MyTransform extends Transform {
  constructor() {
    super();
    check(this);
    this.log("Transform loaded");
  }
  async afterParse() {
    check(this);
    assert(!afterParseCalled && !afterInitializeCalled && !afterCompileCalled);
    afterParseCalled = true;
    this.log("- afterParse");
    await defer();
    await defer();
    await defer();
    this.log("  complete");
    assert(afterParseCalled && !afterInitializeCalled && !afterCompileCalled);
  }
  afterInitialize() {
    check(this);
    assert(afterParseCalled && !afterInitializeCalled && !afterCompileCalled);
    afterInitializeCalled = true;
    this.log("- afterInitialize");
    assert(afterParseCalled && afterInitializeCalled && !afterCompileCalled);
    return defer();
  }
  afterCompile() {
    check(this);
    assert(afterParseCalled && afterInitializeCalled && !afterCompileCalled);
    afterCompileCalled = true;
    this.log("- afterCompile");
  }
}

function check(transform) {
  assert(typeof transform.program === "object" && transform.program !== null);
  assert(typeof transform.baseDir === "string");
  assert(typeof transform.stdout === "object" && transform.stdout !== null);
  assert(typeof transform.stderr === "object" && transform.stderr !== null);
  assert(typeof transform.log === "function");
  assert(typeof transform.readFile === "function");
  assert(typeof transform.writeFile === "function");
  assert(typeof transform.listFiles === "function");
}

function defer() {
  return new Promise((resolve, reject) => {
    console.log("  defer");
    setTimeout(() => { console.log("  resolve"); resolve(); }, 100);
  });
}
