var state = {
  location: {
    x: 0,
    y: -600,
    z: 100
  },
  rlocation: {
    x: 0,
    y: 100,
    z: 600
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

function update_state(frame) {
    if (frame.hands.length != 0) {
        var hand = frame.hands[0];
        var grabStrength = hand.grabStrength;
        var pitch = hand.pitch();
        var roll = hand.roll();
        var yaw = hand.yaw();
        var speed = (1 - grabStrength);
        var height = hand.palmPosition[1];

        calculate_position(speed, pitch, roll, yaw, height);

        state.location.x = state.rlocation.x;
        state.location.y = -state.rlocation.z;
        state.location.z = state.rlocation.y;
    }
}

function calculate_position(speed, pitch, roll, yaw, height) {
    state.rlocation.y += (height - 200) * speed / 10;

    state.direction.spherical.phi += yaw;
    state.direction.spherical.phi = check_radians(state.direction.spherical.phi);
    console.log(state.direction.spherical.phi);

    var spherical = state.direction.spherical;
    spherical.theta = (Math.PI/2 - pitch);
    spherical.theta = Math.max(spherical.theta, 0);
    spherical.theta = Math.min(spherical.theta, Math.PI);
}

function check_radians(rad) {
    if (rad < 0) {
        rad = Math.PI + rad;
    } else if (rad > Math.PI * 2) {
        rad = rad % (Math.PI * 2);
    }
    return rad;
}
