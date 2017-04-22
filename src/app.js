'use strict'

 var vorpal = require('vorpal')();

 var Jusibe = require('jusibe');
 var jusibe = new Jusibe('b7917e41ca7e2bd0e423bf7a607ac89c', '2a2af2d2baad0e707294600ab2bd9331')

 console.log('WELCOME TO CONTACT MANAGER\n\n');
 console.log('To add contacts to CONTACT MANAGER enter `add --help` and enter `search --help` for more information on how to do a contact search');

 var app = require('./database.js');

 vorpal

   .command('add', 'Add contact to your list using `add -n <name> -p <number>`')
   .option('-n --name <name>', 'Add full name')
   .option('-p --num <phoneNumber>', 'Add phone number e.g. 08076******')
   .action(function(args, callback) {

     var new_name = args.options.name;
     var fullName = new_name.split(' ');
     var first_name = fullName[0];
     var last_name = fullName[1];
     var num = args.options.num.toString();
     var splitNumber;
     splitNumber = ('' + num).split('');
     splitNumber.unshift(0);

     var newNum = splitNumber.join('');

     if (typeof(newNum) !== 'number' && splitNumber.length !== 11) {
      console.log('invalid input');
     } else {


     function checkDatabase() {

       app.getData().then(function(data) {

         for (var i = 0; i < data.length; i++) {

           if (data[i].first === first_name && data[i].last === last_name) {

             console.log('The contact already exist');
             break;
           } else {

             app.addContact(first_name, last_name, newNum);

             console.log('contact added successfully');
             break;
           }

         }
       });
     }
     checkDatabase();
   }

     callback();
   });

 vorpal

   .command('search <name>', 'Search through your contact list with `search <name>`')
   .option('searchName', 'Add search term')
   .action(function(args, callback) {

     function retrieveData() { // promise function retrieves data from the database

       app.getData().then(function(result) { // call the get data function 

         var searchTerm = args.name;

         var fetchUsers = [];

         var number;

         var selectName;

         // compare the data in the database with searchTerm

         for (var i = 0; i < result.length; i++) {
           if (result[i].last === searchTerm) {
             fetchUsers.push(result[i], result[i].first);
           } else if (result[i].first === searchTerm) {
             fetchUsers.push(result[i], result[i].last);
           }

         }
         var count = 1;
         var userPrompt = 'Which ';
         var ifTrue = true;
         var newFetch;
         newFetch = fetchUsers.filter(function(val) {
           return typeof(val) === 'object';
         });
         //sliceUser = fetchUsers.slice(0,1);
         if (newFetch.length === 1) {

           number = newFetch[0].mobileNumber;

           console.log('The mobile number for ' + searchTerm + ' :' + number + '\n\n');
         } else if (newFetch.length > 1) {
           //console.log(newFetch);

           var key, last, first;

           // Get the first and last names of the fetched users

           for (var j = 0; j < newFetch.length; j++) {

             key = newFetch[j];

             last = key.last;

             first = key.first;

             if (searchTerm === first) {
               if (ifTrue === true) {

                 userPrompt += searchTerm + '? [' + (count++) + '] ' + last + ' ';

                 ifTrue = false;

               } else {

                 userPrompt += '[' + (count++) + '] ' + last + ' ';

               }
             } else if (last === searchTerm) {
               if (ifTrue === true) {

                 userPrompt += searchTerm + '? [' + (count++) + '] ' + first + ' ';

                 ifTrue = false;

               } else {

                 userPrompt += '[' + (count++) + '] ' + first + ' ';

               }

             }

           }
           console.log(userPrompt);

           console.log('\n\nUse `fetch <name>` to select from the above contact option \n');

           // call the command if the last name is more than one in the database
           vorpal

             .command('fetch <name>')
             .option('newSearch', 'enter first name')
             .action(function(args, callback) {
               selectName = args.name;
               var tempDatabase = [];
               var newNumber;

               for (var k = 0; k < newFetch.length; k++) {

                 if (newFetch[k].first === selectName) {
                   tempDatabase.push(newFetch[k].mobileNumber);
                 } else if (newFetch[k].last === selectName) {
                   tempDatabase.push(newFetch[k].mobileNumber);
                 }

               }

               number = tempDatabase[0];

               console.log('The mobile number for ' + selectName + ' : ' + number + '\n\n');
               console.log('To text '+selectName+ ', use `text <name> -m <message>`');
               callback();

             });

         }


         // send a text message to the search user using jusbile API

         vorpal
           .command('text <name>', ' Send SMS text to a contact using `text <name> -m <message>')
           .option('-m --txtsms <message>', 'Send an SMS message')
           .action(function(args, callback) {

             var textMessage = args.options.txtsms;

             var payLoad = {

               to: number,
               from: 'Johnbosco',
               message: textMessage

             };
             jusibe.sendSMS(payLoad, function(err, res) {

               if (res.statusCode === 200)

                 console.log(res.body);
               else
                 console.log(err);
             });

             callback();
           });

       });

     }
     retrieveData();

     callback();
   });

 vorpal
   .delimiter('app$')
   .show();