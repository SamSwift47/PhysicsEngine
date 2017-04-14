class ball{
	constructor(x, y, r, xspeed, yspeed, m, elasticity, k, drag, rollingResistance, colour, walls, movable){//Change to use magnitue and direction as it much easier
		this.x = x;
		this.y = y;
		this.r = r;
		this.xspeed = xspeed;
		this.yspeed = yspeed;
		this.m = m;
		this.elasticity = elasticity;
		this.k = k;
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
		if(this.walls){
			if(this.x < this.r && this.xspeed < 0){
				this.xspeed = -this.xspeed * Math.sqrt(this.elasticity);
				this.x = this.r;
			}
			if(this.y < this.r && this.yspeed < 0){
				this.yspeed = Math.sqrt(Math.pow(this.yspeed * this.elasticity, 2) + 2 * -gravity * (this.y - this.r));
				this.y = this.r;
			}
			if(this.x > canvas.width - this.r && this.xspeed > 0){
				this.xspeed = -this.xspeed * Math.sqrt(this.elasticity);
				this.x = canvas.width - this.r;
			}
			if(this.y > canvas.height - this.r && this.yspeed > 0){
				this.yspeed = -Math.sqrt(Math.pow(this.yspeed * this.elasticity, 2) - 2 * gravity * (this.y - canvas.height + this.r));//v2^2 = v1^2 + 2ad
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
			this.x = this.x + this.xspeed * t;
			this.y = this.y + this.yspeed * t + t * t / 2 * gravity;
			this.yspeed = this.yspeed + gravity * t;
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
		//Determine colision location and time if you want to be more accurate
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


		if(this.movable){
			Va2ll = Va1ll - ((this.k * object.k * (this.r + object.r - Math.sqrt(Math.pow((object.y - this.y), 2) + Math.pow((object.x - this.x), 2)))) / (this.k + object.k)) / this.m * t * 100000;
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