caps = ["gorra1","gorra2","pentinatA1","pentinatA2", "pentinatA3"];

// Clase Player
Player = function (game, x, y) {

    Phaser.Sprite.call(this, game, x, y, 'base1'); //Sustituir 'bunny' por imagen jugador

    var id_cap = game.rnd.between(0, caps.length-1);
    this.cap = this.addChild(game.make.sprite(0, 0, caps[id_cap])); //Sustituir 'mummy' por hat y otros objetos característicos.
    this.cap.anchor.setTo(0.5,0.5);

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