var express = require('express');
var router = express.Router();
var quizController=require('../controllers/quiz_controller');

/*antiguo
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Quiz' });
});
*/

/* GET home page. */
router.get('/', quizController.init);

// Autoload de comandos con :quizId
router.param('quizId',quizController.load); //autoload: quizID

//Definicion de rutas de /quizes
router.get('/quizes',		  quizController.index);
router.get('/quizes/:quizId(\\d+)',quizController.show);
router.get('/quizes/:quizId(\\d+)/answer'  ,quizController.answer);
router.get('/quizes/author'  ,quizController.author);
module.exports = router;
