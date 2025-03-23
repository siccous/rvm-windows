#!/usr/bin/env node

var RvmCliUse = require('./_use');

class RvmCliDefault {
    static runDefault() {
        const self = RvmCliDefault;
        RvmCliUse.runUse("default");
    }
}

module.exports = RvmCliDefault;


