
var models = require('../models/models.js');
var title = "Quiz";



exports.init = function (req,res)
{
	 var numregistros= models.registros;
	 res.render('index', { title: title, numregistros:numregistros });
}

//Autoload - factoriza el código si ruta incluye : quizId
exports.load = function (req,res,next,quizId){
	models.Quiz.find(quizId).then(
		function(quiz){

			if (quiz){
				req.quiz=quiz;
				next();

			}else{next (new Error('No existe quizId='+quizId));}
		}
		).catch (function (error) {next(error);});

};
exports.index=function(req,res){
	var quizes="";
	console.log ("BD name="+models.registros);
	if (req.query.search)
	{
		var buscar=req.query.search;
		console.log(typeof req.query.search);
		console.log(typeof buscar);
		
		buscar = buscar.replace(/ /g,"%");
		
		console.log ("Buscamos:"+buscar);
		models.Quiz.findAll({where: ["pregunta like ?",'%'+ buscar+'%']}).then(function(quizes){
			
			for (var i=0; i<quizes.length; i++) {
			console.log(quizes[i].pregunta);
		}
			res.render('quizes/index.ejs',{ quizes: quizes});
		});
	}
	else
	{
			res.render('quizes/index.ejs',{ quizes: quizes});
	}
	
	
};



exports.show=function(req,res){
	models.Quiz.findAll().success(function(quiz){
		res.render('quizes/show',{ quiz: req.quiz});

	});
	
};

///GET /quizes/answer
exports.answer=function(req,res){
 
    var resultado='Incorrecto';

    	if (req.query.respuesta===req.quiz.respuesta){

			resultado='Correcto';
		}
		res.render('quizes/answer',{quiz:req.quiz,respuesta:resultado});	

	
};

exports.author=function(req,res){

	res.render('quizes/author');

};