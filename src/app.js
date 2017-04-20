
'use strict'

var vorpal = require('vorpal')();

var app = require('./database.js');

vorpal 

   .command('add', 'adds contact')
   .option('-n --name <name>', 'Add full name')
   .option('-p <phonenumber>', 'Add phone number')
   .action(function(args, callback) {
     
   	  var name = args.options.name;
   	  var fullname = name.split('');
      var firstname = fullname[0];
      var lastname = fullname[1];
      var phoneNumber = args.options.phonenumber;

      console.log(app);

   	  if (fullname.length > 1) {

        if(app.addContact(firstname, lastname, phoneNumber)=== true) {

          this.log('contact added successfully');
        }
        else {
          this.log('Invalid contact Input');
        }
   	  }	
      callback();
   });

//vorpal 
  
  //.command('search <name> Enter search property')
  //.action()


   //.option('-n', '<name>');

   //.option('-p', '<phonenumber>');

  // .command('search', 'searches through the contact list for a contact');

   //.command('text', 'sends text to a number');


vorpal
   .delimiter('$')
   .show();


