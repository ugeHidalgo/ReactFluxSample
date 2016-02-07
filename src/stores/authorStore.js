'use strict';

var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../constants/actionTypes');
var EventEmitter = require('events').EventEmitter; //notifies react that a store has change.
var assign = require('object-assign');
var _ = require('lodash');

var CHANGE_EVENT = 'change';

//Variable privada que contendrá los autores. Solo este store la usará.
var _authors = [];

//Esto es como hacer que el objeto último, se mezcle con Event.Emitter, o como hacer
//que EventEmitter sea la base class del objeto definido en el tercer parámetro.
//Para esto sirve object-assign, fusiona dos elementos en uno.
var AuthorStore = assign({}, EventEmitter.prototype, {
	//Aquí se definen las siguientes tres funciones:
	addChangeListener: function(callback){
		//Sirve para que el componente react sepa cuando el store ha cambiado
		this.on(CHANGE_EVENT,callback);
	},

	removeChangeListener: function(callback) {
		//Hace que el componente react deje de ser notificado cuando un store cambió.
		this.removeListener(CHANGE_EVENT,callback);
	},

	emitChange: function() {
		this.emit(CHANGE_EVENT);
	},

	//Resto de lógica necesaria para el store
	getAllAuthors: function() {
		return _authors;
	},

	getAuthorById: function(id) {
		//usamos lodash.js (hay que referenciarlo) para buscar y devolver un
		//elemento en un array
debugger;
		return _.find(_authors, {id: id});
	}
});

/*Esto es para registrar el store en el dispatcher para que este(store) sea notificado
  cuando una acción ocurre.
  La función se llama cada vez que una acción cualquiera sea despachada. Así que cada
  store registrado en el dispatcher va a recibir la función, por eso se necesita el
  switch que distingue que acción se lanzó.
  Como todos los stores reciben la acción necesitamos un switch para identificar si la
  action que llega es de este store
 */
 Dispatcher.register(function(action) {
 	switch (action.actionType){
 		case ActionTypes.CREATE_AUTHOR :
 			//Si la acción es de este store y es create cogemos el author que viene en
 			//lel payload de la acción y lo metemos detro del array.
 			_authors.push(action.author);
 			//Una vez procesado se emite el cambio para que así todo comoponente react
 			//registrado con el store se entere del cambio.
 			//Para volcar los datos en la pantalla vamos a manageAuthorPage.js
 			AuthorStore.emitChange();
 		break;

 		case ActionTypes.UPDATE_AUTHOR :
 			var existingAuthor = _.find(_authors, {id: action.author.id});
 			var existingAuthorIndex = _.indexOf(_authors, existingAuthor);
 			_authors.splice(existingAuthorIndex,1, action.author);
 			AuthorStore.emitChange();
 		break;

 		case ActionTypes.DELETE_AUTHOR :
debugger; //PASO 3 El store discrimina que la actio es para el y emite el cambio
 			_.remove(_authors,function(author){
 				return action.id===author.id;
 			});
 			AuthorStore.emitChange();
 		break;

 		case ActionTypes.INITIALIZE :
 			_authors = action.initialData.authors;
 			AuthorStore.emitChange();
 		break;

 		default:
 			//Nothing to do here.
 	}
 });


 module.exports = AuthorStore;
