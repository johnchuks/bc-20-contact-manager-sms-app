
var vorpal = require('vorpal')();

var app = require('./database.js');

vorpal 

   .command('add -n <name> -p <phonenumber> adds contact')
   .option('-n, --name Add full name')
   .option('-p, Add phone number')
   .action(function(args, callback) {

   	  var name = arg.name;
   	  var fullname = name.split(' ');

   	  if (fullname.length > 0) {

   	  	app.addContact(fullname[0], fullname[1], phoneNumber);

   	  	console.log('contact added successfully');

   	  }
   	  else {

   	  	console.log('Invalid contact Input');
   	  }

   	  callback();

   });

vorpal 
  
  .command('search <name> Enter search property')
  //.action()


   //.option('-n', '<name>');

   //.option('-p', '<phonenumber>');

  // .command('search', 'searches through the contact list for a contact');

   //.command('text', 'sends text to a number');


vorpal
   .delimiter('$')
   .show();


