'use strict';

var React = require('react');

var DropDownInput = React.createClass({

	propTypes: {
		name: React.PropTypes.string.isRequired,
		label: React.PropTypes.string.isRequired,
		value: React.PropTypes.string.isRequired,
		authors: React.PropTypes.array.isRequired,

		onChange: React.PropTypes.func.isRequired,
		error: React.PropTypes.string
	},

	render: function() {
		var wrapperClass = 'form-group';
		if (this.props.error && this.props.error.length >0) {
			wrapperClass += ' ' + 'has-error';
		}

		var createOptionRow = function (author) {
			return (
				<option value={author.id} key={author.id}>
					{author.firstName} {author.lastName}
				</option>
			);
		};

		return (
			<div className={wrapperClass}>
				<label htmlFor={this.props.name}>{this.props.label}</label>
				<div className="field">
					<select name={this.props.name}
							value={this.props.value} //Esto sirve para que ponga como default
							className="form-control" //el que esta grabado cuando recupero
							onChange={this.props.onChange}>
						{this.props.authors.map(createOptionRow,this)}
					</select>
					<div className="input">{this.props.error}</div>
				</div>
			</div>
		);
	}
});

module.exports = DropDownInput;