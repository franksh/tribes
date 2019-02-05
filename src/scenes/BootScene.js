class BootScene extends Phaser.Scene {
    constructor(test) {
        super({
            key: "BootScene"
        });
    }
    preload() {
        const progress = this.add.graphics();

        // Register a load progress event to show a load bar
        this.load.on("progress", value => {
            progress.clear();
            progress.fillStyle(0xffffff, 1);
            progress.fillRect(
                0,
                this.sys.game.config.height / 2,
                this.sys.game.config.width * value,
                60
            );
        });

        // Register a load complete event to launch the title screen when all files are loaded
        this.load.on("complete", () => {
            // prepare all animations, defined in a separate file
            progress.destroy();
            this.scene.start("GameScene");
        });

        // Load assets

        this.load.image("tiles", "assets/tiles/medieval_tilesheet copy.png");

        this.load.image("worker1", "assets/units/medievalUnit_01.png"); //, 32, 48)
        this.load.image("fighter1", "assets/units/medievalUnit_03.png", 64, 64); //, 32, 48)
        this.load.image(
            "berry_icon",
            "assets/units/medievalUnit_02.png",
            32,
            32
        ); //, 32, 48)

        this.load.image("worker2", "assets/units/medievalUnit_07.png"); //, 32, 48)
        this.load.image(
            "house_simple",
            "assets/structures/medievalStructure_17.png",
            128,
            128
        ); //, 32, 48)

        this.load.image("grey_panel", "assets/ui/grey_panel.png");
        this.load.image("white_panel", "assets/ui/white_panel.png");

        // Tilemap with a lot of objects and tile-properties tricks
        // this.load.tilemapTiledJSON('map', 'assets/tilemaps/super-mario.json');

        // // I load the tiles as a spritesheet so I can use it for both sprites and tiles,
        // // Normally you should load it as an image.
        // this.load.spritesheet('tiles', 'assets/images/super-mario.png', {
        //     frameWidth: 16,
        //     frameHeight: 16,
        //     spacing: 2
        // });

        // // Support for switching between 8-bit and 16-bit tiles
        // this.load.spritesheet('tiles-16bit', 'assets/images/super-mario-16bit.png', {
        //     frameWidth: 16,
        //     frameHeight: 16,
        //     spacing: 2
        // });

        // // Spritesheets with fixed sizes. Should be replaced with atlas:
        // this.load.spritesheet('mario', 'assets/images/mario-sprites.png', {
        //     frameWidth: 16,
        //     frameHeight: 32
        // });

        // // Beginning of an atlas to replace the spritesheets above. Always use spriteatlases. I use TexturePacker to prepare them.
        // // Check rawAssets folder for the TexturePacker project I use to prepare these files.
        // this.load.atlas('mario-sprites', 'assets/mario-sprites.png', 'assets/mario-sprites.json');

        // // Music to play. It's not properly edited for an continous loop, but game play experience isn't really the aim of this repository either.
        // this.load.audio('overworld', [
        //     'assets/music/overworld.ogg',
        //     'assets/music/overworld.mp3'
        // ]);

        // // Sound effects in a audioSprite.
        // this.load.audioSprite('sfx', 'assets/audio/sfx.json', [
        //     'assets/audio/sfx.ogg',
        //     'assets/audio/sfx.mp3'
        // ], {
        //     instances: 4
        // });

        // this.load.bitmapFont('font', 'assets/fonts/font.png', 'assets/fonts/font.fnt');

        // // This json contain recorded gamep
        // this.load.json('attractMode', 'assets/json/attractMode.json');
    }
}

export default BootScene;
