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
         
            this.setVelocity(15,20);
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
        
       /* if(me.input.isKeyPressed("d")) {
            this.renderable.flipX(false);
            this.vel.x += this.accel.x * me.timer.tick;          
        } */
        
        if (me.input.isKeyPressed("space")) 
                 {
        if (!this.jumping && !this.falling) {
        // set the current jump force to the maximum defined value
            this.jumpForce = this.maxVel.y;

        // set the jumping flag
            this.jumping = true;
        }
        else {
            this.jumpForce = 0;

    // reset the jumping flag
            this.jumping = false;
        }
            this.vel.y -= this.jumpForce * me.timer.tick;
                  // check for collision with environment
            this.updateMovement();
// update current vel with the jump force value
// gravity will then do the rest
		// check if we fell into a hole
	if (!this.inViewport && (this.pos.y > me.video.getHeight())) {
			// if yes reset the game
	    me.game.world.removeChild(this);
            me.game.viewport.fadeIn('#fff', 150, function(){
		//me.audio.play("die", false);
            me.levelDirector.reloadLevel();
            me.game.viewport.fadeOut('#fff', 150);
			});
			return true;
	}
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
       },
               
       onCollision: function() {
           this.collidable = false;
           me.levelDirector.loadLevel(this.level);
           me.state.current().resetPlayer();
       }        
       });  