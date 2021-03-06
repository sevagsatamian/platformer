game.PlayScreen = me.ScreenObject.extend({
	/**
	 *  action to perform on state change
	 */
	onResetEvent: function() {
		// reset the score
		game.data.score = 0;
                game.data.lives = 3;
                 me.levelDirector.loadLevel("level1");
                 this.resetPlayer(0, 420);
                
                // play the audio track
                 me.audio.playTrack("PolarIce.ogg, short.ogg");
		// add our HUD to the game world
		this.HUD = new game.HUD.Container();
		me.game.world.addChild(this.HUD);
	},


	/**
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
		// remove the HUD from the game world
		me.game.world.removeChild(this.HUD);
                me.levelDirector.reloadLevel();
                // stop the current audio track
                me.audio.stopTrack();
	},
        
        resetPlayer: function(x, y){
               var player = me.pool.pull("player", x, y, {});
               me.game.world.addChild(player, 100);
               
        }         
});
