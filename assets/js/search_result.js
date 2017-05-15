// var searchResultConfig = {
//   resultID: "productPageResult"
// };

ljs.SearchResultModule = {
	configName: "searchResultConfig"
}

ljs.SearchResultModule.init = function() {
	var config = ljs.getConfig(this.configName);
	if (config === undefined) {
		return false;
	}

	var dialog = $('#' + config.resultID);

	ljs.on('SearchResult.show', this.onShowHide(dialog, true));
	ljs.on('SearchResult.hide', this.onShowHide(dialog, false));

	this.registerLinks();
}

ljs.SearchResultModule.registerLinks = function() {
	$("[llink='search']").click(this.onClickSearch());
}

ljs.SearchResultModule.onClickSearch = function() {
	var callback = function(event) {
		ljs.trigger('SearchResult.show');
		return false;
	};
	return callback;
}

ljs.SearchResultModule.onShowHide = function(dialogObj, bShow) {
	var callback = function() {
		if (bShow) {
			dialogObj.modal('show');
		} else {
			dialogObj.modal('hide');
		}
	}
	return callback;
}

ljs.SearchResultModule.init();