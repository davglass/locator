/*
 * Copyright (c) 2013, Yahoo! Inc.  All rights reserved.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE.txt file for terms.
 */


/*jslint nomen:true, anon:true, node:true */
"use strict";


var Bundle = require('./bundle');


/**
 * The Locator walks the filesystem and gives semantic meaning to
 * files in the application.
 * @module ModownLocator
 */


/**
 * @class Locator
 * @constructor
 * @param {object} options Options for how the configuration files are located.
 */
function BundleLocator(options) {
    this._options = options || {};
    this._bundles = {};
}


BundleLocator.prototype = {


    /**
     * @method parseBundle
     * @async
     * @param {string} dir The directory for the bundle.
     * @param {object} [options] Options for processing the bundle.
     * @return {Promise} A promise that will be fulfilled with the bundle.
     */
    parseBundle: function(dir, options) {
        var self = this,
            bundle = new Bundle(dir, options);
        return bundle.findResources().then(function(bundle) {
            var todo = [ bundle ],
                work,
                childName;
            for (work = todo.shift; work; work = todo.shift()) {
                self._bundles[work.name] = work;
                if ('object' === typeof work.bundles) {
                    for (childName in work.bundles) {
                        if (work.bundles.hasOwnProperty(childName)) {
                            todo.push(work.bundles[childName]);
                        }
                    }
                }
            }
            return bundle;
        });
    },


    /**
     * Returns the named bundle, no matter how deeply found.
     * @method getBundle
     * @param {string} name The name of the bundle to retrieve.
     * @return {Bundle|undefined} The named bundle, or undefined if not found.
     */
    getBundle: function(name) {
        return this._bundles[name];
    }


};


module.exports = BundleLocator;

