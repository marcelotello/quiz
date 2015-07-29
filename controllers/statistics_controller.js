var models = require('../models/models.js');

exports.showStatistics = function(req,res){


   /*
    El número de preguntas
	 El número de comentarios totales
    El número medio de comentarios por pregunta
    El número de preguntas sin comentarios
    El número de preguntas con comentarios

   */
  
   var questions=0;
   var comments=0;
   var average=0;

    models.Quiz.count().then(function(questions) {
       console.log (questions+" PREGUNTAS");

        models.Comment.count().then(function(comments) {
        console.log (comments+" COMENTARIOS"); 

        average = comments/questions;

         

         models.Quiz.findAll({  include: [{ model: models.Comment,required:true}]}).then (function(quizes) {
        
        for (var i=0; i<quizes.length; i++) {
              console.log(quizes[i].id);
              console.log(quizes[i].pregunta);
      
          }

          var numQuestionsnoComments =Math.abs (quizes.length-questions);
          
          
          

         
            res.render('statistics/show',{numQuestions:questions, numComments:comments , averageQuestions:average.toFixed(2), numQuestionsComments:quizes.length,numQuestionsnoComments: numQuestionsnoComments,errors:[]});

          });




        

    });



  });

  console.log("FUERA: there are " + questions + " questions!")
 


   
	


};