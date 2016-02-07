'use strict';

var React = require('react');

var Router = require ('react-router');
var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;
var NotFoundRoute = Router.NotFoundRoute;
var Redirect = Router.Redirect;

var routes = (
	//Este primero es el handler de la aplicación en general
	<Route name="app" path="/" handler={require('./components/app')}>

		//Esta es la ruta por defecto a la página inicial
		<DefaultRoute handler={require('./components/homePage')} />

		//Esto son rutas a otras páginas
		<Route name='about' handler={require('./components/about/aboutPage')} />

		<Route name='authors' handler={require('./components/authors/authorPage')} />
		<Route name='manageAuthor' path='author/:id' handler={require('./components/authors/manageAuthorPage')} />
		<Route name='addAuthor' path='author' handler={require('./components/authors/manageAuthorPage')} />

		<Route name='courses' handler={require('./components/courses/coursePage')} />
		<Route name='manageCourse' path='course/:id' handler={require('./components/courses/manageCoursePage')} />
		<Route name='addCourse' path='course' handler={require('./components/courses/manageCoursePage')}/>

		//Esta es la ruta de no encontrado
		<NotFoundRoute handler={require('./components/notFoundPage')} />

		//Esto son redirecciones para el caso de que pongan mal algunas palabras
		<Redirect from='about-us' to='about' />
		<Redirect from='about/*' to='about' />

		<Redirect from='autors' to='authors' />
	</Route>
);

module.exports = routes;

