//MW de autorizacion de accesos HTTP

exports.checkSession=function(req,res,next){
	    if (req.session.user)
	    {
	    	var now = new Date();
	    	var sessionDate = new Date(req.session.user.logindate);
			
			var difference = (now-sessionDate)/1000;
		

			if (difference>120){
				console.log("sessión caducada");
				delete req.session.user;
				req.session.errors=[{"message":'Sessión caducada: '}];
				res.redirect("/login");
				return;

			}
			else
			{
				req.session.user.logindate=new Date();
				console.log("Session actualizada a = "+req.session.user.logindate);	
			}
			next();

		}
};

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
	var timestamp = new Date();
	console.log("login="+login);
	console.log("pass="+password);
	console.log("timestamp="+timestamp);
	
	userController.autenticar(login,password,function(error,user){
		console.log("ERROR="+error);
		if (error){ // si hay error retornamos mensajes de error
			req.session.errors=[{"message":'Se ha producido un error : ' +error}];
			res.redirect("/login");
			return;
		}

		req.session.user = {id:user.id,username:user.username,logindate:new Date()};
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

