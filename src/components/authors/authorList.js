'use strict';

var React = require ('react');
var Link = require ('react-router').Link;
var AuthorActions = require ('../../actions/authorActions');
var toastr = require('toastr');

var AuthorList = React.createClass ({

	propTypes: {
			authors : React.PropTypes.array.isRequired
	},

	deleteAuthor: function(id,event) {
		event.preventDefault(); //To avoid refresh of the screen, evita que al hacer click
		//en el link la página haga nada.
debugger; //PASO 1  Aqui el react view emitirá una acción que irá al dispatcher
		AuthorActions.deleteAuthor(id);
		toastr.success('Author deleted');
	},

	render : function () {

		//Esta función crea el cuerpo del listado de autores
		//Checkbox para marcar los que quiero borrar
		//Link al form de autor mostrando los datos del autor seleccionado
		//Campos restantes de la tabla
		var createAuthorRow = function (author) {
			return (
				<tr key={author.id}>
					<td><a href='#' onClick={this.deleteAuthor.bind(this,author.id)}>
							Delete
						</a>
					</td>
					<td><Link to="manageAuthor"
							  params={{id: author.id}}>
							{author.id}
						</Link>
					</td>
					<td>{author.firstName} {author.lastName}</td>
				</tr>
			);
		};

		//Cabeceras, la primera vacía es la del checkbox
		//Se llama a crear el listado de autores como una iteración (map)
		return (
			<div>
				<table className ='table'>
					<thead>
						<th></th>
						<th>ID</th>
						<th>Name</th>
					</thead>
					<tbody>
						{this.props.authors.map(createAuthorRow,this)}
					</tbody>
				</table>
			</div>
		);
	}
});


module.exports = AuthorList;


