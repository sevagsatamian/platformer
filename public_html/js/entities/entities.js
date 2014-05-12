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
         
            this.setVelocity(10,15);
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
        
        
      //  if (me.input.isKeyPressed("space")) 
     //            {
       /* if (!this.jumping && !this.falling) {
        // set the current jump force to the maximum defined value
           this.jumpForce = this.maxVel.y;

        // set the jumping flag
           // this.jumping = true;
        }
      /*  else {
            this.jumpForce = 0;
         
           // this.vel.y -= this.jumpForce * me.timer.tick;
           
                  
                  */
                  
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
				me.audio.play("die", false);
				me.levelDirector.reloadLevel();
				me.game.viewport.fadeOut('#fff', 150);
			});
			return true;
		}
                
        // update animation if necessary
     /*   if (this.vel.x!==0 || this.vel.y!==0) {
            // update object animation
            this.parent(deltaTime);
            return true;
        }
                  
                  */
                  
                  
                  
        
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
       },
               
       onCollision: function() {
           this.collidable = false;
           me.levelDirector.loadLevel(this.level);
           me.state.current().resetPlayer();
       }        
       });  
     
   
   
game.FlyEnemyEntity = game.PathEnemyEntity.extend({	
	/**
	 * constructor
	 */
	init: function (x, y, settings) {
		// super constructor
		this._super(game.PathEnemyEntity, 'init', [x, y, settings]);

		// set a renderable
		this.renderable = game.texture.createAnimationFromName([
			"fly_normal.png", "fly_fly.png", "fly_dead.png"
		]);

		// custom animation speed ?
		if (settings.animationspeed) {
			this.renderable.animationspeed = settings.animationspeed; 
		}

		// walking animatin
		this.renderable.addAnimation ("walk", ["fly_normal.png", "fly_fly.png"]);
		// dead animatin
		this.renderable.addAnimation ("dead", ["fly_dead.png"]);

		// set default one
		this.renderable.setCurrentAnimation("walk");

		// set the renderable position to bottom center
		this.anchorPoint.set(0.5, 1.0);		
	}
});

game.SlimeEnemyEntity = game.PathEnemyEntity.extend({	
	/**
	 * constructor
	 */
	init: function (x, y, settings) {
		// super constructor
		this._super(game.PathEnemyEntity, 'init', [x, y, settings]);

		// set a renderable
		this.renderable = game.texture.createAnimationFromName([
			"slime_normal.png", "slime_walk.png", "slime_dead.png"
		]);

		// custom animation speed ?
		if (settings.animationspeed) {
			this.renderable.animationspeed = settings.animationspeed; 
		}

		// walking animatin
		this.renderable.addAnimation ("walk", ["slime_normal.png", "slime_walk.png"]);
		// dead animatin
		this.renderable.addAnimation ("dead", ["slime_dead.png"]);

		// set default one
		this.renderable.setCurrentAnimation("walk");

		// set the renderable position to bottom center
		this.anchorPoint.set(0.5, 1.0);		
	}
});

game.PathEnemyEntity = me.ObjectEntity.extend({	
	/**
	 * constructor
	 */
	init: function (x, y, settings) {

		// save the area size defined in Tiled
		var width = settings.width || settings.spritewidth;
		var height = settings.height || settings.spriteheight;

		// adjust the setting size to the sprite one
		settings.width = settings.spritewidth;
		settings.height = settings.spriteheight;

		// call the super constructor
		this._super(me.ObjectEntity, 'init', [x, y , settings]);

		// set start/end position based on the initial area size
		x = this.pos.x;
		this.startX = x;
		this.endX   = x + width - settings.spritewidth
		this.pos.x  = x + width - settings.spritewidth;

		// apply gravity setting if specified
		this.gravity = settings.gravity || me.sys.gravity;
		this.walkLeft = false;

		// walking & jumping speed
		this.setVelocity(settings.velX || 1, settings.velY || 6);

		// make it collidable
		this.collidable = true;
		this.type = me.game.ENEMY_OBJECT;

		// don't update the entities when out of the viewport
		this.alwaysUpdate = false;
	},


	/**
	 * manage the enemy movement
	 */
	update : function (dt) {

		if (this.alive)	{
			if (this.walkLeft && this.pos.x <= this.startX) {
				this.vel.x = this.accel.x * me.timer.tick;
				this.walkLeft = false;
				this.flipX(true);
			} else if (!this.walkLeft && this.pos.x >= this.endX) {
				this.vel.x = -this.accel.x * me.timer.tick;
				this.walkLeft = true;
				this.flipX(false);
			}

			// check & update movement
			this.updateMovement();

		} 

		// return true if we moved of if flickering
		return (this._super(me.ObjectEntity, 'update', [dt]) || this.vel.x != 0 || this.vel.y != 0);
	},

	/**
	 * collision handle
	 */
	onCollision : function (res, obj) {
		// res.y >0 means touched by something on the bottom
		// which mean at top position for this one
		if (this.alive && (res.y > 0) && obj.falling) {
			// make it dead
			this.alive = false;
			// and not collidable anymore
			this.collidable = false;
			// set dead animation
			this.renderable.setCurrentAnimation("dead");
			// make it flicker and call destroy once timer finished
			var self = this;
			this.renderable.flicker(750, function(){me.game.world.removeChild(self)});
			// dead sfx
			me.audio.play("enemykill", false);
			// give some score
			game.data.score += 150;
		}
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

});*/