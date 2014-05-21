//game.TitleScreen = me.ScreenObject.extend({
//	/**	
//	 *  action to perform on state change
//	 */
//         init: function() {
//        this.parent(true);
//
//		this.title = null;
//
//		this.font = null;
//		this.staticfont = null;
//
//		this.blinker = "enter to start";
//		this.blinkspeed = 600;
//    },
//	onResetEvent: function() {
//            var titleImage = new me.SpriteObject(0, 0, me.loader.getImage("title-screen"));
//		me.game.world.addChild(titleImage ,1);
//                me.input.bindKey(me.input.KEY.ENTER, "enter", true);
//	},
//	
//	
//	/**	
//	 *  action to perform when leaving this screen (state change)
//	 */
//	onDestroyEvent: function() {
//		me.input.unbindKey(me.input.KEY.ENTER);
//	},
//         update: function() {
//		if (me.input.isKeyPressed('enter')) {
//			me.state.change(me.state.PLAY);
//		}
//		return true;
//    },
//     // draw function
//    draw: function(context) {
//		context.drawImage(this.title, 0, 0);
//
//		if(this.font) {
//			this.font.draw(context, "Deaths: "+game.persistent.other.deathcounter, 560, 460);
//		}
//		this.staticfont.draw(context, "Enter to Start", 20, 460);
//    }
//});
