
var models = require('../models/models.js');
var title = "Quiz";



exports.init = function (req,res)
{
	 var numregistros= models.registros;
	 res.render('index', { title: title, numregistros:numregistros, errors:[] });
};

//Autoload - factoriza el código si ruta incluye : quizId
exports.load = function (req,res,next,quizId){
	models.Quiz.find(
		{where: { id: Number(quizId)},
		 include: [{model:models.Comment}]
		}).then(
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
	
	if (req.query.search)
	{
		var buscar=req.query.search;
		
		
		buscar = buscar.replace(/ /g,"%");
		
		
		models.Quiz.findAll({where: ["pregunta like ?",'%'+ buscar+'%']}).then(function(quizes){
			
			for (var i=0; i<quizes.length; i++) {
			
		}
			res.render('quizes/index.ejs',{ quizes: quizes, errors:[]});
		});
	}
	else
	{
		
		models.Quiz.findAll().then(function(quizes){
			
			for (var i=0; i<quizes.length; i++) {
			
		}
			res.render('quizes/index.ejs',{ quizes: quizes,errors:[]});
		});
			
	}
	
	
};



exports.show=function(req,res){
	models.Quiz.findAll().success(function(quiz){
		res.render('quizes/show',{ quiz: req.quiz, errors:[]});

	});
	
};

///GET /quizes/answer
exports.answer=function(req,res){
 
    var resultado='Incorrecto';

    	if (req.query.respuesta===req.quiz.respuesta){

			resultado='Correcto';
		}
		res.render('quizes/answer',{quiz:req.quiz,respuesta:resultado, errors:[]});	

	
};

exports.author=function(req,res){

	res.render('quizes/author',{errors:[]});

};

exports.new=function(req,res){
	var quiz = models.Quiz.build( // Crea objeto Quiz
		{pregunta:"Pregunta",respuesta:"Respuesta",categoria:"Categoria"}
	);
	res.render('quizes/new',{quiz: quiz, errors:[]});

};


exports.create=function(req,res){
	
	var quiz=models.Quiz.build(req.body.quiz);
	var errors = quiz.validate();
	if (errors)
	{
		var i=0;
		var errores=new Array();
		for (var prop in errors) errores[i++]={message: errors[prop]};	
			res.render('quizes/new', {quiz: quiz, errors: errores});
	} else {
		quiz // save: guarda en DB campos pregunta y respuesta de quiz
		.save({fields: ["pregunta", "respuesta","categoria"]})
		.then( function(){ res.redirect('/quizes')}) ;
	}



};

exports.edit = function (req,res){
	var quiz = req.quiz; //autoload de instancia de quiz
	res.render ('quizes/edit',{quiz:quiz,errors:{}});
};

exports.update = function (req,res){
 req.quiz.pregunta   = req.body.quiz.pregunta;
 req.quiz.respuesta  = req.body.quiz.respuesta;
 req.quiz.categoria  = req.body.quiz.categoria;
 var errors = req.quiz.validate();
	if (errors)
	{
		var i=0;
		var errores=new Array();
		for (var prop in errors) errores[i++]={message: errors[prop]};	
			res.render('quizes/edit', {quiz: req.quiz, errors: errores});
	} else {
		req.quiz // save: guarda en DB campos pregunta y respuesta de quiz
		.save({fields: ["pregunta", "respuesta","categoria"]})
		.then( function(){ res.redirect('/quizes')}) ;
	}



};

exports.destroy = function (req,res){
	req.quiz.destroy().then (function(){
		res.redirect('/quizes');

	}).catch(function (error){next(error)});

};



/*
exports.create=function(req,res){
	
	var quiz=models.Quiz.build(req.body.quiz);
	quiz.validate().then( function(err){
		   console.log("paso por quí:"+err);	
			if (err) {
			res.render('quizes/new',{quiz:quiz, errors:err.errors});
	    }else{
	//guarda en BD los campos pregunta y respuesta de quiz
		
			quiz.save ( {fields: ["pregunta", "respuesta"]}).then (function(){  res.redirect('/quizes')})
		}

	     }
	     );
}; */