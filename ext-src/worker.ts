// @ts-ignore
import * as solc from "solc";
import * as path from "path";
import * as fs from "fs";
import axios from "axios";
import { runTestSources } from 'remix-tests';
// @ts-ignore
import Web3 = require('web3');

import { RemixURLResolver } from "remix-url-resolver";

function handleLocal(pathString: string, filePath: any) {
  // if no relative/absolute path given then search in node_modules folder
  if (
    pathString &&
    pathString.indexOf(".") !== 0 &&
    pathString.indexOf("/") !== 0
  ) {
    // return handleNodeModulesImport(pathString, filePath, pathString)
    return;
  } else {
    const o = { encoding: "UTF-8" };
    const p = pathString
      ? path.resolve(pathString, filePath)
      : path.resolve(pathString, filePath);
    const content = fs.readFileSync(p, o);
    return content;
  }
}

function findImports(path: any) {
  // TODO: We need current solc file path here for relative local import
  // @ts-ignore
  process.send({ processMessage: "importing files..." });
  const FSHandler = [
    {
      type: "local",
      match: (url: string) => {
        return /(^(?!(?:http:\/\/)|(?:https:\/\/)?(?:www.)?(?:github.com)))(^\/*[\w+-_/]*\/)*?(\w+\.sol)/g.exec(
          url
        );
      },
      handle: (match: Array<string>) => {
        return handleLocal(match[2], match[3]);
      }
    }
  ];
  // @ts-ignore
  const urlResolver = new RemixURLResolver();
  urlResolver
    .resolve(path, FSHandler)
    .then((data: any) => {
      // @ts-ignore
      process.send({ data, path });
    })
    .catch((e: Error) => {
      // console.log(e);
      throw e;
    });
}

function _testCallback(result: any) {
  try {
      // @ts-ignore
      process.send({ _testCallback: '_testCallback', result });
  } catch (e) {
      // @ts-ignore
      process.send({ error: e });
  }
}
function _resultsCallback(e: Error, result: any) {
  if(e) {
      // @ts-ignore
      process.send({ error: e });
  }
  // @ts-ignore
  process.send({ _resultsCallback: '_resultsCallback', result });
}
function _finalCallback(e: Error, result: any) {
  if(e) {
      // @ts-ignore
      process.send({ error: e });
  }
  // @ts-ignore
  process.send({ _finalCallback: '_finalCallback', result });
  // @ts-ignore
  process.exit(0);
}
function _importFileCb(fn: string) {
  if(fn) {
      // @ts-ignore
      process.send({ import: fn });
  }
}

process.on("message", async m => {
  if (m.command === "compile") {
    const input = m.payload;
    if(m.version === 'latest') {
      try {
        const output = await solc.compile(JSON.stringify(input), findImports);
        // @ts-ignore
        process.send({ compiled: output });
      } catch (e) {
        // @ts-ignore
        process.send({ error: e });
      }
    }
    solc.loadRemoteVersion(m.version, async (err: Error, newSolc: any) => {
      if(err) {
        // @ts-ignore
        process.send({ error: e });
      } else {
        try {
          const output = await newSolc.compile(
            JSON.stringify(input),
            findImports
          );
          // @ts-ignore
          process.send({ compiled: output });
        } catch (e) {
          // @ts-ignore
          process.send({ error: e });
        }
      }
    });
  }
  if(m.command === "fetch_compiler_verison") {
    axios
      .get("https://ethereum.github.io/solc-bin/bin/list.json")
      .then((res: any) => {
        // @ts-ignore
        process.send({ versions: res.data });
      })
      .catch((e: Error) => {
        // @ts-ignore
        process.send({ error: e });
      });
  }
  if(m.command === "run-test") {
    // @ts-ignore
    process.send({ test: 'testing...' });
    // TODO: move parsing to extension.ts
    const sources = JSON.parse(m.payload);
    const web3 = new Web3();
    web3.setProvider(new Web3.providers.HttpProvider('http://127.0.0.1:8545'))
    runTestSources(sources, _testCallback, _resultsCallback, _finalCallback, _importFileCb, null);
  }
});
