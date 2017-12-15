"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chalk = require('chalk');
var logSymbols = require('log-symbols');
var plur = require('plur');
var slength = require('string-length');
var table = require('text-table');
exports.name = 'table-stylish';
function report(results) {
    var ret = '';
    var errors = new Array();
    results.map(function (err) {
        var file = err.file;
        var grouped = errors.filter(function (v) { return v && v.name === err.file; });
        var group = null;
        if (grouped.length === 1) {
            group = grouped[0];
            if (group.errors && group.errors.length > 0)
                group.errors.push(err);
            else
                group.errors = [err];
        }
        else {
            group = {
                name: file,
                errors: [err]
            };
            errors.push(group);
        }
    });
    if (errors.length > 0) {
        ret += '\n';
        errors.forEach(function (err) {
            var errorCount = 0;
            var warningCount = 0;
            ret +=
                chalk.underline(err.name) + "\n" +
                    table(err.errors
                        .map(function (e) {
                        var isError = e.severity && e.severity === 'error';
                        var line = [
                            '',
                            chalk.gray('line ') + chalk.white("" + e.line),
                            chalk.gray('col ') + chalk.white("" + e.column),
                            //chalk.gray(`col ${e.column}`),
                            isError ? chalk.red(e.message) : chalk.yellow(e.message),
                            chalk.gray('lint ') + chalk.green("(" + e.linter + ")")
                        ];
                        //if (e.source)
                        //    line.push(chalk.gray(' source ') + chalk.white(e.source));
                        if (isError) {
                            errorCount++;
                        }
                        else {
                            warningCount++;
                        }
                        return line;
                    }), { stringLength: slength })
                        .split('\n')
                        .join('\n') + '\n\n';
            if (errorCount > 0) {
                ret += " " + logSymbols.error + " " + errorCount + " " + plur('error', errorCount);
                ret += (warningCount > 0) ? '\n' : '';
            }
            if (warningCount > 0)
                ret += " " + logSymbols.warning + " " + warningCount + " " + plur('warning', warningCount);
            ret += '\n\n';
        });
    }
    else {
        ret += " " + logSymbols.success + " No problems";
        ret = "" + ret.trim();
    }
    console.log(ret);
}
exports.report = report;
