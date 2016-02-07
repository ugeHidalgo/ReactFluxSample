/*
	Single place to see all the posible actions in the app
*/
'use strict';


//Constructs an enumeration with keys equal to their value.
var keyMirror = require('../../node_modules/react/lib/keyMirror')

module.exports = keyMirror({
	CREATE_AUTHOR: null, //value = key thanks to keyMirror.
	UPDATE_AUTHOR: null,
	DELETE_AUTHOR: null,

	CREATE_COURSE: null,
	UPDATE_COURSE: null,
	DELETE_COURSE: null,

	INITIALIZE: null
});