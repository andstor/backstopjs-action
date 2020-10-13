const core = require('@actions/core');
const fs = require('fs');
const util = require('util');

async function getConfigObject(filePath) {
    let data;
    const readFile = util.promisify(fs.readFile);
    let fileContents = await readFile(filePath, 'utf8');
    try {
        data = JSON.parse(fileContents);

    } catch (error) {
        core.setFailed('Problem reading config file.');
    }
    return data;
}

module.exports = {
    getConfigObject,
};