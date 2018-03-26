import selects from './selects';


var selectUser = {
  init: function(elem) {
    var self = this;
    var users = elem.find('[data-target="select-user"]');
    var selectAll = elem.find('[data-target="select-all-users"]');
    var currentUsersList = elem.find('[data-target="selected-users-list"]');
    var selectedUserHTML = currentUsersList.html();
    var submitBtn = elem.find('[type="submit"]');
    currentUsersList.empty();

    selectAll.click(function() {
      $(this).toggleClass('is-selected');
      if ($(this).hasClass('is-selected')) {
        currentUsersList.empty();
        users.each(function() {
          self.addUser($(this), currentUsersList, selectedUserHTML, submitBtn);
          $(this).addClass('is-selected');
          $(this).find('.select-row-btn').addClass('is-selected');
        });
      } else {
        currentUsersList.empty();
        users.each(function() {      
          $(this).removeClass('is-selected');
          $(this).find('.select-row-btn').removeClass('is-selected');
        });
      }
      self.checkSelectedUsers(elem);
    });


    users.click(function() {
      $(this).toggleClass('is-selected');
      $(this).find('.select-row-btn').toggleClass('is-selected');
      if ($(this).hasClass('is-selected')) {
        self.addUser($(this), currentUsersList, selectedUserHTML, submitBtn);
      } else {     
        currentUsersList.find('[data-target="selected-user"][data-user-id="' + $(this).data('user-id') +'"]').remove();       
      }
      self.checkSelectedUsers(elem);
    });

  },
  checkSelectedUsers: function(elem) {
    var targetBtn =  elem.find('[data-target="select-user-next"]');
    var submitBtn = elem.find('[type="submit"]');
    var selectedUsers = false;
    elem.find('[data-target="select-user"]').each(function() {
      if ($(this).hasClass('is-selected')) {
        selectedUsers = true;
        targetBtn.prop('disabled', false);
        submitBtn.prop('disabled', false);
        return false;
      }
    });
    if (!selectedUsers) {
      targetBtn.prop('disabled', true);
      submitBtn.prop('disabled', true);
    }
  },
  addUser: function(elem, currentUsersList, selectedUserHTML, submitBtn) {
    currentUsersList.append(selectedUserHTML);
    var currentUser = currentUsersList.find('[data-target="selected-user"]:last-child');
    currentUser.attr('data-user-id', $(elem).data('user-id'));


    currentUser.find('[data-target="selected-user-image"]').css('background-image', 'url(' + $(elem).data('image') + ')');
    currentUser.find('[data-target="selected-user-name"]').text($(elem).data('name'));

    var closeBtn = currentUser.find('[data-target="cancel-selection"]');
    closeBtn.attr('data-select-option-value', $(elem).data('select-option-value'));
    selects.enableSelectOption(closeBtn);
    closeBtn.click(function() {
      currentUser.remove();
      elem.removeClass('is-selected');
      elem.find('.select-row-btn').removeClass('is-selected');
      var selectedUsers = currentUsersList.find('[data-target="selected-user"]');
      if (!selectedUsers.length) {
        submitBtn.prop('disabled', true);
      }
    });
  }

};

module.exports = selectUser;
