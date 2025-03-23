#!/usr/bin/env node

const File = require('ruby-nice/file');


class RvmCliVersion {
    static runVersion() {
        const self = RvmCliVersion;
        console.log(self.getFullVersion());
    }

    static getVersion() {
        const self = RvmCliVersion;
        const package_json = self.getPackageJson();
        return `${package_json.version}`;
    }

    static getFullVersion() {
        const self = RvmCliVersion;
        const package_json = self.getPackageJson();
        return `${package_json.name} ${package_json.version}`;
    }

    static getPackageJson() {
        return JSON.parse(File.read(__dirname + '/../../../package.json'));
    }
}

module.exports = RvmCliVersion;
