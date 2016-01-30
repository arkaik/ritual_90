var socket;

bases = ["base1", "base2"];
caps = ["gorra1","gorra2","pentinatA1","pentinatA2", "pentinatA3","pentinatB1","pentinatB2", "pentinatB3"];
tshirts = ["samarreta1", "samarreta2", "samarreta3", "samarreta4", "samarreta5"];
// Clase Player
Player = function (game, x, y) {
	var id_base = game.rnd.between(0, bases.length-1);
    Phaser.Sprite.call(this, game, x, y, bases[id_base]); //Sustituir 'bunny' por imagen jugador

    var id_cap = game.rnd.between(0, caps.length-1);
    this.cap = this.addChild(game.make.sprite(0, 0, caps[id_cap])); //Sustituir 'mummy' por hat y otros objetos característicos.
    this.cap.anchor.setTo(0.5,0.5);

    var id_tshirt = game.rnd.between(0, tshirts.length-1);
    this.tshirt = this.addChild(game.make.sprite(0, 0, tshirts[id_tshirt])); //Sustituir 'mummy' por hat y otros objetos característicos.
    this.tshirt.anchor.setTo(0.5,0.5);

    this.anchor.setTo(0.5,0.5);
    this.scale.setTo(0.25,0.25);
    this.score = 0;

};

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

/**
 * Automatically called by World.update
 */
/*Player.prototype.update = function() {

    this.angle += this.rotateSpeed;

};*/