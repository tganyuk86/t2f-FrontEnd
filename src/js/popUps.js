import formsTable from './formsTable';
import formElems from './formElements';
import selectUser from './selectUser';
import selects from './selects';

var popUps = {
  init: function() {
    var self = this;
    var popUp = $('[data-target="page-overlay"]');
    this.initPopUpClose(popUp);
    var popUpBtns =  $('[data-target="open-pop-up"]');
    this.initPopUpOpen(popUpBtns);
  },
  initPopUpOpen: function(elems) {
    var self = this;
    elems.click(function(event) {
      event.preventDefault();
      event.stopPropagation();
      if (!$(this).data('action')) {
        return;
      }
      self.openPopUp($(this));      
    });
  },
  openPopUp: function(elem) {

    var self = this;
    var popUp = $('[data-target="page-overlay"]');
    var popUpBody = popUp.find('[data-target="pop-up-body"]');
    var popUpContent = popUp.find('[data-target="pop-up-content"]');
    var targetContent = $('[data-target-content="' + elem.data('action') + '"]');
    
    popUpContent.removeClass().addClass('page-pop-up__content').empty();
    popUpBody.removeClass().addClass('page-pop-up');
    

    popUpContent.html(targetContent.html());
    popUpBody.addClass('page-pop-up_' + targetContent.data('pop-up-size'));
    popUpContent.addClass('page-pop-up__content_' + targetContent.data('pop-up-size'));
    this.initPopUpContent(popUpContent);


    
    if (elem.data('action') === 'more-info') {

      if ($(window).width() < 650) {
        popUpBody.removeClass().addClass('page-pop-up ');
        popUpContent.removeClass().addClass('page-pop-up__content ');
        popUpContent.html(elem.parent().find('[data-target="int-list-more-info"]').html());
        popUpBody.addClass('page-pop-up_xs');
      } else {
        var target = elem.parent().find('[data-target="int-list-more"]');
        setTimeout(function() {
          if (target.css('opacity') > 0) {
            $(document).one('click', function(event) {
              if (target.css('opacity') > 0) {
                event.preventDefault();
                event.stopPropagation();
                return false;
              }
            });
          }
          
        }, 250);
        
        return;
      }
      
    } 

    var propmtMsg = popUpContent.find('[data-target="pop-up-prompt-msg"]');
    var successMsg = popUpContent.find('[data-target="pop-up-success-msg"]');   
    var actiontBtn = popUpContent.find('[data-target="pop-up-action"]');
    var cancelBtn = popUpContent.find('[data-target="pop-up-cancel"]');

    successMsg.hide();

    actiontBtn.click(function(event) {
      event.preventDefault();
      event.stopPropagation();
      self.doAction(elem, popUpBody, popUpContent);
      if (successMsg.length) {
        propmtMsg.fadeOut(function() {
          successMsg.fadeIn();
        });      
      } else {
        self.closePopUp(popUp);
      }
    });

    cancelBtn.click(function(event) {
      event.preventDefault();
      self.closePopUp(popUp);
    });

    
    $('body, html').css('overflow', 'hidden');
    popUp.fadeIn();
    setTimeout(function() {      
      popUp.css('display', 'flex');
    },0);

  },
  initPopUpClose: function(elem) {
    var self = this;
    elem.click(function(event) {
      if (event.target !== this) {
        return;
      }      
      self.closePopUp(elem);
    });
    elem.find('[data-target="pop-up-close"]').click(function(event) {
      event.preventDefault();
      event.stopPropagation();
      self.closePopUp(elem);
    });
  },
  closePopUp: function(elem) {
    $('body, html').css('overflow', 'auto');
    elem.fadeOut(function() {
      elem.find('[data-target="pop-up-content"]').removeClass().addClass('page-pop-up__content').empty();
      elem.find('[data-target="pop-up-body"]').removeClass().addClass('page-pop-up');

    });
  },
  initPopUpContent: function(elem) {
    var self  = this;
    var table = elem.find('[data-target="forms-table"]');
    if (table.length) {
      formsTable.initTable(table);
    }
    
    elem.find('input').each(function() {
      formElems.initInput($(this));      
    });
    var selectUserBlock = elem.find('[data-target="select-user-block"]');
    if (selectUserBlock.length) {
      this.initSelectUserBlock(elem);
      selectUser.init(elem);
    }

    var innerPopUps = elem.find('[data-target="open-pop-up"]');
    innerPopUps.each(function() {
      self.initPopUpOpen($(this));
    });

    elem.find('[data-target="checkbox-group"]').each(function() {
      selects.initCheckboxGroup($(this));
    });
    
    elem.find('[data-target="table-scroll-area"]').scrollbar();
    elem.find('[data-target="choose-user-scroll-area"]').scrollbar();
    elem.find('[data-target="scrollable"]').scrollbar();
  },
  doAction: function(elem, popUpBody, popUpContent) {
    var self = this;
    var successMsg = popUpBody.find('[data-target="pop-up-success-msg"]');
    switch(elem.data('action')) {
      case 'delete-list-item':
        var targetItem = elem.closest('[data-target="int-list-item"]');
        var targetItemName = targetItem.data('name');
        successMsg.find('[data-target="removed-item-name"]').text(targetItemName);
        targetItem.remove();
        break;
      case 'assign-form':
        if (elem.data('assign-type') === 'single') {
          var targetItem = elem.closest('[data-target="int-list-item"]');
          var targetItemName = targetItem.data('name');
          successMsg.find('[data-target="forms-sent-to"]').text(' to ' + targetItemName);
        } else {
          successMsg.find('[data-target="forms-sent-to"]').text('');
        }
        
      default:
        setTimeout(function() {
          popUpContent.removeClass().addClass('page-pop-up__content page-pop-up__content_resp');
          popUpBody.addClass('response-msg');
        }, 500);
    }
  },
  initSelectUserBlock: function(elem) {
    var next = elem.find('[data-target="select-user-next"]');
    var back = elem.find('[data-target="select-user-previous"]');

    $(window).resize(function() {
      if ($(this).width() > 700) {
        elem.find('[data-target="select-user-next"]').removeAttr('style');
        elem.find('[data-target="hidden-step-2"]').removeAttr('style');
        elem.find('[data-target="users-select-s1"]').removeAttr('style');
        elem.find('[data-target="pop-up-action"]').removeAttr('style');
        elem.find('[data-target="users-select-s2"]').removeAttr('style');
      }
    });

    next.click(function() {
      elem.find('[data-target="users-select-s1"]').fadeOut(function() {
        elem.find('[data-target="select-user-next"]').css('display', 'none');
        elem.find('[data-target="hidden-step-2"]').css('display', 'none');        
        elem.find('[data-target="pop-up-action"]').fadeIn();
        elem.find('[data-target="users-select-s2"]').fadeIn();
      });
    });


    back.click(function() {
      elem.find('[data-target="users-select-s2"]').fadeOut(function() {
        elem.find('[data-target="pop-up-action"]').css('display', 'none');
        elem.find('[data-target="hidden-step-2"]').fadeIn();
        elem.find('[data-target="select-user-next"]').fadeIn();       
        elem.find('[data-target="users-select-s1"]').fadeIn();
      });
    });
  }
};




module.exports = popUps;
