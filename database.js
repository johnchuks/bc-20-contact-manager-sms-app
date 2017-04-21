


// Import Admin SDK
var firebase = require("firebase");

var config = {

	apiKey: "AIzaSyDjkHwlxEhXgZDEOWsAJ3-cAYiuNnQbcU4",
    authDomain: "project-66bb8.firebaseapp.com",
    databaseURL: "https://project-66bb8.firebaseio.com",
    projectId: "project-66bb8",
    storageBucket: "project-66bb8.appspot.com",
    messagingSenderId: "111694782091"
}
     
firebase.initializeApp(config);

// Get a database reference to the contact manager

var firebaseRef = firebase.database();

var ref = firebaseRef.ref().child('users');


// Add contact to the contact list

function addContact(firstName, lastName, mobileNumber)  {

   if (typeof(mobileNumber) === 'number') {
  
      var number = (''+mobileNumber).split('');

      //console.log(number);
  
      if (number.length === 13) { // check for the length of phone number

      	var contact = ref.push({

		first:firstName,
		last:lastName,
		mobileNumber:'+'+mobileNumber
	});
    
       // console.log(mobileNumber);
  }
    else if (number.length !== 13) {
    
     console.log('Invalid mobile number: Please input a valid mobile phone number');
  }


 }

 }
//addContact('James', 'khan', 2348076868926);

// search for contact using the first name and last name


//var refName = firebaseRef.ref('first');

var refName = firebaseRef.ref('/contacts/');

var keys;

var obj;

refName.on('value', function(data){

	obj = data.val();

    keys = Object.keys(obj);

   //console.log();

   getContacts(keys);

});

var contactList;

var user;



function getContacts(keys) {

	contactList = [];

	user = {

		first:'',

		last:'',

		mobileNumber:''

	};

	for (var i = 0; i < keys.length; i++) {

		var k = keys[i];

		if(obj[k].first && obj[k].last && obj[k].mobileNumber) {

			user.first = obj[k].first;

			user.last = obj[k].last;

			user.mobileNumber = obj[k].mobileNumber;

			contactList.push(user);

			user = {};

		}

	}
	//console.log(contactList);

	searchContact(contactList);

	return contactList;

	

}

function searchContact(contacts) {

    var newArray =[];

   var searchTerm ='Andela';

    for (var i = 0; i < contacts.length; i++) {

    	if (contacts[i].last === searchTerm) {

    		return newArray.push(contacts[i]);


    	}
    	 else if (contacts[0].last.indexOf(searchTerm) === -1) {

    	 	console.log('No search results');
    	 }
    }

    var count = 1;


    console.log(newArray);

    var newStr = 'which ';

    var  ifTrue = true;





    if (newArray.length > 1) { 

       for (j = 0; j < newArray.length; j++) {

        var key = newArray[j];

    		last = key.last;

    	   first = key.first;

    	   if (ifTrue === true) {

    	   	    newStr += last+ '?  [' +(count++)+'] '+ first;

    	       ifTrue = false;

    	   }
    	   
    	   else {

    	   	 newStr += ' ['+(count++)+'] '+ first;

    	   }
    	   



    	   //console.log(first);

    	  // console.log('which '+last+ '? [' +(count++)+ '] '+first);
    	}

    	console.log(newStr);
    }

	//console.log(newArray);


	//console.log(contacts);
	/*

	var newArray = [];

	var dupArray = contacts.slice();

	//console.log(dupArray);

	var count = 0;

	for (i = 0; i < contacts.length; i++) {

	    if (contacts[i].last === contacts[i+1].last) {

				//newArray.push(contacts[i].first);

				//newArray.push(contacts[i+1].first);

				console.log('which '+contacts[i].last+ '? ['+(count++)+'] '+contacts[i].first+ ',['+(count++)+'] '+contacts[i+1].first);

			count++;
		}
     
   }
   */


}

//module.exports.addContact= addContact; 