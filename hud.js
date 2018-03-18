

function HUD (game, parent) {
  Phaser.Plugin.call(this, game, parent);
  this.game = game;

}

HUD.prototype = Object.create(Phaser.Plugin.prototype);
HUD.prototype.constructor = HUD;

HUD.prototype.init = function (game_state, hud_data) {

  this.margins = {
    left: 20,
    right: 50,
    top: 20,
    bottom: 30,
  }

  this.elements = {};

  this.elements_data = {
    "berries_icon": {
      "type": "icon",
      "region": "top_left",
      "x0": 50,
      "y0": 50,
      "scale": 0.7,
      "properties": {
        texture: "berry_icon",
        group: "hud",
      }
    },
    "berries_stat": {
      "type": "stat",
      "x0": 140,
      "y0": 50,
      "scale": 1.0,
      "properties": {
        stat_to_show: "hq1.berrycount",
        text_style: {
          "font": "24px Arial",
          "fill": "#FFFFFF",
          "align": "center",
        }
      }
    },
  }

  // this.regions = {
  //   top_left: {
  //     begin: {x: this.margins.left, y: this.margins.top},
  //     end: {x: (WINDOW_WIDTH / 3) - this.margins.right, y: this.margins.top},
  //     elements: []
  //   }
  // }

  this.createElements(this.elements_data);

}


HUD.prototype.createElements = function (elements_data) {
  // Create the HUD elements
  var elem, element_name, s, element_parameters, region, sprite, position, properties;
  for (element_name in elements_data) {
    if (elements_data.hasOwnProperty(element_name)) {
      element_parameters = elements_data[element_name];
      // region = this.regions[element_parameters.region];
      position = new Phaser.Point(element_parameters.x0, element_parameters.y0);
      properties = element_parameters.properties;

      // Create sprite and save
      if (element_parameters.type == "icon") {
        element = new Phaser.Sprite(game, position.x, position.y, properties.texture);
        element.anchor.set(0.5,0.5);
        // element.setScaleMinMax(0.2,0.2,0.2,0.2);
        // element.scale.setTo(0.2);
      }
      else if (element_parameters.type == "stat") {
        element = new Phaser.Text(game, position.x, position.y, "Test", properties.text_style);

      }
      element.anchor.set(0.5,0.5);
      element.x0 = element_parameters.x0;
      element.y0 = element_parameters.y0;
      s = element_parameters.scale;
      element.setScaleMinMax(s,s,s,s);

      this.game.world.add(element);
      this.elements[element_name] = element;
      // region.elements.push(sprite);

    }
  }

  // update the elements position according to the number of elements in each region
  // for (region_name in this.regions) {
  //   if (this.regions.hasOwnProperty(region_name)) {
  //       this.setElementsPositions(this.regions[region_name]);
  //   }
  // }
};

HUD.prototype.setElementsPositions = function (region) {

  var region_dimensions, number_of_elements;
  region_dimensions = new Phaser.Point(region.end.x - region.begin.x, region.end.y-region.begin.y)
  number_of_elements = region.elements.length;
  if (number_of_elements === 1) {
    // if only one element, put in center
    // x0, y0 are fixed (relative to viewport) positions
    region.elements[0].x0 = region.begin.x + (region_dimensions.x/2);
    region.elements[0].y0 = region.begin.y + (region_dimensions.y/2)
    region.elements[0].reset(region.elements[0].x0, region.elements[0].y0);
    // region.elements[0].reset(region.elements[0].x0/INITIAL_WORLD_SCALE,
    //                          region.elements[0].y0/INITIAL_WORLD_SCALE);
    console.log(region.elements[0].x0)

  }

  region.elements.forEach(function (element) {
    element.fixedToCamera = true;
  }, this);
}

HUD.prototype.resetPositions = function () {
  var region_name, elements_name, element;

  // for (region_name in this.regions) {
  //   if (this.regions.hasOwnProperty(region_name)) {
  //     for (element_name in this.regions[region_name].elements) {
  //       if (this.regions[region_name].elements.hasOwnProperty(element_name)) {
  //
  //         element = this.regions[region_name].elements[element_name];
  //         // Move with camera
  //         element.pivot.setTo(-game.world.pivot.x, -game.world.pivot.y);
  //         element.reset(element.x0/worldScale,element.y0/worldScale);
  //
  //       }
  //     }
  //   }
  // }
  for (element_name in this.elements) {
    if (this.elements.hasOwnProperty(element_name)){
      element = this.elements[element_name];
      // Move with camera
      element.pivot.setTo(-game.world.pivot.x, -game.world.pivot.y);
      element.reset(element.x0/worldScale,element.y0/worldScale);
    }
  }
}

// HUD.prototype.reset = function (sprite, position_x, position_y) {
//   Phaser.Sprite.prototype.reset.call(sprite, position_x, position_y);
//   // create the text to show the stat value
//   var text_style = {
//     "font": "32px Arial",
//     "fill": "#FFFFFF",
//   };
//   sprite.text = new Phaser.Text(game, sprite.x + sprite.width, this.y, "", sprite.properties.text_style);
//   this.text.fixedToCamera = true;
//   this.game_state.groups[this.stats_group].add(this.text);
// }
