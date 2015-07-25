//MW de autorizacion de accesos HTTP
exports.loginRequired=function(req,res,next){
	if (req.session.user){
		next();
	}else{
		res.redirect('/login');
	}
};

//GEt /login 
exports.new=function(req,res){
	var errors=req.session.errors||{};
	req.session.errors={};
	res.render('sessions/new',{errors:errors});
};

// POST LOGIN
exports.create=function(req,res){
	var login = req.body.login;
	var password = req.body.password;
	var userController=require('./user_controller');
	console.log("login="+login);
	console.log("pass="+password);
	
	userController.autenticar(login,password,function(error,user){
		console.log("ERROR="+error);
		if (error){ // si hay error retornamos mensajes de error
			req.session.errors=[{"message":'Se ha producido un error : ' +error}];
			res.redirect("/login");
			return;
		}
		req.session.user = {id:user.id,username:user.username};
		console.log("REDIRSSESIONCONTROLLER"+req.session.redir);
	
		console.log("SALGO DE create");
		res.redirect(req.session.redir.toString()); // redirect a paht anterior
	});
		
	
	
	
};

// DELTE /logout destruir sessión
exports.destroy = function(req,res){
	delete req.session.user;
	res.redirect(req.session.redir.toString()); // redirect a paht anterior
};

