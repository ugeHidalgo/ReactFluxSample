'use strict';

var React = require('react');
var Link = require('react-router').Link;
var Input = require('../common/textInput');
var DropDownInput = require('../common/dropDownInput');

var AuthorStore = require ('../../stores/authorStore');

var CourseForm = React.createClass({

	propTypes: {
		authors : React.PropTypes.array.isRequired,
		course: React.PropTypes.object.isRequired,
		onSave: React.PropTypes.func.isRequired,
		onChange: React.PropTypes.func.isRequired,
		errors: React.PropTypes.object
	},

	render: function() {
		return (
			<form>
				<h1>Manage Courses</h1>

				<Input
					name="title"
					label="Title"
					value={this.props.course.title}
					onChange={this.props.onChange}
					error={this.props.errors.title}/>

				<DropDownInput
					name="authorName"
					label="Author"
					authors={this.props.authors}
					value={this.props.course.author.id}
					onChange={this.props.onChange}
					error={this.props.errors.authorName}/>

				<Input
					name="category"
					label="Category"
					value={this.props.course.category}
					onChange={this.props.onChange}/>

				<Input
					name="length"
					label="Length"
					value={this.props.course.length}
					onChange={this.props.onChange}/>

				<input type="submit" value="save" className="btn btn-default"
					onClick={this.props.onSave} />
				<Link to="courses" className="btn btn-default">Back to courses list</Link>
			</form>
		)
	}
});

module.exports = CourseForm;