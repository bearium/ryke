/**
 * Created by macdja38 on 2016-11-20.
 */

var state = {
  location: {
    x: -325,
    y: -306,
    z: 96
  },
  direction: {
    cartesian: {
      x: 0,
      y: 0,
      z: 0
    },
    spherical: {
      theta: Math.PI/2,
      phi: 0
    }
  }
};
var previousFrame = null;


function update_state(frame) {
  if (frame.hands.length > 0) {
    var hand = frame.hands[0];
    var grabStrength = hand.grabStrength;
    if (grabStrength < 0.5) {
      var location = state.location;
      var pitch = hand.pitch();
      var roll = hand.roll();
      var time = frame.timestamp - (previousFrame ? previousFrame.timestamp : frame.timestamp);

      var spherical = state.direction.spherical;

      var position = hand.palmPosition;
      var x = position[0];
      var y = -position[2];
      var z = position[1] - 200;
      // console.log(pitch);

      spherical.theta = pitch + Math.PI / 2;

      spherical.phi += roll * time / (500000);

      // console.log("theta: "+spherical.theta+", phi: "+spherical.phi);

      state.location.x += (Math.cos(spherical.phi) * x / 2 - Math.sin(spherical.phi) * y) / 100;
      state.location.y += (Math.sin(spherical.phi) * x / 2 + Math.cos(spherical.phi) * y) / 100;
      state.location.z += z / 100;
      if (state.location.z < 1) state.location.z = 1;

    }
    //console.log("x: "+location.x+", y: "+location.y+", z: "+location.z + " Phi: " + spherical.phi);
    previousFrame = frame;

    // spherical.phi = 0;
  }
}
