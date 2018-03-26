var scroll = {
  pageScroll: $('[data-target="interface-page"]'),
  init: function() {
  	var self = this;
  	if (!this.pageScroll.length) {
  		return;
  	}
  	this.check(this);
  	$(window).resize(function() {
  		self.check(self);
  	});
  },
  check: function(self) {
  	if ($(window).width() > 1366) {
  		self.pageScroll.scrollbar();
  	} else {
  		self.pageScroll.scrollbar('destroy');
  	}
  }

};

module.exports = scroll;
