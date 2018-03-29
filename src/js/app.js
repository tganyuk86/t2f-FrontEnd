import 'bootstrap';
import 'jquery.scrollbar';


var app = {
  components: [
    require('./selects'),
    require('./formsTable'),
    require('./menu'),
    require('./scroll'),
    require('./formElements'),    
    require('./popUps'),
    require('./dropdownFilter'),
    require('./toggleMap')
  ],
  init: function() {
    $('a[href="#"]').click(function(event) {
      event.preventDefault();
    });

    this.components.forEach(function(item) {
      item.init();
    });
  }
};

$(function() {
  app.init();  
});
