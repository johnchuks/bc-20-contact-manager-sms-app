
'use strict'

var vorpal = require('vorpal')();

var app = require('./database.js');

vorpal 

   .command('add', 'adds contact')
   .option('-n --name <name>', 'Add full name')
   .option('-p --num <phoneNumber>', 'Add phone number e.g. 08076******')
   .action(function(args, callback) {
     
   	  var new_name = args.options.name;
   	  var fullname = new_name.split(' ');
      var firstname = fullname[0];
      var lastname = fullname[1];
      var num = args.options.num;

      this.log(args);

       	  if (fullname.length > 1) {

        if(app.addContact(firstname, lastname, num)=== true) {

          this.log('contact added successfully');
        }
        else {
          this.log('Invalid contact Input');
        }
   	  }	
      callback();
   });

vorpal 
  
  .command('search', 'Enter search property')
    //.option('-n --name <name>', 'Add search term')
    .action(function(args, callback) {

      function retrieveData() {
         app.getData().then(function(result) {

          console.log(result);
       });
     }
      retrieveData();


    callback();
    });


vorpal
   .delimiter('$')
   .show();


