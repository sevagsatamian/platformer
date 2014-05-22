

/**
 * a HUD container and child items
 */

game.HUD = game.HUD || {};


game.HUD.Container = me.ObjectContainer.extend({

	init: function() {
		// call the constructor
		this.parent();
		
		// persistent across level change
		this.isPersistent = true;
		
		// non collidable
		this.collidable = false;
		
		// make sure our object is always draw first
		this.z = Infinity;

		// give a name
		this.name = "HUD";
		
		// add our child score object at the top left corner
		this.addChild(new game.HUD.ScoreItem(5, 5));
                this.addChild(new game.HUD.LivesItem(5, 5));
                this.addChild(new game.HUD.CoinsItem(5, 5));
                this.addChild(new game.HUD.StarItem(5, 5));
	}
});
/** 
 * a basic HUD item to display score
 */
/** 
 * a basic HUD item to display score
 */
game.HUD.ScoreItem = me.Renderable.extend({	
	/** 
	 * constructor
	 */
	init: function(x, y) {
		
		// call the parent constructor 
		// (size does not matter here)
		this.parent(new me.Vector2d(x, y), 10, 10); 
                
		this.font = new me.Font("Courier New", 25, "black");
		// local copy of the global score
		this.score = -1;

		// make sure we use screen coordinates
		this.floating = true;
	},

	/**
	 * update function
	 */
	update : function () {
		// we don't do anything fancy here, so just
		// return true if the score has been updated
		if (this.score !== game.data.score) {	
			this.score = game.data.score;
			return true;
		}
		return false;
	},

	/**
	 * draw the score
	 */
	draw : function (context) {
// draw it baby !
    this.font.draw(context, "Your Score:" + this.score, 400, 0);
}
});

game.HUD.CoinsItem = me.Renderable.extend({	
	/** 
	 * constructor
	 */
	init: function(x, y) {
		
		// call the parent constructor 
		// (size does not matter here)
		this.parent(new me.Vector2d(x, y), 10, 10); 
                
		this.font = new me.Font("Courier New", 25, "blue");
		// local copy of the global score

		// make sure we use screen coordinates
		this.floating = true;
	},
	/**
	 * draw the score
	 */
	draw : function (context) {
// draw it baby !
    this.font.draw(context, "Coins + 1pt", 10, 0);
}
});

game.HUD.StarItem = me.Renderable.extend({	
	/** 
	 * constructor
	 */
	init: function(x, y) {
		
		// call the parent constructor 
		// (size does not matter here)
		this.parent(new me.Vector2d(x, y), 10, 10); 
                
		this.font = new me.Font("Courier New", 25, "yellow");
		// local copy of the global score

		// make sure we use screen coordinates
		this.floating = true;
	},
	/**
	 * draw the score
	 */
	draw : function (context) {
// draw it baby !
    this.font.draw(context, "Stars + 5pts", 10, 30);
}
});



game.HUD.LivesItem = me.Renderable.extend({	
	/** 
	 * constructor
	 */
	init: function(x, y) {
		
		// call the parent constructor 
		// (size does not matter here)
		this.parent(new me.Vector2d(x, y), 10, 10); 
                
		this.font = new me.Font("Courier New", 25, "black");
		// local copy of the global lives
		this.lives = 0;

		// make sure we use screen coordinates
		this.floating = true;
	},

	/**
	 * update function
	 */
	update : function () {
		// we don't do anything fancy here, so just
		// return true if the lives has been updated
		if (this.lives !== game.data.lives) {	
			this.lives = game.data.lives;
			return true;
		}
		return false;
	},

	/**
	 * draw the lives
	 */
	draw : function (context) {
// draw it baby !
    this.font.draw(context, "Lives:" + this.lives, 400, 40);
}
});



//game.HUD.LivesItem = me.Renderable.extend({
//    init: function (x, y) {
//        this.parent(new me.Vector2d(x, y), 10, 10);
//
//        this.font = new me.BitmapFont("font", { x: 32, y: 32 });
//        this.font.alignText = "bottom";
//        this.font.set("left", 1);
//
//        this.lives = 0;
//
//        this.floating = true;
//    },
//
//    update: function () {
//
//        if (this.lives !== game.data.lives) {
//            this.score = game.data.lives;
//            return true;
//        }
//        return false;
//    },
//
//    draw: function (context) {
//        this.font.draw(context, "x" + game.data.lives, this.pos.x, this.pos.y);
//
//    }
//});
//
