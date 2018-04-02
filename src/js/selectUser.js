import selects from './selects';


var selectUser = {
  init: function(elem) {
    var self = this;
    var users = elem.find('[data-target="select-user"]');
    var currentUsersList = elem.find('[data-target="selected-users-list"]');
    var selectedUserHTML = currentUsersList.html();
    var submitBtn = elem.find('[type="submit"]');
    var next = elem.find('[data-target="select-user-next"]');
    var checkboxes = users.find('[data-target="input-checkbox"]');
    var checkAll = elem.find('[data-target="check-all"]');
    currentUsersList.empty();
    checkAll.click(function() {
      currentUsersList.empty();
    });
    checkboxes.change(function() {
      var target = $(this).closest('[data-target="select-user"]');
      if ($(this).prop('checked')) {
        self.addUser(target, currentUsersList, selectedUserHTML);
      } else {    
        var selected = currentUsersList.find('[data-target="cancel-check"]');
        var that = $(this);
        selected.each(function() {
          if ($(this).data('value') === that.val()) {
            $(this).closest('[data-target="selected-user"]').remove();
          }
        }); 
         
      }
    });
    
    checkboxes.each(function() {
      if ($(this).prop('checked')) {
        self.addUser($(this).closest('[data-target="select-user"]'), currentUsersList, selectedUserHTML); 
      }
    });
   
    

  },
  addUser: function(elem, currentUsersList, selectedUserHTML) {
    currentUsersList.append(selectedUserHTML);
    var currentUser = currentUsersList.find('[data-target="selected-user"]:last-child');
    currentUser.find('[data-target="selected-user-image"]').css('background-image', 'url(' + $(elem).data('image') + ')');
    currentUser.find('[data-target="selected-user-name"]').text($(elem).data('name'));
    var closeBtn = currentUser.find('[data-target="cancel-check"]');
    
    closeBtn.data('value', $(elem).find('[data-target="input-checkbox"]').val());
   
    selects.initCancelCheckBtn(closeBtn);
    closeBtn.click(function() {
      currentUser.remove();
    });
  }

};

module.exports = selectUser;
