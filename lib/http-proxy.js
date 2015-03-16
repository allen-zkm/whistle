var util = require('util');
var commonUtil = require('../util/util');
var agentConfig = {maxSockets: 8};
var httpAgent = new (require('http').Agent)(agentConfig);
var httpsAgent = new (require('https').Agent)(agentConfig);

module.exports = function(req, res, next) {
	var protocol = req.options && req.options.protocol;
	if (!commonUtil.isWebProtocol(protocol)) {
		next();
		return;
	}
	
	var options = util._extend({}, req.options);
	var headers = util._extend({}, req.headers);
	
	headers.host = headers.Host = options.host || headers.hostname;//tencent的服务器不识别小写的host
	options.agent = protocol == 'https:' ? httpsAgent : httpAgent;
	options.rejectUnauthorized = false;
	options.headers = headers;
	options.host = options.hosts[1];
	options.method = req.method;
	options.hostname = null;
	req.request(options);
};