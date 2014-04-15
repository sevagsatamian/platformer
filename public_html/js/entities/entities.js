// TODO
game.PlayerEntity = me.ObjectEntity.extend({
    init: function(x, y, settings){
            settings.image = "player1-spritesheet";
            settings.spritewidth = "72";
            settings.spriteheight = "97";
            this.parent(x, y, settings);
            me.audio.play("PolarIce");
            this.collidable = true;
            this.renderable.addAnimation("idle", [3]);
            this.renderable.addAnimation("jump", [2]);
            this.renderable.addAnimation("run",[3,4,5,6,7,8,9,10,11]);
            this.renderable.addAnimation("duck", [0]);
            this.renderable.setCurrentAnimation("idle");
         
            this.setVelocity(15,20);
            me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
           
  },
     update: function (){
        if(me.input.isKeyPressed("d")) {
            this.flipX(false);
            this.vel.x += this.accel.x * me.timer.tick;          
        } 
        else if (me.input.isKeyPressed("a")) {
            this.flipX(true);
            this.vel.x -= this.accel.x * me.timer.tick;
        }
        else {
            this.vel.x= 0;
            this.renderable.setCurrentAnimation("run");
        }
        
          if(me.input.isKeyPressed("d")) {
            this.flipX(false);
            this.vel.x += this.accel.x * me.timer.tick;          
        } 
        
        if (me.input.isKeyPressed('space')) {
            this.doJump();
              this.renderable.setCurrentAnimation("jump");
              
        }
            
        if(me.input.isKeyPressed("s")) {
            this.renderable.setCurrentAnimation("duck");
        } 
        
        var collision = this.collide();
        this.updateMovement();
        this.parent();
           
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
           me.levelDirector.loadLevel.defer(this.level);
           me.state.current().resetPlayer.defer();
       }        
       });    
         game.LevelTrigger2 = me.ObjectEntity.extend({
       init: function(x, y, settings) {
           this.parent(x, y, settings);
           this.collidable = true;
           this.level = settings.level;
       },
               
       onCollision: function() {
           this.collidable = false;
           me.levelDirector.loadLevel.defer(this.level);
           me.state.current().resetPlayer.defer();
       }        
       });    

   game.FlyEntity = me.ObjectEntity.extend({
     init: function(x, y, settings){
         settings.image = "fly-spritesheet";
         settings.spritewidth = "76";
         settings.spriteheight = "36";
         this.collidable = true;
         this.parent(x, y, settings);
         this.setVelocity(10,0);
         this.updateColRect(40, 46, -1);
         this.parent(100, 100, settings);
         this.health = 10;
         this.maxHealth = 10;
     
},
       
    step: function(dt) {                
        //TODO: update range movement within the game loop
        if(this.p.y - this.p.initialY >= this.p.rangeY && this.p.vy > 0) {
        this.p.vy = -this.p.vy;
    } 
    else if(-this.p.y + this.p.initialY >= this.p.rangeY && this.p.vy < 0) {
        this.p.vy = -this.p.vy;
    }
    },
     draw: function(context, rect) {
        this.parent(context, rect);
        this.drawHealth(context);
  },
    drawHealth: function(context) {
        var percent = this.health / this.maxHealth;
        var width = this.getCollisionBox().width;
        context.fillStyle = 'green';
        context.fillRect(this.getCollisionBox().x, this.pos.y - 12, width, 10);
  },
    getCollisionBox: function() {
        return {
        x: this.pos.x + this.collisionBox.colPos.x,
        y: this.pos.y + this.collisionBox.colPos.y,
        width: this.collisionBox.width,
        height: this.collisionBox.height
  };
  },
                    
    onCollision: function() {
        this.collidable = false;
        me.game.remove(this);  
          
  },        
       
    update: function() {
       
  }
   });