var express = require('express');
var router = express.Router();
var quizController=require('../controllers/quiz_controller');
var commentController=require('../controllers/comment_controller');
var sessionController = require('../controllers/session_controller');
var statisticsController = require('../controllers/statistics_controller');

/*antiguo
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Quiz' });
});
*/

/* GET home page. */
router.get('/', quizController.init);

// Autoload de comandos con :quizId
router.param('quizId',quizController.load); //autoload: quizID
router.param('commentId',commentController.load); //autoload: commentId
// Definición de rutas de sesión
router.get('/login',sessionController.new);
router.post('/login',sessionController.create);
router.get('/logout',sessionController.destroy);

//Definicion de rutas de /quizes
router.get('/quizes',		  				quizController.index);
router.get('/quizes/:quizId(\\d+)',			quizController.show);
router.get('/quizes/:quizId(\\d+)/answer',	quizController.answer);
router.get('/quizes/author'  ,				quizController.author);
router.get('/quizes/new',					sessionController.loginRequired, sessionController.checkSession,quizController.new);
router.post('/quizes/create',				sessionController.loginRequired, sessionController.checkSession,quizController.create);
router.get('/quizes/:quizId(\\d+)/edit',	sessionController.loginRequired, sessionController.checkSession,quizController.edit);
router.put('/quizes/:quizId(\\d+)',			sessionController.loginRequired, sessionController.checkSession,quizController.update);
router.delete('/quizes/:quizId(\\d+)',		sessionController.loginRequired, sessionController.checkSession,quizController.destroy);
router.get ('/quizes/:quizId(\\d+)/comments/new',commentController.new);
router.post('/quizes/:quizId(\\d+)/comments'    ,commentController.create);
router.get('/quizes/:quizId(\\d+)/comments/:commentId(\\d+)/publish',sessionController.loginRequired, sessionController.checkSession,commentController.publish);

// Definición de rutas /statistics
router.get('/quizes/statistics',  sessionController.loginRequired, sessionController.checkSession,statisticsController.showStatistics);
module.exports = router;
