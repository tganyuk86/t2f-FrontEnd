var formsTable = {
  init: function() {
    var self = this;
    $('[data-target="forms-table"]').each(function() {
      self.initTable($(this));
    });
    $('[data-target="users-view-forms"]').click(function(event) {
      event.preventDefault();
      var target = $(this).closest('[data-target="int-list-item"]');
      var formPanel = target.find('[data-target="int-list-forms"]');
      if (target.hasClass('is-open')) {
        formPanel.slideUp(function() {
          target.removeClass('is-open');
        });
      } else {
        target.addClass('is-open');
        formPanel.slideDown();
      }
    
    });

    
  },
  initTable: function(elem) {
    var self = this;
    var rows = elem.find('[data-target="forms-table-row"]');
    var checkBtns = rows.find('[data-target="input-checkbox"]');
    var selectAllBtn =  elem.find('[data-target="select-row-all"]');

    elem.find('[data-target="table-filter"]').click(function() {
      $(this).toggleClass('is-flipped');
    });

    elem.find('[data-target="expand-row-btn"]').click(function(event) {
      event.preventDefault();
      event.stopPropagation();
      self.toggleHiddenCellsView($(this));
    });
  },
  toggleHiddenCellsView: function(elem) {
    elem.toggleClass('is-active');
    var windowWidth = $(window).width();
    var point;  

    if (windowWidth < 991 && windowWidth > 731) {
      point = 990;
    } else if (windowWidth < 731) {
      point = 730;
    }

    var parentRow = elem.closest('[data-target="forms-table-row"]');

    var cells = parentRow.find('[data-target="hidden-cell"][data-point="' + point + '"]');

    if (elem.hasClass('is-active')) {
      var div = $('<div style="display: none" data-target="slide-down-div"></div>');
      cells.wrap(div);
      cells.css('display', 'flex');
      cells.parent().removeAttr('style').hide().css('width', '100%');
      cells.parent().slideDown(); 

      $(window).on('resize', checkHidddenCells);

      function checkHidddenCells() {
        var startPoint;
        var endPoint;
        if (point === 990) {
          startPoint = 731;
          endPoint = 991;
        } else if (point === 730) {
          startPoint = 0;
          endPoint = 731;
        }
        if(!($(window).width() < endPoint && $(window).width() > startPoint)) {
          cells.removeAttr('style');
          if (cells.closest('[data-target="slide-down-div"]').length) {
            cells.unwrap();
          }
          elem.removeClass('is-active');
          $(window).off('resize', checkHidddenCells);
        } 
      }      
    } else {   
      cells.parent().slideUp(function() {
        cells.removeAttr('style');
        cells.unwrap();
      });
      
    }
  },
};


module.exports = formsTable;
