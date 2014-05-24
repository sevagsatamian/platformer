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
//          onResetEvent: function() {
//		// reset the score
//		game.data.score = 0;
//                game.data.lives = 3;
//                 me.levelDirector.loadLevel("level1");
//                 this.resetPlayer(0, 420);
//                
//
//		// add our HUD to the game world
//		this.HUD = new game.HUD.Container();
//		me.game.world.addChild(this.HUD);
//	},
  
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
                   if(game.data.lives===0) {
//            me.levelDirector.loadLevel("level1");
              me.levelDirector.reloadLevel();
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
game.CoinEntity = me.CollectableEntity.extend({	
	/** 
	 * constructor
	 */
	init: function (x, y, settings) {

		// call the super constructor
		//this._super(me.CollectableEntity, 'init', [x, y , settings]);

	 settings.image = "item-spritesheet";
        settings.spritewidth = "70";
        settings.spriteheight = "70";
            this.parent(x, y, settings);
            this.renderable.addAnimation("coin", [13,14,15]);
            this.renderable.setCurrentAnimation("coin");
     },	

	/** 
	 * collision handling
	 */
	onCollision : function () {
		// do something when collide
		//me.audio.play("cling", false);
		// give some score
		game.data.score += 1;

		//avoid further collision and delete it
		this.collidable = false;
		me.game.world.removeChild(this);
	}


});
game.StarEntity = me.CollectableEntity.extend({	
	/** 
	 * constructor
	 */
	init: function (x, y, settings) {
	    settings.image = "item-spritesheet";
            settings.spritewidth = "70";
            settings.spriteheight = "70";
            this.parent(x, y, settings);
            this.renderable.addAnimation("star", [46]);
            this.renderable.setCurrentAnimation("star");
     },	

	/** 
	 * collision handling
	 */
	onCollision : function () {
		// do something when collide
		// give some score
		game.data.score += 5;

		//avoid further collision and delete it
		this.collidable = false;
		me.game.world.removeChild(this);
	}


});

game.BoxEntity = me.CollectableEntity.extend({	
	/** 
	 * constructor
	 */
	init: function (x, y, settings) {

		// call the super constructor
		//this._super(me.CollectableEntity, 'init', [x, y , settings]);

	 settings.image = "background-tiles";
        settings.spritewidth = "70";
        settings.spriteheight = "70";
            this.parent(x, y, settings);
            this.renderable.addAnimation("box", [6,6,7,7,8,8,9,9]);
            this.renderable.setCurrentAnimation("box");
     },	

	/** 
	 * collision handling
	 */
	onCollision : function () {		
                game.data.score += 50;
		this.collidable = true;
                me.game.world.removeChild(this);
	}


});

game.SlimeEntity = me.ObjectEntity.extend ({
    init: function (x, y, settings) {
        settings.image = "slime-spritesheet";
        settings.spritewidth = "60";
        settings.spriteheight = "28";
        settings.width = 60;
        settings.height = 28;
        this.parent (x, y, settings);
        
        this.setVelocity(4,1 );
        // make it collidable
		this.collidable = true;
		this.type = me.game.ENEMY_OBJECT;

        
        this.renderable.addAnimation  ("moving", [1, 2], 300);
        this.renderable.setCurrentAnimation("moving");
        this.direction = "left";
        
        this.vel.x -= this.accel.x * me.timer.tick;
        this.previousVelocity = this.vel.clone();
    },
    
     onCollision : function (res, obj){

		if (this.alive && (res.y > 0) && obj.falling){
			// make it flicker
			this.flicker =20;
//			, function(){
//				this.alive = false;
//				me.game.remove(this);
//			});
                    game.data.lives -= 1;
		}
                
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

     game.FlyEntity = me.ObjectEntity.extend ({
    init: function (x, y, settings) {
        settings.image = "fly-spritesheet";
        settings.spritewidth = "76";
        settings.spriteheight = "36";
        settings.width = 76;
        settings.height = 36;
        this.parent (x, y, settings);
        
        this.setVelocity(4,10 );
        // make it collidable
		this.collidable = true;
		this.type = me.game.ENEMY_OBJECT;

        
        this.renderable.addAnimation  ("moving", [1, 2], 300);
        this.renderable.setCurrentAnimation("moving");
        this.direction = "left";
        
        this.vel.x -= this.accel.x * me.timer.tick;
        this.previousVelocity = this.vel.clone();
    },
    
     onCollision : function (res, obj){

		if (this.alive && (res.y > 0) && obj.falling){
			// make it flicker
//			this.flicker(20, function(){
//				this.alive = false;
//				me.game.remove(this);
//			});
                    game.data.lives -= 1;
		}
                
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
game.LavaEntity = me.ObjectEntity.extend ({
    init: function (x, y, settings) {
        
        this.parent (x, y, settings);
        
		this.collidable = true;
		this.type = me.game.ENEMY_OBJECT;
    },
    
     onCollision : function (res, obj){

		
                game.data.lives -= 3;
	}
        
    
     
});
game.ResetEntity = me.ObjectEntity.extend({
   onCollision : function(res, obj){
       
       // reset the score
		game.data.score = 0;
                game.data.lives = 3;
                 me.levelDirector.loadLevel("level1");
                 this.resetPlayer(0, 420);
                

		// add our HUD to the game world
		this.HUD = new game.HUD.Container();
		me.game.world.addChild(this.HUD);
   }
    
    
});