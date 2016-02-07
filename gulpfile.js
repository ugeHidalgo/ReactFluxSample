"use strict";

var gulp = require('gulp');
var connect = require('gulp-connect'); //This is to run a local dev server.
var open = require('gulp-open'); //This is to open a URL in a web browser.
var browserify = require('browserify'); //Bundles JS
var reactify = require('reactify'); //Transform react jsx to js
var source = require('vinyl-source-stream'); //Use conventional text streams with gulp
var concat = require('gulp-concat'); //Concadena ficheros
var lint = require ('gulp-eslint'); //Lint js files including j

var config = {
	port: 9005, //Puede ser cualquiera que no este usando
	devBaseUrl: 'http://localhost',
	paths: {
		html: './src/*.html',
		js : './src/**/*.js',
		css: [
			'node_modules/bootstrap/dist/css/bootstrap.min.css',
			'node_modules/bootstrap/dist/css/bootstrap-theme.min.css',
			'node_modules/toastr/package/toastr.css'
		],
		images: './src/images/*',
		dist: './dist',
		mainJs: './src/main.js'
	}

}

//Task #1 ------------------------
//Start a local development server
gulp.task('connect', function (){
	connect.server({
		root: ['dist'],
		port: config.port,
		base: config.devBaseUrl,
		livereload : true  //Reload the source everytime the files change
	});
});

//Task #2 ------------------------
//Open a given file in the server
gulp.task('open', ['connect'], function (){
	//Hace el open una vez que haya echo primero el connect anterior
	gulp.src ('dist/index.html')
		.pipe(open('',{ url: config.devBaseUrl + ':' + config.port + '/'}));
});

//Task #3 ------------------------
//Copy src files to dist when building
gulp.task('html', function (){
	gulp.src (config.paths.html) //Copia los fuentes
		.pipe(gulp.dest(config.paths.dist)) //los pone en el dest
		.pipe(connect.reload()); //Recarga
});

//Task #4 ------------------------
//Copy images files to dist when building
gulp.task('images', function (){
	gulp.src (config.paths.images) //Copia las imágenes
		.pipe(gulp.dest(config.paths.dist+'/images')) //los pone en el dest
		.pipe(connect.reload()); //Recarga

	//Publish favicon
	gulp.src('./src/favicon.ico')
		.pipe(gulp.dest(config.paths.dist));
});

//Task #5 ------------------------
//Browserify js files
gulp.task('js', function (){
	browserify(config.paths.mainJs)
		.transform(reactify) //Lo transforma
		.bundle()//Lo empaqueta todo en un unico fichero
		.on ('error', console.error.bind(console))
		.pipe(source('bundle.js'))  //nombre que se le da al bundle
		.pipe(gulp.dest(config.paths.dist + '/scripts')) //donde pone el bundle
		.pipe(connect.reload());  //recarga todo
});

//Task #6 ------------------------
//Concat css files
gulp.task('css', function (){
	gulp.src(config.paths.css)
		.pipe(concat('bundle.css'))
		.pipe(gulp.dest(config.paths.dist + '/css'));
});

//Task #7 ------------------------
//Lint js and jsx files
gulp.task('lint', function (){
	return gulp.src(config.paths.js)
			.pipe(lint({config:'eslint.config.json'})) //Lint rules file
			.pipe(lint.format());
});

//Watch task ------------------------
//Vigila posibles cambios en las páginas.
gulp.task('watch', function () {
	gulp.watch(config.paths.html, ['html']);
	gulp.watch(config.paths.js, ['js', 'lint']);
});

//Default Task ------------------------
//Lanza todas las anteriores (1 a 7 y la watch).
gulp.task('default', ['html', 'images', 'js', 'css', 'lint','open', 'watch']);

