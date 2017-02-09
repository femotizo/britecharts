define(function(require) {
    'use strict';

    var _ = require('underscore'),

        jsonFiveTopics = require('json!../json/lineDataFiveTopics.json'),
        jsonOneSource = require('json!../json/lineDataOneSet.json'),
        jsonDataNDates = require('json!../json/lineDataForNDates.json'),
        jsonMultiMonthValueRange = require('json!../json/multiMonthLineData'),
        jsonHourDateRange = require('json!../json/lineDataOneSetHourly.json'),
        jsonSmallValueRange = require('json!../json/lineDataSmallValueRange');


    function SalesDataBuilder(config) {
        this.Klass = SalesDataBuilder;

        this.config = _.defaults({}, config);

        this.with5Topics = function(){
            var attributes = _.extend({}, this.config, jsonFiveTopics);

            return new this.Klass(attributes);
        };

        this.withOneSource = function() {
            var attributes = _.extend({}, this.config, jsonOneSource);

            return new this.Klass(attributes);
        };

        this.withNDates = function(n) {
            var data = jsonDataNDates,
                attributes;

            if (n) {
                data.data[0].Data = data.data[0].Data.slice(0, n);
                data.dataByDate = data.dataByDate.slice(0, n);
            }

            attributes = _.extend({}, this.config, data);

            return new this.Klass(attributes);
        };

        this.withSmallValueRange = function() {
            var attributes = _.extend({}, this.config, jsonSmallValueRange);

            return new this.Klass(attributes);
        };

        this.withMultiMonthValueRange = function() {
            var attributes = _.extend({}, this.config, jsonMultiMonthValueRange);

            return new this.Klass(attributes);
        };

        this.withHourDateRange = function() {
            var attributes = _.extend({}, this.config, jsonHourDateRange);

            return new this.Klass(attributes);
        };

        /**
         * Sets the path for fetching the data
         * @param  {string} path Desired path for test data
         * @return {SalesDataBuilder}      Builder object
         */
        this.withPath = function(path){
            var attributes = _.extend({}, this.config, {
                jsonURL: path
            });

            return new this.Klass(attributes);
        };

        this.build = function() {
            return this.config;
        };
    }

    return {
        SalesDataBuilder: SalesDataBuilder
    };

});
