var selects = {
  init: function() {
    var self = this;
    var formSelects = $('[data-target="js-select"]');
    formSelects.each(function() {
      self.initCustomSelect($(this));
    });
    $(document).click(function(event) {
      if (!$(event.target).closest('[ data-target="js-select"]').length) {
        $('[ data-target="js-select"]')
          .find('[data-target="js-select-holder"]')
          .removeClass('is-open')
          .parent()
          .removeClass('is-open');
      }
    });


    var selects = $('[data-select]');
    selects.each(function() {
      if ($(this).closest('[data-target="pop-up-templates"]').length) {
        return;
      }
      self.generateSelect($(this));
    });
  }, 
  initCustomSelect: function(elem) {
    var holder = elem.find('[data-target="js-select-holder"]');
    holder.scrollbar();

    elem.find('[data-target="js-select-toggle"]').click(function(event) {
      event.preventDefault();
      holder.toggleClass('is-open').parent().toggleClass('is-open');   
    });

    elem.find('[data-target="js-select-option"]').click(function(event) {
      event.preventDefault();
      var selected = $(this).closest('[data-target="js-select"]').find('[data-target="js-select-toggle"]');
      selected
        .find('[data-target="js-select-selected-image"]')
        .css('background-image', $(this).find('[data-target="js-select-image"]').css('background-image'));
      selected
        .find('[data-target="js-select-selected-text"]')
        .text($(this).find('[data-target="js-select-text"]').text());   

      holder.removeClass('is-open')
        .parent().removeClass('is-open');
    });
    
  },
  generateSelect: function(elem) {
    var self = this;
    var name = elem.data('select-name');
    var value = elem.data('select-value');
    var multiple = elem.data('select-multiple');
    
    var select = $('<select class="generated-select" name="' + name + '" ></select>');
    if (multiple) {
      select.prop('multiple', true);
    }

    var options = elem.find('[data-select-option="' + name +'"]');
    var selectAll =  elem.find('[data-select-all="' + name +'"]');

    options.each(function() {
      if($(this).data('select-option-type') === 'remove') {
        return;
      }
      //check for selected value...
      var selected = '';
      if(value == $(this).data('select-option-value'))
        selected = 'selected=""';
      select.append('<option value="'+ $(this).data('select-option-value') +'" '+selected+'></option>');
    });

    select.insertAfter(elem);

    options.each(function() {
      self.enableSelectOption($(this), multiple);
    });

    selectAll.click(function() {
      if ($(this).hasClass('is-selected')) {
        select.find('option').each(function() {
          $(this).attr('selected', 'selected');
        });
      } else {
        select.find('option').each(function() {
          $(this).removeAttr('selected');
        });
      }
    });

  },
  enableSelectOption: function(elem, multiple) {
    elem.click(function() {
      var parent = $(this).closest('[data-select]');
      var select = parent.next();
      var options = select.find('option');
      var targetOption = select.find('[value="' + $(this).data('select-option-value') + '"]');
      switch ($(this).data('select-option-type')) {
        case 'toggle':
          if (multiple) {
            if (targetOption.attr('selected')) {
              targetOption.removeAttr('selected');
            } else {
              targetOption.attr('selected', 'selected');
            }
          }
          break;
        case 'add':          
          if (!multiple) {
            options.removeAttr('selected');
          }         
          targetOption.attr('selected', 'selected');
          break;
        case 'remove':         
          targetOption.removeAttr('selected');
          break;
        default:
          return;
      }
    });
  },
};


module.exports = selects;
