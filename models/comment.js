// Definición del modelo Comment con validación
module.exports = function (sequelize,DataTypes){
	return sequelize.define (
		'Comment',
		{ texto: {
		  	type: DataTypes.STRING,
		  	validate:{ notEmpty:{msg:"-> Debe rellenar el comentario"}}
			},
		  publicado:{
			type:DataTypes.BOOLEAN,
			defaultValue:false
		  }

		  
		}
		);

}