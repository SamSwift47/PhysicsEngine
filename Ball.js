class ball{
	constructor(x, y, r, xspeed, yspeed, m, elasticity, drag, rollingResistance, colour, walls, movable){//Change to use magnitue and direction as it much easier
		this.x = x;
		this.xPrevious = this.x;
		this.y = y;
		this.yPrevious = this.y;
		this.r = r;
		this.xspeed = xspeed;
		this.xspeedPrevious = this.xspeed;
		this.yspeed = yspeed;
		this.yspeedPrevious = this.yspeed;
		this.m = m;
		this.elasticity = elasticity;
		this.drag = drag;
		this.rollingResistance = rollingResistance;
		this.colour = colour;
		this.walls = walls;
		this.movable = movable;
		this.update = this.update.bind(this);
		this.show = this.show.bind(this);
		this.collide = this.collide.bind(this);
	}
	update(){
		//check for a collission
		this.xPrevious = this.x;
		this.yPrevious = this.y;
		this.xspeedPrevious = this.xspeed;
		this.yspeedPrevious = this.yspeed;

		if(this.walls){
			if(this.x < this.r && this.xspeed < 0){
				this.xspeed = -this.xspeed * Math.sqrt(this.elasticity * wallElasticity);
				this.x = this.r;
			}
			if(this.y < this.r && this.yspeed < 0){
				this.yspeed = Math.sqrt(Math.pow(this.yspeed * this.elasticity, 2 * wallElasticity) + 2 * -gravity * (this.y - this.r));
				this.y = this.r;
			}
			if(this.x > canvas.width - this.r && this.xspeed > 0){
				this.xspeed = -this.xspeed * Math.sqrt(this.elasticity * wallElasticity);
				this.x = canvas.width - this.r;
			}
			if(this.y > canvas.height - this.r && this.yspeed > 0){
				this.yspeed = -Math.sqrt(Math.pow(this.yspeed * this.elasticity * wallElasticity, 2) - 2 * gravity * (this.y - canvas.height + this.r));//v2^2 = v1^2 + 2ad
				this.y = canvas.height - this.r;
			}
		}
		if(!this.xspeed){
			this.xspeed = 0;
		}
		if(!this.yspeed){
			this.yspeed = 0;
		}
		if(this.y === canvas.height - this.r){
			this.xspeed = this.xspeed - this.xspeed * this.rollingResistance / this.m * t;
		}
		if(this.movable){
			this.x = this.x + this.xspeed * t  - Math.sign(this.xspeed) * Math.pow(this.xspeed, 2) * Math.pow(this.r, 2) * fluidDensity * this.drag / this.m / 2 * t * t;
			this.y = this.y + this.yspeed * t + t * t / 2 * gravity - Math.sign(this.yspeed) * Math.pow(this.yspeed, 2) * Math.pow(this.r, 2) * fluidDensity * this.drag / this.m / 2 * t * t;
			this.yspeed = this.yspeed + gravity * t - Math.sign(this.yspeed) * Math.pow(this.yspeed, 2) * Math.pow(this.r, 2) * fluidDensity * this.drag / this.m * t;
			this.xspeed = this.xspeed - Math.sign(this.xspeed) * Math.pow(this.xspeed, 2) * Math.pow(this.r, 2) * fluidDensity * this.drag / this.m * t;
		}
		//console.log("x: " + this.x);
		//console.log("y: " + this.y);
		//console.log("xspeed: " + this.xspeed);
		//console.log("yspeed: " + this.yspeed);
	}
	show(){
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.r, 0, Math.PI*2, false);
		ctx.fillStyle = this.colour;
		ctx.fill();
		ctx.closePath();
	}
	collide(object){
		//Determine: tRemaining, aX, aY, bX, bY, aXspeed, aYspeed, bXspeed, bYspeed colision location and time if you want to be more accurate		
		//x = v1t + 1/2*a*t^2
		//dy = v1t + 1/2*a*t^2
		//at point of colision Math.sqrt((aX - bX)^2 + (aY - bY)^2) = r
		//ax = get the equations in terms of t
		//ay =
		//bx = 
		//by =
		//time to colision = 
		//var tRemaining = 1 - (time to colision);

		console.log("There has been a colision.");
		console.log("Ball A's Position is (" + this.x + ", " + this.y + ")");
		console.log("Ball B's Position is (" + object.x + ", " + object.y + ")");

		var Aspeed = Math.sqrt(Math.pow(this.xspeed, 2) + Math.pow(this.yspeed, 2));
		var Adirection = Math.atan2((this.yspeed), (this.xspeed));
		var Bspeed = Math.sqrt(Math.pow(object.xspeed, 2) + Math.pow(object.yspeed, 2));
		var Bdirection = Math.atan2((object.yspeed), (object.xspeed));

		var theta = Math.atan2((object.y - this.y), (object.x - this.x));
		console.log("Angle of colision is: " + theta);

		var Va1ll = Math.cos(theta) * this.xspeed + Math.sin(theta) * this.yspeed;
		var Va1X = -Math.sin(theta) * this.xspeed + Math.cos(theta) * this.yspeed;
		var Vb1ll = Math.cos(theta) * object.xspeed + Math.sin(theta) * object.yspeed;
		var Vb1X = -Math.sin(theta) * object.xspeed + Math.cos(theta) * object.yspeed;

		var Va2X = Va1X;
		var Vb2X = Vb1X;

		var Va2ll = Va1ll;
		var Vb2ll = Vb1ll;

		console.log("A xspeed: " + this.xspeed);
		console.log("A yspeed: " + this.yspeed);
		console.log("A speed: " + Aspeed);
		console.log("A direction: " + Adirection);
		console.log("B xspeed: " + object.xspeed);
		console.log("B Yspeed: " + object.yspeed);
		console.log("B speed: " + Bspeed);
		console.log("B direction: " + Bdirection);
		console.log("Va1ll: " + Va1ll);
		console.log("Va1X: " + Va1X);
		console.log("Vb1ll: " + Vb1ll);
		console.log("Vb1X: " + Vb1X);
		console.log("this.m: " + this.m);
		console.log("object.m: " + object.m);

		//caclulate v2 paralell and perpindicular
		//this.m * Va1ll + object.m * Vbll = this.m * Va2ll + object.m * Vb2ll;
		//Va2ll = (this.m * Va1ll + object.m * Vb1ll - object.m * Vb2ll) / this.m; //Va2ll in terms of Vb2ll
		//e initial * energy loss = e final
		//(this.m * (Math.pow(Va1ll, 2) + Math.pow(Va1X, 2)) + object.m * (Math.pow(Vb1ll, 2) + Math.pow(Vb1X, 2)) * this.elasticity * object.elasticity (INCORPERATE THE MAXIMUM AMOUNT OF ENERGY THAT COULD BE LOST IF IT WAS A PERFECTLY INELASTIC COLISIIN) = this.m * (Math.pow(Va2ll, 2) + Math.pow(Va2X, 2)) + object.m * (Math.pow(Vb2ll, 2) + Math.pow(Vb2X, 2))//Could also just x and y to get the magnitude of velocity

		//(this.m * (Math.pow(Va1ll, 2) + Math.pow(Va1X, 2)) + object.m * (Math.pow(Vb1ll, 2) + Math.pow(Vb1X, 2)) = this.m * (Math.pow(Va2ll, 2) + Math.pow(Va2X, 2)) + object.m * (Math.pow(Vb2ll, 2) + Math.pow(Vb2X, 2))
		if(this.movable && object.movable){
			var a = (object.m + Math.pow(object.m, 2) / this.m);
			var b = -(2 * Va1ll * object.m + 2 * Math.pow(object.m, 2) * Vb1ll / this.m)
			var c = -this.m * (Math.pow(Va1ll, 2) + Math.pow(Va1X, 2)) - object.m * (Math.pow(Vb1ll, 2) + Math.pow(Vb1X, 2)) + object.m * Math.pow(Vb2X, 2) + this.m * Math.pow(Va1ll, 2) + 2 * object.m * Vb1ll * Va1ll + Math.pow(object.m, 2) * Math.pow(Vb1ll, 2) / this.m;

			console.log("B a: " + a);
			console.log("B b: " + b);
			console.log("B c: " + c);

			var Vb2ll = (-b + Math.sqrt(Math.pow(b, 2) - 4 * a * c)) / (2 * a);
			console.log("Vb2ll: " + Vb2ll);
			if(Vb2ll < Vb1ll + error && Vb2ll > Vb1ll - error){
				Vb2ll = (-b - Math.sqrt(Math.pow(b, 2) - 4 * a * c)) / (2 * a);
				console.log("HAS FOUND AN ERROR");
				console.log("Vb2ll: " + Vb2ll);
			}

			a = (this.m + Math.pow(this.m, 2) / object.m);
			b = -(2 * Vb1ll * this.m + 2 * Math.pow(this.m, 2) * Va1ll / object.m)
			c = -object.m * (Math.pow(Vb1ll, 2) + Math.pow(Vb1X, 2)) - this.m * (Math.pow(Va1ll, 2) + Math.pow(Va1X, 2)) + this.m * Math.pow(Va2X, 2) + object.m * Math.pow(Vb1ll, 2) + 2 * this.m * Va1ll * Vb1ll + Math.pow(this.m, 2) * Math.pow(Va1ll, 2) / object.m;

			console.log("A a: " + a);
			console.log("A b: " + b);
			console.log("A c: " + c);

			var Va2ll = (-b - Math.sqrt(Math.pow(b, 2) - 4 * a * c)) / (2 * a);
			console.log("Va2ll: " + Va2ll);
			if(Va2ll < Va1ll + error && Va2ll > Va1ll - error){
				Va2ll = (-b + Math.sqrt(Math.pow(b, 2) - 4 * a * c)) / (2 * a);
				console.log("HAS FOUND AN ERROR");
				console.log("Va2ll: " + Va2ll);
			}
		}
		else if(this.movable){
			Va2ll = -Va1ll;
			console.log("Va2ll: " + Va2ll);
		}
		else if(object.movable){
			Vb2ll = -Vb1ll;
			console.log("Vb2ll: " + Vb2ll);
		}
		this.xspeed = Math.cos(-theta) * Va2ll + Math.sin(-theta) * Va2X;
		this.yspeed = -Math.sin(-theta) * Va2ll + Math.cos(-theta) * Va2X;
		object.xspeed = Math.cos(-theta) * Vb2ll + Math.sin(-theta) * Vb2X;
		object.yspeed = -Math.sin(-theta) * Vb2ll + Math.cos(-theta) * Vb2X;

		console.log("A xspeed: " + this.xspeed);
		console.log("A yspeed: " + this.yspeed);
		console.log("B xspeed: " + object.xspeed);
		console.log("B Yspeed: " + object.yspeed);
	}
}