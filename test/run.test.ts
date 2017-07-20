import "mocha"
import * as chai from 'chai'
const assert = chai.assert;

import { main } from '../lib/run'
import * as fs from 'fs'
import * as path from 'path'

function args(s?: string): string[] {
    return ['node_path', 'file_path'].concat(s ? s.split(' '): []);
}

suite("Command Line Application", () => {

    test("help", async () => {

        async function testIsHelpMessage(s?: string){
            const result = await main(args(s)) as string;
            assert.match(result, /^usage:.*/);
        }
        
        await testIsHelpMessage();
        await testIsHelpMessage("-h");
        await testIsHelpMessage("--help");
    })

    test("version", async () => {

        async function testIsHelpMessage(s?: string){
            const result = await main(args(s)) as string;
            assert.match(result, /^any-json version \d*\.\d*\.\d*/);
        }
        
        await testIsHelpMessage("--version");
    })

    test("reading JSON", async () => {
        const file = path.join(__dirname, 'fixtures', 'in', 'product-set.json');
        const result = await main(args(file)) as string;
        assert.deepEqual(JSON.parse(result), JSON.parse(fs.readFileSync(file, 'utf8')));
    })
})