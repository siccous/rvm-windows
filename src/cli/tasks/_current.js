#!/usr/bin/env node

var RvmCliTools = require('./../_tools');

class RvmCliCurrent {
    static runCurrent() {
        const self = RvmCliCurrent;
        console.log(RvmCliTools.getCurrentVersion());
    }
}

module.exports = RvmCliCurrent;


