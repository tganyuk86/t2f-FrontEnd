var toggleMap = {
  init: function() {
		 $('[data-target="map-view"]').click(function() {
		    var target = $(this).closest('[data-target="map"]');
		    var text =  $(this).find('span');
		    target.toggleClass('is-active');
		    if (target.hasClass('is-active')) {
		      text.text($(this).data('hide'));
		    } else {
		      text.text($(this).data('open'));
		    }
		   
		  });
  }
};

module.exports = toggleMap;
