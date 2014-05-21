
/* Game namespace */
var game = {

	// an object where to store game information
	data : {
		// score
		score : 0,
                lives: 3,
                coins: 0
	},
	

	// Run on page load.
	"onload" : function () {
	// Initialize the video.
	if (!me.video.init("screen", 1067, 600, true, 1.0)) {
		alert("Your browser does not support HTML5 canvas.");
		return;
	}

	// add "#debug" to the URL to enable the debug Panel
	if (document.location.hash === "#debug") {
		window.onReady(function () {
			me.plugin.register.defer(debugPanel, "debug");
		});
	}

	// Initialize the audio.
	me.audio.init("mp3,ogg");

	// Set a callback to run when loading is complete.
	me.loader.onload = this.loaded.bind(this);

	// Load the resources.
	me.loader.preload(game.resources);

	// Initialize melonJS and display a loading screen.
	me.state.change(me.state.LOADING);
},

	// Run on game resources loaded.
	"loaded" : function () {
                me.state.set(me.state.MENU, new game.TitleScreen());
                me.state.set(me.state.PLAY, new game.PlayScreen());
                
                me.pool.register("player", game.PlayerEntity, true);
            // set the fade transition effect
                me.state.transition("fade","#FFFFFF", 400);

                me.input.bindKey(me.input.KEY.D, "d");
                me.input.bindKey(me.input.KEY.A, "a");
                me.input.bindKey(me.input.KEY.SPACE, "space");
                me.input.bindKey(me.input.KEY.S, "s");
                
                me.pool.register("player2", game.PlayerEntity, true);
                me.pool.register("fly", game.FlyEntity, true);
                me.pool.register("CoinEntity", game.CoinEntity, true);
                 me.pool.register("BombEntity", game.BombEntity, true);
                me.pool.register("SlimeEntity", game.SlimeEntity, true);
                me.pool.register("FlyEntity", game.FlyEnemyEntity, true);
                me.pool.register("CoinEntity", game.CoinEntity, true);
               // me.entityPool.add("tmxlevelcomplete", TMXLevelEntity);

                me.pool.register("levelTrigger", game.LevelTrigger, true);
                me.pool.register("levelTrigger2", game.LevelTrigger2, true);

                me.pool.register("door1", game.DoorTrigger, true);
                // Start the game.
                me.state.change(me.state.MENU);
                
      // add some keyboard shortcuts
		me.event.subscribe(me.event.KEYDOWN, function (action, keyCode, edge) {

			// toggle fullscreen on/off
			if (keyCode === me.input.KEY.F) {
				if (!me.device.isFullscreen) {
					me.device.requestFullscreen();
				} 
                                else {
					me.device.exitFullscreen();
				}
                        }	
                });

        }
 };     
 