'use strict';

var React = require('react'),
    Router = require('react-router'),
    CourseForm = require ('./courseForm'),
    CourseActions = require ('../../actions/coursesActions'),
    CourseStore = require ('../../stores/courseStore'),
    AuthorStore = require ('../../stores/authorStore'),

    toastr = require ('toastr'),

    ManageCoursePage = React.createClass({

	mixins: [
		Router.Navigation
	],

	getInitialState: function() {
		return {
			authors: AuthorStore.getAllAuthors(),
			course: {
						id: '',
						title: '',
						watchHref: '' ,
						author: {
									id: '',
									name:''},
						length: '',
						category: '' },
			errors: {},
			dirty : false
		};
	},

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

	componentWillMount: function() {
		var courseId = this.props.params.id;

		if (courseId){
			this.setState({course: CourseStore.getCourseById(courseId)});
		}
	},

	setCourseState: function(event) {
		var fieldName = event.target.name;
		var fieldValue = event.target.value;


		if (fieldName=='authorName'){
			var author = AuthorStore.getAuthorById(fieldValue);
			if (author){
				this.state.course.author.id=fieldValue;
				this.state.course.author.name=author.firstName + ' ' + author.lastName;
			} else {
				this.state.course.author.id='';
				this.state.course.author.name='';
			}
		} else {
			this.state.course[fieldName]=fieldValue;
		}

		this.setState({dirty: true});
		return (this.setState({course: this.state.course}));
	},

	formIsValid: function(){
		var formIsValid = true;
		this.state.errors = {}; //Clear errors

		if (this.state.course.title.length < 3){
			this.state.errors.title = 'Title must be at least 3 characters';
			formIsValid = false;
		}

		if (this.state.course.author.name.length < 1){
			this.state.errors.authorName = 'Author was not defined';
			formIsValid = false;
		}

		this.setState({errors: this.state.errors});
		return formIsValid;
	},

	saveCourse: function(event) {
		var action='';
		event.preventDefault();

		if (!this.formIsValid()) return;

		if (this.state.course.id){
			CourseActions.updateCourse(this.state.course);
			action='updated';
		} else {
			CourseActions.createCourse(this.state.course);
			action='created';
		}
		this.transitionTo('courses');
		this.setState({dirty: false});
		toastr.success('Course succesfully '+action);
	},

	render : function() {
		return(
			<CourseForm course={this.state.course}
				authors={this.state.authors}
				onChange={this.setCourseState}
				onSave ={this.saveCourse}
				errors ={this.state.errors}/>
		);
	}
});

module.exports = ManageCoursePage;