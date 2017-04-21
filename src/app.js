
'use strict'

var vorpal = require('vorpal')();

var Jusibe = require('jusibe');
var jusibe = new Jusibe('b7917e41ca7e2bd0e423bf7a607ac89c','2a2af2d2baad0e707294600ab2bd9331')

console.log('WELCOME TO CONTACT MANAGER\n\n');
console.log('To add contacts to CONTACT MANAGER enter `add --help` and enter `search --help` for more information on how to do a contact search');

var app = require('./database.js');

vorpal 

   .command('add', 'adds contact')
   .option('-n --name <name>', 'Add full name')
   .option('-p --num <phoneNumber>', 'Add phone number e.g. 08076******')
   .action(function(args, callback) {
     
   	  var new_name = args.options.name;
   	  var fullname = new_name.split(' ');
      var first_name = fullname[0];
      var last_name = fullname[1];
      var num = args.options.num.toString();
      var newArr;
      newArr = (''+num).split('');
      newArr.unshift(0);

      var newNum = newArr.join('');

      function checkDatabase() {

        app.getData().then(function(data){


          console.log(data);

          for (var i =0; i < data.length; i++) {

             if (data[i].first === first_name && data[i].last === last_name) {

              console.log('The contact already exist');
              break;
             }
             else {

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
    //.option('--firstName <name>', 'Search for contact with first name')
    .action(function(args, callback) {

      function retrieveData() {

        app.getData().then(function(result) {

          var searchTerm = args.name;

          var newArray =[];

          var number ;

          var firstName;

          console.log(args);

          //console.log(result);

       for (var i = 0; i < result.length; i++) {

          if (result[i].last === searchTerm) {

             newArray.push(result[i]);
      }
      
    }
    var count = 1;   
    var newStr = 'Which ';
      var  ifTrue = true;
      if (newArray.length === 1) {

      number = newArray[0].mobileNumber;
      console.log('Name: '+newArray[0].first+ ' '+newArray[0].last+ ' Mobile number: '+number+ '\n\n');
    }
    else if (newArray.length > 1) {

      var key, last, first;

       for (var j = 0; j < newArray.length; j++) {

          key = newArray[j];

          last = key.last;

          first = key.first;

         if (ifTrue === true) {

                newStr += last+ '? [' +(count++)+ '] '+ first+ ' ';
              
             ifTrue = false;

         }
         
         else {

           newStr += '['+(count++)+'] '+ first+ ' ';


         }
        
  }
    console.log(newStr);

    console.log('Use `fetch <name>` to select from the above contact list \n');

  vorpal

    .command('fetch <name>')
    .option('name', 'enter first name')
    .action(function (args, callback){
      firstName = args.name;
      var tempArr = [];
      var newNumber;

      for (var k = 0; k < newArray.length; k++) {
        var key = newArray[k];
         if (newArray[k].first === firstName) {
          tempArr.push(newArray[k]);      
      }

      }

      number = tempArr[0].mobileNumber;
      console.log('Name:'+tempArr[0].first+' '+tempArr[0].last+ ' Mobile Number: '+number+ '\n\n');
      callback();

  });

  }

  vorpal
  .command('text <name>', ' Send SMS text to contact')
  .option('-m --txtsms <message>', 'Send an SMS message')
  .action(function(args, callback){

    var textMessage = args.name;

    var payload = {

      to:number,
      from:'Johnbosco',
      message :textMessage

    };

    jusibe.sendSMS(payload, function(err,res){

      if(res.statusCode === 200) 

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


