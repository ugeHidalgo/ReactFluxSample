/*es-lint-disable strict */ //Disable eslint to check use strict because we need global vars.

var React = require ('react');
var Header = require ('./common/header');
var RouteHandler = require ('react-router').RouteHandler;

$ = jQuery = require('jquery');

var App = React.createClass ({

	render : function (){

		return (
			<div>
				<Header/>
				<div className="container-fluid">
					<RouteHandler />
				</div>
			</div>
		);
	}
});

module.exports = App;

/*
Esta será la estructura general de la pantalla. Tendrá un header que lo obtiene de
common/header.js y el resto lo obtiene del router handler. Así si por ejemplo en la
pongo http://localhost/authors, según router,js irá a authors/authorPage.js
*/