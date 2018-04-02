var selects = {
  init: function() {
    var self = this;
    var formSelects = $('[data-target="js-select"]');
    var checkBoxGroups = $('[data-target="checkbox-group"]');

    checkBoxGroups.each(function() {
      if ($(this).closest('[data-target="pop-up-templates"]').length) {
        return;
      }
      self.initCheckboxGroup($(this));
    });
  },
  initCheckboxGroup: function(checkboxGroup) {
    var self = this;
    var checkboxes = checkboxGroup.find('[data-target="input-checkbox"]');
    var checkAllBtn = $('[data-target="check-all"][data-related="' + checkboxGroup.data('target-name') + '"]');
    var relatedBtn = $('button[data-related-fields="' + checkboxGroup.data('target-name') + '"]');
    var cancelCheckBtns = checkboxGroup.find('[data-target="cancel-check"]');
    var selectDropdowns = checkboxGroup.find('[data-target="select-dropdown"]');


    checkboxes.each(function() {
      self.initCheckbox($(this), checkboxes, checkAllBtn, relatedBtn);
    });

    cancelCheckBtns.each(function() {
      self.initCancelCheckBtn($(this));
    });

    selectDropdowns.each(function() {
      self.initSelectDropdown($(this));
    });

    self.findCheckedCheckboxes(checkboxes, checkAllBtn, relatedBtn);
    self.initCheckAllBtn(checkAllBtn, checkboxGroup);
  },
  initCheckAllBtn: function(checkAllBtn, checkboxGroup) {
    var self = this;
    var checkboxes = checkboxGroup.find('[data-target="input-checkbox"]');
    checkAllBtn.click(function(event) {
      event.preventDefault();
      if ($(this).data('checked') === false) {
        $(this).data('checked', true);
        $(this).addClass('is-selected');
      } else {
        $(this).data('checked', false);
        $(this).removeClass('is-selected');
      }
      self.checkCheckAllBtn(checkAllBtn, checkboxes);      
    });
  },
  checkCheckAllBtn: function(checkAllBtn, checkboxes) {
    var checked = checkAllBtn.data('checked');   
    if (checked) {
      checkboxes.prop('checked', true);      
    } else {
      checkboxes.prop('checked', false);
    }
    checkboxes.change();
  },
  initCheckbox: function(checkbox, checkboxes, checkAllBtn, relatedBtn) {
    var self = this;
    var target = checkbox.closest('[data-checkbox-anchor]');
    self.checkCheckbox(checkbox, target);
    self.findCheckedCheckboxes(checkboxes, checkAllBtn, relatedBtn);
    checkbox.change(function() {
      self.checkCheckbox(checkbox, target);
      self.findCheckedCheckboxes(checkboxes, checkAllBtn, relatedBtn);
    });
  },
  checkCheckbox: function(checkbox, target) {
    var selectType = target.data('select-type');
    var checked = checkbox.prop('checked');
    var selectParent = target.closest('[data-target="checkbox-group"]');
    var checkboxes = selectParent.find('[data-target="input-checkbox"]');
    var selectType = selectParent.data('select-type');
    if (selectType === 'single') {
      checkboxes.each(function() {
        $(this).prop('checked', false);
        $(this).closest('[data-checkbox-anchor]')
          .removeClass('is-selected')
          .find('[data-target="select-row"]').removeClass('is-selected');
      });
    }
    if (checked) {
      checkbox.prop('checked', true);
      target.addClass('is-selected');
      target.find('[data-target="select-row"]').addClass('is-selected');
    } else {
      checkbox.prop('checked', false);
      target.removeClass('is-selected');
      target.find('[data-target="select-row"]').removeClass('is-selected');
    }
  },
  findCheckedCheckboxes: function(checkboxes, checkAllBtn, relatedBtn) {
    var selected = false;
    var selectedAll = true;
    checkboxes.each(function() {
      if ($(this).prop('checked')) {
        selected = true;
      } else {
        selectedAll = false;
      }
      if (selected && !$(this).prop('checked')) {
        selectedAll = false;
        return false;
      }
    });
    if (checkAllBtn) {
      if (selectedAll) {
        checkAllBtn.data('checked', true);
        checkAllBtn.addClass('is-selected');
      } else {
        checkAllBtn.data('checked', false);
        checkAllBtn.removeClass('is-selected');
      }   
    }
    if (relatedBtn) {
      if (selected) {
        relatedBtn.prop('disabled', false);
      } else {
        relatedBtn.prop('disabled', true);
      }
    }
    
  },
  initCancelCheckBtn: function(btn) {
    var checkboxGroup = btn.closest('[data-target="checkbox-group"]');
    btn.click(function() {
      var target = checkboxGroup.find('[data-target="input-checkbox"][value="' + btn.data('value') + '"]');
      target.prop('checked', false);
      target.change();
     
    });
  },
  initSelectDropdown: function(dropdown) {
    var holder = dropdown.find('[data-target="select-holder"]');
    var list = dropdown.find('[data-target="select-list"]');
    var selectToggle = dropdown.find('[data-target="select-toggle"]');
    var selectedValue = dropdown.find('[data-target="selected-value"]');
    holder.scrollbar();

    var initiallySelected = null;
    list.find('[data-target="input-checkbox"]').each(function() {
      if ($(this).attr('checked')) {

        initiallySelected = $(this);
        return false;
      }
    });



    if (!initiallySelected) {
      initiallySelected = $(list.find('[data-target="input-checkbox"]')[0]);

    }

    initiallySelected.prop('checked', true);

    selectedValue.html(initiallySelected.closest('[data-target="option-value"]').html());

    selectedValue.find('.label-checkbox').remove();



    selectToggle.click(function(event) {
      event.preventDefault();
      holder.toggleClass('is-open').parent().toggleClass('is-open');   
    });

    list.find('[data-target="input-checkbox"]').click(function() {     
      var selectedHTML = $(this).closest('[data-target="option-value"]').html();
      selectedValue.html(selectedHTML);
      selectedValue.find('.label-checkbox').remove();      
      holder.removeClass('is-open')
        .parent().removeClass('is-open');
    });
    
  },
 

};


module.exports = selects;
