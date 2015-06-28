// Definición del modelo Quiz
module.exports = function (sequelize,DataTypes){
	return sequelize.define (
		'Quiz',
		{ pregunta: {
		  	type: DataTypes.STRING,
		  	validate:{ notEmpty:{msg:"-> Debe rellenar la pregunta"}}
			},

		  respuesta: {
		  	type: DataTypes.STRING,
		  	validate:{ notEmpty:{msg:"-> Debe rellenar la respuesta"}}
			},
		  categoria: {
		  	type: DataTypes.STRING,
		  	validate:{ notEmpty:{msg:"-> Debe rellenar la categoría"}}
			}


		}
		);

}