// TODO
game.PlayerEntity = me.ObjectEntity.extend({
    init: function(x, y, settings){
            settings.image = "player1-spritesheet";
            settings.spritewidth = "72";
            settings.spriteheight = "97";
            settings.width = 72;
            settings.height = 97;
            this.parent(x, y, settings);
            this.collidable = true;
            this.renderable.addAnimation("idle", [3]);
            this.renderable.addAnimation("jump", [2]);
            this.renderable.addAnimation("run",[3,4,5,6,7,8,9,10,11]);
            this.renderable.addAnimation("duck", [0]);
            this.renderable.setCurrentAnimation("idle");
            
            me.input.bindKey(me.input.KEY.SPACE, "jump", true);
         
            this.setVelocity(10,20);
            me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
           
  },
     update: function (deltaTime){
        if(me.input.isKeyPressed("d")) {
            this.renderable.flipX(false);
            this.vel.x += this.accel.x * me.timer.tick;          
        } 
        else if (me.input.isKeyPressed("a")) {
            this.renderable.flipX(true);
            this.vel.x -= this.accel.x * me.timer.tick;
        }
        else {
            this.vel.x= 0;
            this.renderable.setCurrentAnimation("run");
        }
        if(me.input.isKeyPressed("s")) {
            this.renderable.setCurrentAnimation("duck");
        } 


          if (me.input.isKeyPressed('jump')) {
			this.jumping = true;

			// reset the dblJump flag if off the ground
			this.mutipleJump = (this.vel.y === 0)?1:this.mutipleJump;

			if (this.mutipleJump<=2) {
				// easy 'math' for double jump
				this.vel.y -= (this.maxVel.y * this.mutipleJump++) * me.timer.tick;

			}
		}

        // check & update player movement
        this.updateMovement();

              // check if we fell into a hole
		if (!this.inViewport && (this.pos.y > me.video.getHeight())) {
			// if yes reset the game
			me.game.world.removeChild(this);
			me.game.viewport.fadeIn('#fff', 150, function(){
				me.levelDirector.reloadLevel();
				me.game.viewport.fadeOut('#fff', 150);
			});
			return true;
		} 
                  
        
        var collision = me.game.world.collide(this);
        this.updateMovement();
        this.parent(deltaTime);
        return true;
         }
         
});
 
    game.LevelTrigger = me.ObjectEntity.extend({
       init: function(x, y, settings) {
           this.parent(x, y, settings);
           this.collidable = true;
           this.level = settings.level;
           this.xSpawn = settings.xSpawn;
           this.ySpawn = settings.ySpawn;
       },
               
       onCollision: function() {
           this.collidable = false;
           var x = this.xSpawn;
           var y = this.ySpawn;
           me.levelDirector.loadLevel(this.level);
           me.state.current().resetPlayer(x, y);          
       }        
       });  
     
     
     
/**
 * a coin (collectable) entiry
 */
//game.CoinEntity = me.CollectableEntity.extend({	
	/** 
	 * constructor
	 */
	/*init: function (x, y, settings) {

		// call the super constructor
		this._super(me.CollectableEntity, 'init', [x, y , settings]);

		// add the coin sprite as renderable
		this.renderable = game.texture.createSpriteFromName("coin.png");

		// set the renderable position to center
		this.anchorPoint.set(0.5, 0.5);

	},		

	/** 
	 * collision handling
	 */
	/*onCollision : function () {
		// do something when collide
		me.audio.play("cling", false);
		// give some score
		game.data.score += 250;

		//avoid further collision and delete it
		this.collidable = false;
		me.game.world.removeChild(this);
	}

<<<<<<< HEAD
});*/
/*game.EnemyEntity = game.CharacterEntity.extend({
	init:function(x, y, settings) {
		settings.image = 'bad1';
		settings.spritewidth = 32;
		this.parent(x, y, settings);

		this.hp = 1;

		this.dmg = 1;
		this.aggroed = false;
		this.firstCheck = true;
		this.walkLeft = false;

		this.startX = x;
		this.endX = x + settings.width - settings.spritewidth;

		this.setVelocity(2, 6);

		this.type = me.game.ENEMY_OBJECT;
	},

	checkLOS: function() {

		// This is so we only check through the entities list one time, not every frame
		if(this.firstCheck) {
			this.player = me.game.getEntityByName("player")[0];
			this.firstCheck = false;
		}

		if(!this.walkLeft) {
			if(((this.pos.x - this.player.pos.x <= 100) && (this.pos.x - this.player.pos.x >= 0)) &&
				(this.pos.y - this.player.pos.y <= 150) && (this.pos.y - this.player.pos.y >= 0)) {
					this.vel.x += -this.accel.x * me.timer.tick;
					this.walkLeft = true;
					return true;
			}
		} else {
			if (((this.pos.x - this.player.pos.x >= -100) && (this.pos.x - this.player.pos.x <= 0)) &&
				(this.pos.y - this.player.pos.y <= 150) && (this.pos.y - this.player.pos.y >= 0)) {
					this.vel.x += this.accel.x * me.timer.tick;
					this.walkLeft = false;
					return true;
			}
		}
		this.flipX(this.walkLeft);
		return false;
	},

	// This just moves it back and forth
	patrol: function() {

		if(this.walkLeft && this.pos.x <= this.startX) {
			this.walkLeft = false;
		} else if (!this.walkLeft && this.pos.x >= this.endX) {
			this.walkLeft = true;
		}

		this.flipX(this.walkLeft);
		this.vel.x += (this.walkLeft) ? -this.accel.x * me.timer.tick : this.accel.x * me.timer.tick;

	},

	getMovements: function() {

		this.vel.x = 0; //change velocity every update; maybe dumb
		this.aggroed = this.checkLOS();
		if(!this.aggroed) {
			this.patrol();
		} 
	}
});
*/
game.SlimeEntity = me.ObjectEntity.extend ({
    init: function (x, y, settings) {
        settings.image = "slime-spritesheet";
        settings.spritewidth = "60";
        settings.spriteheight = "28";
        settings.width = 60;
        settings.height = 28;
        this.parent (x, y, settings);
        
        this.setVelocity(4,1 );

        
        this.renderable.addAnimation  ("moving", [1, 2], 300);
        this.renderable.setCurrentAnimation("moving");
        this.direction = "left";
        
        this.vel.x -= this.accel.x * me.timer.tick;
        this.previousVelocity = this.vel.clone();
    },
     
     update: function(deltaTime) {
        var collision = this.updateMovement ();
 
        if(collision && this.vel.x === 0) {
           this.vel.x = -this.previousVelocity.x;    
        
           if(this.direction === "left") {
               this.direction = "right";
               this.renderable.flipX(true);
           }
           else {
               this.direction = "left";
               this.renderable.flipX(false);
           }
        }
           else {
               this.previousVelocity = this.vel.clone ();
           }
           
           this.parent(deltaTime);
           return true;
     }
});
