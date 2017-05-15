window.ljs = {
	eventList: {}
};

ljs.addConfig = function(configName, config) {
	if (ljs.config === undefined) {
		ljs.config = {};
	}
	ljs.config[configName] = config;
}

ljs.getConfig = function(configName) {
	if (ljs.config === undefined) {
		return undefined;
	} else {
		return ljs.config[configName];
	}
}

ljs.on = function(eventName, callBack) {
	if (this.eventList[eventName] === undefined) {
		this.eventList[eventName] = [];
	}
	this.eventList[eventName].push(callBack);
}

ljs.trigger = function(eventName, params) {
	if (this.eventList[eventName] === undefined) {
		return;
	}
	var i;
	for (i in this.eventList[eventName]) {
		var callBack = this.eventList[eventName][i];
		setTimeout(callBack, 0, params);
	}
}