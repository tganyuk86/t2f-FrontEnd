var formsTable = {
  init: function() {
    var self = this;
    window.formsTable = this;
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
    var selectAllBtn =  elem.find('[data-target="select-row-all"]');

    elem.find('[data-target="table-filter"]').click(function() {
      $(this).toggleClass('is-flipped');
      if($(this).hasClass('is-flipped'))
      {
        orderDir = 'asc';
      }else{
        orderDir = 'desc';
      }
      orderBy = $(this).attr('data-col-name');
      updateTable();
    });

    elem.find('[data-target="expand-row-btn"]').click(function(event) {
      event.preventDefault();
      event.stopPropagation();
      self.toggleHiddenCellsView($(this));
    });



    if (elem.closest('[data-target="int-list-forms"]').length) {
      return;
    }

    this.attachRowEvents(elem);
  },
  attachRowEvents: function(elem) {
    var self = this;
    var rows = elem.find('[data-target="forms-table-row"]');
    var selectAllBtn =  elem.find('[data-target="select-row-all"]');

    rows.click(function(event) {
      event.preventDefault();
      if ($(this).hasClass('is-selected')) {
        self.unselectRow($(this));
        self.checkSelectedRows(elem);
      } else {
        self.selectRow($(this));
        self.checkSelectedRows(elem);
      }
      
    });

    selectAllBtn.click(function(event) {
      event.preventDefault();
      $(this).toggleClass('is-selected');
      if ($(this).hasClass('is-selected')) {
        rows.each(function() {
          self.selectRow($(this));
          self.checkSelectedRows(elem);
        });
      } else {
        rows.each(function() {
          self.unselectRow($(this));
          self.checkSelectedRows(elem);
        });
      }
      
    });


    
  },

  selectRow: function(elem) {
    elem.addClass('is-selected');
    elem.find('[data-target="select-row"]').addClass('is-selected');
    elem.attr('data-selected', true);   
  },
  unselectRow: function(elem) {
    elem.removeClass('is-selected');
    elem.find('[data-target="select-row"]').removeClass('is-selected');
    elem.attr('data-selected', false);
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
  checkSelectedRows: function(elem) {
    var targetBtn = elem.closest('[data-target="pop-up-content"]').find('[data-target="pop-up-action"][data-action="send-forms"]');
    if (!targetBtn.length) {      
      targetBtn = $('[data-target="open-pop-up"][data-action="choose-user"]');
    }
    var selectedRows = false;

    elem.find('[data-target="forms-table-row"]').each(function() {
      if ($(this).hasClass('is-selected')) {
        selectedRows = true;
        return false;
      }
    });

    if (selectedRows) {
      targetBtn.prop('disabled', false);
    } else {
      targetBtn.prop('disabled', true);
    }
  }

};


module.exports = formsTable;
