#!/usr/bin/env node

const RvmCliTools = require('../cli/_tools');
const RvmCliFix = require('../cli/tasks/_fix');
const {execFileSync} = require("child_process");
const Wrapper = require('../cli/_wrapper');

const cwd = process.argv[2];
const command = process.argv[3].split(".")[0];

const wrapper_path = RvmCliTools.getRvmDataDir() + '/wrapper';

// add path temporary to not pollute the original PATH env
if(RvmCliTools.getCurrentVersion() !== "system") {
    process.env.PATH = `${wrapper_path}/bin;` + process.env.PATH;
}

let version = Wrapper.getRubyVersionForPath(cwd);

// add path to ensure "ruby -S" is working
if(Wrapper.getPathOfMatchingRubyVersion(version)) {
    process.env.RUBYPATH = `${Wrapper.getPathOfMatchingRubyVersion(version)}/bin`;
}

let final_command = "";
if(Wrapper.hasRubyEnvCommand(version, command)) {
    final_command = `${Wrapper.getRubyEnvCommandPath(version, command)}`;
} else if(Wrapper.hasRubyEnvCommand(RvmCliTools.getCurrentVersion(), command)) {
    const current_version = RvmCliTools.getCurrentVersion();
    final_command = `${Wrapper.getRubyEnvCommandPath(current_version, command)}`;
} else {
    console.log(`${command} is not recognized as an internal or external command, operable program or batch file.`);
    process.exit(9009);
}

try {
    let stdout = execFileSync(final_command, process.argv.slice(4), {
        stdio: 'pipe',
        encoding: 'utf8',
    })
    console.log(stdout.trim());
} catch (err) {
    console.log(err.stderr.trim());
    process.exit(err.status);
}

// Refresh wrapper files after installing gems, to ensure new commands are available
if(command === "gem" || command === "bundle") {
    RvmCliFix.fixWrapperFiles();
}
