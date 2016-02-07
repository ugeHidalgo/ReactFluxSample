'use strict';

var React = require('react');
var Router = require ('react-router');
var routes = require ('./routes');
var InitializeActions = require('./actions/initializeActions');

InitializeActions.initApp(); //To load initial authors data

Router.run(routes, function (Handler) {
	React.render(<Handler />, document.getElementById('app'));
});

/* Se obtiene el elemento app del index.html y ahí se renderiza el contenido de Handler
   Handler se obtiene meriante routes y dependiendo de la url fijada devolverá un objeto
   u otro.
   Al empezar la aplicación cogerá de router y hará el handler igual a componentes/app.js
   */