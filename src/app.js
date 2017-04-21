'use strict'

var vorpal = require('vorpal')();

var Jusibe = require('jusibe');
var jusibe = new Jusibe('b7917e41ca7e2bd0e423bf7a607ac89c', '2a2af2d2baad0e707294600ab2bd9331')

console.log('WELCOME TO CONTACT MANAGER\n\n');
console.log('To add contacts to CONTACT MANAGER enter `add --help` and enter `search --help` for more information on how to do a contact search');

var app = require('./database.js');

vorpal

  .command('add', 'adds contact')
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

    callback();
  });

vorpal

  .command('search <name>', 'Enter search property')
  .option('searchName', 'Add search term')
  .action(function(args, callback) {

    function retrieveData() { // promise function retrieves data from the database

      app.getData().then(function(result) { // call the get data function 

        var searchTerm = args.name;

        var fetchUsers = [];

        var number;

        var firstName;

        // compare the data in the database with searchTerm

        for (var i = 0; i < result.length; i++) { 

          if (result[i].last === searchTerm) {

            fetchUsers.push(result[i]);
            
          }

        }
        var count = 1;
        var userPrompt = 'Which ';
        var ifTrue = true;
        if (fetchUsers.length === 1) {

          number = fetchUsers[0].mobileNumber;

          
       
        console.log('Name: ' +fetchUsers[0].first+ ' '+fetchUsers[0].last+ ' Mobile number:'+number+ '\n\n');
        } else if (fetchUsers.length > 1) {

          var key, last, first;

          // Get the first and last names of the fetched users

          for (var j = 0; j < fetchUsers.length; j++) {

            key = fetchUsers[j];

            last = key.last;

            first = key.first;



            if (ifTrue === true) {

              userPrompt += last + '? [' + (count++) + '] ' + first + ' ';

              ifTrue = false;

            } else {

              userPrompt += '[' + (count++) + '] ' + first + ' ';

            }

          }
          console.log(userPrompt);

          console.log('\n\nUse `fetch <name>` to select from the above contact list \n');
         
         // call the command if the last name is more than one in the database
          vorpal

            .command('fetch <name>')
            .option('newSearch', 'enter first name')
            .action(function(args, callback) {
              firstName = args.name;
              var tempDatabase = [];
              var newNumber;

              for (var k = 0; k < fetchUsers.length; k++) {

                if (fetchUsers[k].first === firstName) {
                  tempDatabase.push(fetchUsers[k]);
                }

              }
              
               number = tempDatabase[0].mobileNumber;

              console.log('Name:' +tempDatabase[0].first+ ' ' +tempDatabase[0].last+ 'Mobile Number: '+number+ '\n\n');
              callback();

            });

        }

        // send a text message to the search user using jusbile API

        vorpal
          .command('text <name>', ' Send SMS text to contact')
          .option('-m --txtsms <message>', 'Send an SMS message')
          .action(function(args, callback) {

            var textMessage = args.options.txtsms;

            var payLoad = {

              to: number,
              from: 'Johnbosco',
              message: textMessage

            };
            console.log(args);

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