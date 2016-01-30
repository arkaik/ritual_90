// sPlayer.js

function Player(data) {
	this.id = data.id;
	this.score			= 0;
	this.username 		= data.username;
	this.headSpriteId 	= data.headSpriteId;
	this.shirtSpriteId 	= data.shirtSpriteId;
	this.legsSpriteId 	= data.legsSpriteId;
	this.bodySpriteId 	= data.bodySpriteId;
}

module.exports = Player;