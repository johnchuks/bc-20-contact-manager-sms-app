
'use strict'
// Import Admin SDK


var firebase = require("firebase");

var config = {
/*
  apiKey: "AIzaSyAIGwC2HCx9cnTHWW_EJxxy9L1qvM3Ub34",
    authDomain: "contact-manager-application.firebaseapp.com",
    databaseURL: "https://contact-manager-application.firebaseio.com",
    projectId: "contact-manager-application",
    storageBucket: "contact-manager-application.appspot.com",
    messagingSenderId: "1056217513705"
    */
    apiKey: "AIzaSyDjkHwlxEhXgZDEOWsAJ3-cAYiuNnQbcU4",
    authDomain: "project-66bb8.firebaseapp.com",
    databaseURL: "https://project-66bb8.firebaseio.com",
    projectId: "project-66bb8",
    storageBucket: "project-66bb8.appspot.com",
    messagingSenderId: "111694782091"

};
     
firebase.initializeApp(config);




// Get a database reference to the contact manager

var firebaseRef = firebase.database();

var ref = firebaseRef.ref().child('contacts');


// Add contact to the contact list

function addContact(firstName, lastName, mobile)  {

  var contact;
  
     // if (number.length === 13) { // check for the length of phone number

      	 contact = ref.push({

		      first:firstName,
		      last:lastName,
		      mobileNumber:mobile
	})

  return true;
     
       // console.log(mobileNumber);
 // }
   // else if (number.length !== 13) {
    
    // console.log('Invalid mobile number: Please input a valid mobile phone number');
  //}


 //}

 }

// search for contact using the first name and last name

var refName = firebaseRef.ref('/contacts/');

var keys;

var obj;

var contactString;

var searchString;

var search;

function getData() {
 
return new Promise(function(resolve, reject){

    refName.once('value').then(function(response) {

          obj = response.val();

          keys = Object.keys(obj);

         contactString = getContacts(keys);

        // search = searchContact(contactString);

        // console.log(search);

          resolve(contactString);

 });
  });

}

getData();

var contactList;

var user;

var newString; 

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
	return contactList;
}


function searchContact(contacts, searchTerm) {

    var newArray =[];

     searchTerm ='andela';

    for (var i = 0; i < contacts.length; i++) {
      if (contacts[i].last === searchTerm) {
        newArray.push(contacts[i]);
      }
    }
    
  return newArray;
}

 module.exports.addContact = addContact;
 module.exports.getData = getData;
 module.exports.searchContact = searchContact;

