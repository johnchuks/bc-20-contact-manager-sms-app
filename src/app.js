
'use strict'

var vorpal = require('vorpal')();

console.log('WELCOME TO CONTACT MANAGER\n\n');
console.log('To add or search contacts enter `--help` for more information');

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
    .option('-s --searchName <name>', 'Add search term')
    //.option('--firstName <name>', 'Search for contact with first name')
    .action(function(args, callback) {

      function retrieveData() {

         app.getData().then(function(result) {

          var searchTerm = args.options.searchName;

          var newArray =[];

          var number ;

          //console.log(result);

       for (var i = 0; i < result.length; i++) {

          if (result[i].last === searchTerm) {

             newArray.push(result[i]);
      }
      
    }
    var count = 1;   
    var newStr = 'which ';
      var  ifTrue = true;
      if (newArray.length === 1) {

      number = newArray[0].mobileNumber;
      console.log(number);
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

  vorpal

    .command('continue')
    .option(' -y --name <name>', 'enter first name')
    .action(function (args, callback){
      var firstName = args.options.y;
      var tempArr = [];
      var newNumber;

      for (var k = 0; k < newArray.length; k++) {
        var key = newArray[k];
         if (newArray[k].first === firstName) {
          tempArr.push(newArray[k]);      
      }

      }

      newNumber = tempArr[0].mobileNumber;
      console.log(newNumber);
      callback();

    });


  }

      
          
       });
         
     }
    retrieveData();

   
    callback();
    });


vorpal
   .delimiter('app$')
   .show();


