'use strict';

var React = require ('react');
var Router = require('react-router');
var Link = Router.Link;

var CourseStore = require ('../../stores/courseStore');
var CourseActions = require ('../../actions/coursesActions');

var CoursesList = require ('./coursesList');

var toastr = require ('toastr');


var CoursePage = React.createClass ({

	getInitialState: function () {
		return {
			courses: CourseStore.getAllCourses()
		};
	},

	componentWillMount: function() {
		CourseStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		CourseStore.removeChangeListener(this._onChange);
	},

	_onChange: function() {
		this.setState( {courses: CourseStore.getAllCourses() });
	},

	render : function () {
		return (
			<div>
				<h1>Courses</h1>
				<Link to="app" className="btn btn-default">Home</Link>
				<Link to="addCourse" className="btn btn-default">Create Course</Link>
				<CoursesList courses = {this.state.courses}/>

			</div>
		);
	}
});

module.exports = CoursePage;