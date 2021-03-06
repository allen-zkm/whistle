var getRules = require('./rules');
var getValues = require('./values');
var util = require('./util');
var config = require('../lib/config');
var properties = require('../lib/properties');

module.exports = function(req, res) {
	
	res.json({
		version: config.version,
		latestVersion: properties.get('latestVersion'),
		server: util.getServerInfo(),
		rules: getRules(),
		values: getValues(),
		hideHttpsConnects: properties.get('hideHttpsConnects'),
		interceptHttpsConnects: properties.get('interceptHttpsConnects'),
		filterText: properties.get('filterText')
	});
};