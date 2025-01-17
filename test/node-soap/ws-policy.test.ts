import test from "tape";
import { existsSync } from "fs";
import { parseAndGenerate } from "../../src";
import { Logger } from "../../src/utils/logger";

const target = "ws-policy";

test(target, async t => {
    Logger.disabled();

    const input = `./test/resources/${target}.wsdl`;
    const outdir = "./test/generated";

    t.test(`${target} - generate wsdl client`, async t => {
        await parseAndGenerate(input, outdir);
        t.end();
    });

    t.test(`${target} - check definitions`, async t => {
        t.equal(existsSync(`${outdir}/wspolicy/definitions/DummyList.ts`), true);
        t.equal(existsSync(`${outdir}/wspolicy/definitions/DummyRequest.ts`), true);
        t.equal(existsSync(`${outdir}/wspolicy/definitions/DummyResponse.ts`), true);
        t.equal(existsSync(`${outdir}/wspolicy/definitions/DummyResult.ts`), true);
        t.end();
    });
});