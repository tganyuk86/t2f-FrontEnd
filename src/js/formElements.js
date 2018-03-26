

var formElems = {
  inputs: $('input'),  
  init: function() {
  	var self = this;
  	this.inputs.each(function() {
  		self.initInput($(this));

  	});


  	$('[data-target="signup-option"]').click(function() {
  		$('[data-target="signup-option"]').removeClass('is-active');
  		$(this).addClass('is-active');

  		$(this).closest('[data-target="form"]')
  		.find('[type="submit"]')
  		.val($(this).data('value'))
  		.prop('disabled', false);
  	});
  },
  initInput: function(elem) {
  	var self = this; 	
  	if (elem.prop('type') !== 'search') {
  		this.initPlaceholder(elem);
  	}

    if (elem.prop('type') === 'search') {
      this.initSearchInput(elem);
    }
    elem.focus(function() {
      $(this).parent().find('.input-error-message').removeClass('is-active');
      $(this).removeClass('is-error');
    });


    if (elem.hasClass('is-error')) {
      elem.parent().find('.input-error-message').addClass('is-active');
    }

    // this.checkRequiredFields(elem);
    // elem.on('input', function() {
    //   self.checkRequiredFields($(this), self.checkErrorFields($(this)));      
    // });

  },
  initPlaceholder: function(elem) {
  	var self = this;
  	var text = elem.prop('placeholder');
	  if (!text) {
	    return;
	 }
    this.checkPlaceholder(elem, text);
    elem.on('input', function() {
      self.checkPlaceholder($(this), text);
    });

  },
  checkPlaceholder: function(elem, text) {
  	var upperPlaceholder = elem.parent().find('.input-placeholder');
  	if (upperPlaceholder.length) {
    	if (!elem.prop('value')) {
      	upperPlaceholder.remove();
    	}   
 	 } else {
 	 	if (elem.prop('value')) {
 	 		elem.parent().append('<span class="input-placeholder">' + text + '</span>');
 	 	}    	
  	}
  },
  initSearchInput: function(elem) {
  	if (elem.data('target') !== 'input-search-field') {
  		return;
  	}
    var target = elem.parent();
    var icon = target.find('[data-target="input-search-icon"]');

  	elem.on('click focus', function(event) {
  		target.addClass('is-active');
  	});

  	elem.on('blur', function(event) {
  		target.removeClass('is-active');
      setTimeout(function() {
        icon.data('is-focused', false);
      },500);
     
  	});

    // elem.on('keypress', function(event) {
    //   if (event.which === 13) {
    //     //..do search
    //     target.removeClass('is-active');
    //     $(this).blur();
    //   }
    // });

    elem.on('keyup', runSearch);

    target.click(function() {
      target.addClass('is-active');
      
    });
    icon.click(function(event) {
      event.stopPropagation();
      if (!$(this).data('is-focused')) {
        elem.focus();
        $(this).data('is-focused', true);
      } else {
        elem.blur();
        $(this).data('is-focused', false);
      }
    });
  },
  checkRequiredFields: function(elem, noErrors) {
    var targetForm = elem.closest('[data-target="form"]');
    var submitBtn = targetForm.find('[type="submit"]');
    var emptyFields = false;
    var errorFields = false;
    targetForm.find('[required]').each(function() {
      if ($(this).prop('type') === 'password') {
        if (!$(this).val()) {
          var style = window.getComputedStyle($(this)[0]);
          if (style.content !== '"' + String.fromCharCode(0xFEFF) + '"') {
            emptyFields = true;
            submitBtn.prop('disabled', true);
            return false;
          } else {
            var text = $(this).prop('placeholder');
            if (!text) {
              return;
            }
            $(this).parent().append('<span class="input-placeholder">' + text + '</span>');
          }
        }
      } 
      if (('' === $(this).prop('value')) && ($(this).prop('type') !== 'password')) {
        emptyFields = true;
        submitBtn.prop('disabled', true);
        return false;
      }       
    });
    if (!emptyFields && noErrors) {  
      submitBtn.prop('disabled', false);
      return true;
    }
  },
  checkErrorFields: function(elem) {
    var targetForm = elem.closest('[data-target="form"]');
    var submitBtn = targetForm.find('[type="submit"]');
    var errorFields = false;

    targetForm.find('input').each(function() {
      if ($(this).hasClass('is-error')) {
        errorFields = true;
        submitBtn.prop('disabled', true);
        return false;
      }

    });
    if (!errorFields) {     
      submitBtn.prop('disabled', false);
      return true;
    }
  }

};

module.exports = formElems;




