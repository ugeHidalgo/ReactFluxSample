'use strict';

var React = require ('react');
var Router = require('react-router');
var Link = Router.Link;

//var AuthorApi = require ('../../api/authorApi'); // en su lugar se usa el flux store y
//los dos siguientes requires
var AuthorStore = require ('../../stores/authorStore');
var AuthorActions = require ('../../actions/authorActions');


var AuthorList = require ('./authorList');
var toastr = require ('toastr');


var AuthorPage = React.createClass ({

	//Inicializacion de variables que se usarán en el state
	getInitialState: function () {
		return {
			//authors: []
			authors: AuthorStore.getAllAuthors()
		};
	},

	//componentDidMount: function () {
	//	if (this.isMounted()) {
	//		this.setState ({ authors: AuthorApi.getAllAuthors() });
	//	}
	//},

	componentWillMount: function() {
		//Al iniciar el componente asociar el evento para que controle
		//los cambios del store, lo que a su vez actualizará el componente react
		AuthorStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		//Al desmontar el componente asdejar de escuchar
		AuthorStore.removeChangeListener(this._onChange);
	},

	_onChange: function() {
debugger; //PASO 4 El cambio emitido llega al react view para mostrarlo
		//This functions runs every time the stores changes
		this.setState( {authors: AuthorStore.getAllAuthors() });
	},

	render : function () {
		/*
		Descripción de la pantalla inicial de autores, es una lista con enlaces
		a la pantalla individual para cada autor.
		Botón de enlace a inicio
		Boton para ir al form de author para crear uno nuevo.
		Botón para borrar.
		Pega el listado de autores que se saca de authorList.js
		*/
		return (
			<div>
				<h1>Authors</h1>
				<Link to="app" className="btn btn-default">Home</Link>
				<Link to="addAuthor" className="btn btn-default">Create author</Link>
				<AuthorList authors = {this.state.authors}/>
			</div>
		);
	}
});


module.exports = AuthorPage;


