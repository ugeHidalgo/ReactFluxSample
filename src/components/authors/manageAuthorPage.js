'use strict';

var React = require('react');
var Router = require('react-router');
var AuthorForm = require ('./authorForm');
//var AuthorApi = require ('../../api/authorApi'); //en su lugar se usa el flux store y
//los dos siguientes requires
var AuthorActions = require ('../../actions/authorActions');
var AuthorStore = require ('../../stores/authorStore');

var toastr = require ('toastr');

var ManageAuthorPage = React.createClass({
	mixins: [
		Router.Navigation
	],

	statics : {

		willTransitionFrom: function(transition, component){
			if (!component.state.dirty) return;
			if (!confirm('You have changes without saving. ' +
						'If you go ahead you will lost this data.\n\n' +
						'Do yo want to continue anyway?')) {
				transition.abort();
			}
		}
	},

	getInitialState: function() {
		return {
			author: { id: '', firstName: '', lastName: '' },
			errors: {},
			dirty : false
		};
	},

	componentWillMount: function() {
		//Set the states before the render occurs.
		var authorId = this.props.params.id; //Taken fro the url params

		//if (authorId){ //Uses the Author API to recover author´s data
		//	this.setState({author: AuthorApi.getAuthorById(authorId)});
		//}

		if (authorId){ //Uses the Author flux store to recover author´s data
			this.setState({author: AuthorStore.getAuthorById(authorId)});
		}
	},

	setAuthorState: function(event) {
	//This function is called every time a key is pressed--->onChange
		var fieldName = event.target.name;
		var valueValue = event.target.value;

		this.state.author[fieldName]=fieldValue;
		this.setState({dirty: true});
		return this.setState( {author: this.state.author});
	},

	authorFormIsValid: function(){
		var formIsValid = true;
		this.state.errors = {}; //Clear errors

		if (this.state.author.firstName.length < 3){
			this.state.errors.firstName = 'First name must be at least 3 characters';
			formIsValid = false;
		}

		if (this.state.author.lastName.length < 3){
			this.state.errors.lastName = 'Last name must be at least 3 characters';
			formIsValid = false;
		}

		this.setState({errors: this.state.errors});
		return formIsValid;
	},

	saveAuthor: function(event){
		event.preventDefault(); //To avoid submit the form when saving

		if(!this.authorFormIsValid()) {
			return;
		}
		//AuthorApi.saveAuthor(this.state.author);
		if (this.state.author.id){
			AuthorActions.updateAuthor(this.state.author);
		} else {
			AuthorActions.createAuthor(this.state.author);
		}
		toastr.success('Author saved !!')
		this.transitionTo('authors'); //Redirige a la pantalla de autores
		this.setState({dirty: false});
	},

	render : function() {
		// -----Called every time a key is pressed
				//also need to be added to the child component y authorForm
		return(
			<AuthorForm author={this.state.author}
				onChange={this.setAuthorState}
				onSave={this.saveAuthor}
				errors={this.state.errors}/>
		);
	}
});

module.exports = ManageAuthorPage;