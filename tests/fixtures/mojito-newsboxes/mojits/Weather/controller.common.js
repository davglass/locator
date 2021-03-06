/*
 * Copyright 2013 Yahoo! Inc. All rights reserved.
 * Copyrights licensed under the BSD License.
 * See the accompanying LICENSE.txt file for terms.
 */


/*jslint anon:true, white:true, sloppy:true*/
/*global YUI*/


YUI.add('WeatherController', function (Y, NAME) {

    Y.namespace('mojito.controllers')[NAME] = {

        index: function (ac) {
            var location = 'san francisco, california';

            ac.models.get('YqlWeatherModel').fetch(location, function (error, response) {
                return ac.done(response);
            });
        }
    };

}, '0.0.1', {requires: [
    'mojito',
    'mojito-models-addon',
    'YqlWeatherModel']});
