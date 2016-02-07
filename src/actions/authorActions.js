'use strict';

var Dispatcher = require('../dispatcher/appDispatcher');
var AuthorApi = require('../api/authorApi');
var ActionTypes = require ('../constants/actionTypes')

var AuthorActions = {

	createAuthor: function(author){
		var newAuthor = AuthorApi.saveAuthor(author);

		//Hey dispatcher, go tell all stores that a new author has been created
		Dispatcher.dispatch({
			actionType: ActionTypes.CREATE_AUTHOR,
			author: newAuthor
		});
	},

	updateAuthor: function(author){
		var updatedAuthor = AuthorApi.saveAuthor(author);

		Dispatcher.dispatch({
			actionType: ActionTypes.UPDATE_AUTHOR,
			author: updatedAuthor
		});

	},

	deleteAuthor: function(id){
debugger; //PASO 2 La action será eviada al dispatcher que lo transmitirá a los stores
		AuthorApi.deleteAuthor(id);

		Dispatcher.dispatch({
			actionType: ActionTypes.DELETE_AUTHOR,
			id: id
		});

	}
};

module.exports = AuthorActions;