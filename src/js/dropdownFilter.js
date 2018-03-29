var dropdownFilter = {
  init: function() {
    var self = this;
    var toggleBtns = $('[data-target="filter-toggle-btn"]');
    toggleBtns.click(function(event) {
      event.preventDefault();
      self.initToggleBtn($(this));
    });

    var listItems = $('[data-target="filter-list-item"]');
   

    $(window).resize(function() {
	    if ($(window).width() > 660) {
	      $('[data-target="filter-overlay"]').fadeOut();
	    } else if ($('[data-target="filter-overlay"]').parent().find('[data-target="filter-toggle-btn"]').hasClass('is-active')) {

	      $('[data-target="filter-overlay"]').fadeIn();
	    }
	  });

  },
  initToggleBtn: function(elem) {
    var targetList = elem.parent().find('[data-target="filter-list"]');
    	if (elem.hasClass('is-active')) {
     		elem.parent().find('[data-target="filter-overlay"]').fadeOut();
      		targetList.slideUp(function() {
        		elem.removeClass('is-active');
      		});      
    	} else {
      		elem.addClass('is-active');
      		targetList.slideDown();
      		if ($(window).width() < 660) {
        		elem.parent().find('[data-target="filter-overlay"]').fadeIn();
      		}
    	}
  }
  
};

module.exports = dropdownFilter;
