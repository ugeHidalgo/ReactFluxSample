'use strict';

var React = require('react');
var Link = require('react-router').Link;
var Input = require('../common/textInput');

var AuthorForm = React.createClass({

	propTypes: {
		author: React.PropTypes.object.isRequired,
		onSave: React.PropTypes.func.isRequired,
		onChange: React.PropTypes.func.isRequired,
		errors: React.PropTypes.object
	},

	render: function() {
		return (
			<form>
				<h1>Manage Authors</h1>

				<Input
					name="firstName"
					label="First Name"
					//hooks with the onchange in parent component
					value={this.props.author.firstName}
					onChange={this.props.onChange}
					error={this.props.errors.firstName}/>

				<Input
					name="lastName"
					label="Last Name"
					//hooks with the onchange in parent component
					value={this.props.author.lastName}
					onChange={this.props.onChange}
					error={this.props.errors.lastName} />

				<input type="submit" value="Save" className="btn btn-default"
					onClick={this.props.onSave}/>
				<Link to="authors" className="btn btn-default">Back to authors list</Link>
			</form>
		)
	}
});

module.exports = AuthorForm;