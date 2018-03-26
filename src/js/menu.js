
var pageMenu = {
  toggleBtn: $('[data-target="page-menu-toggle"]'),
  menuElems: $('[data-target="responsive-menu-elem"]'),
  accountMenu: $('[data-target="account-menu"]'),
  accountMenuBtn: $('[data-target="account-menu-toggle"]'),
  overlay: $('[data-target="header-overlay"]'),
  accountData: $('[data-target="header-account-data"]'),


  init: function() {
  	var self = this;
    this.toggleBtn.click(function(event) {
    	event.preventDefault();
    	$(this).toggleClass('is-responsive');
    	self.menuElems.toggleClass('is-responsive');
    });

    this.accountMenuBtn.click(function(event) {
      event.preventDefault();
      self.accountMenu.toggleClass('is-open');
      if ($(window).width() < 660) {
      	if (self.accountMenu.hasClass('is-open')) {
      		self.accountData.addClass('is-active');
      		self.overlay.fadeIn();
      	} else {      		
      		self.overlay.fadeOut(function() {
      			self.accountData.removeClass('is-active');
      		});
      	}
      }      
    });
    

    self.overlay.click(function() {
    	self.accountMenu.removeClass('is-open');
    	$(this).fadeOut(function() {
    		self.accountData.removeClass('is-active');
    	});
    });


  	$(window).resize(function() {
  		self.check(self);
  	});


  },

  
  check: function(self) {
  	var pageWidth = $(window).width();
  	if (pageWidth < 660) {
  		if (self.accountMenu.hasClass('is-open')) {
  			self.accountData.addClass('is-active');
      		self.overlay.fadeIn();
  		}
  		return;
  	}

    self.toggleBtn.removeClass('is-responsive');
    self.menuElems.removeClass('is-responsive');
    self.accountData.removeClass('is-active');
    self.overlay.fadeOut();

  }

};

module.exports = pageMenu;
