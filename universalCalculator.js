/**
 * Created by macdja38 on 11/01/17.
 */

class universalCalculator {
  constructor(x, y, z, phi, theta) {
    // Constructor variables
    this.x = x;     // x posiont, length
    this.y = y;     // y position, height
    this.z = z;     // z position, width
    this.phi = phi; // roll
    this.theta = theta;  // pitch
  }

  setPosition(deltaX, deltaY, deltaZ, deltaPhi, deltaTheta) {
    // Mutator function
    this.x = deltaX;
    this.y = deltaY;
    this.z = deltaZ;
    this.phi = deltaPhi;
    this.theta = deltaTheta;
  }

  updateCameraLocation(cameraUpdateFunction) { // updates user view to be proper
    cameraUpdateFunction(this.x, this.y, this.z, this.phi, this.theta);
  }

  processLeapFrame(frame) {
    if (frame.hands.length < 1) return;
    let hand = frame.hands[0];
    
    // grabStrength = slow speed/stop
    let grabStrength = hand.grabStrength;
    if (grabStrength > 0.5) return;
    
    let pitch = hand.pitch();
    let roll = hand.roll();

    // input values for position
    let position = hand.palmPosition;
    let x = position[0];
    let y = position[1]-200;
    let z = position[2];

    // Controls the turning speed of the view
    this.phi += roll / 200;

    // Controls height of the view
    this.theta = pitch;

    // Controls actual movement, slowed by factor of 200 to make visible
    this.x += (Math.cos(-this.phi) * x / 2 - Math.sin(-this.phi) * z) / 200;
    this.z += (Math.sin(-this.phi) * x / 2 + Math.cos(-this.phi) * z) / 200;
    this.y += y / 100;
    
    // Sets border, cannot move past border
    if (this.y < 2) this.y = 2;
    if (this.y > 130) this.y = 130;
    if (this.x > 600) this.x = 600;
    if (this.x < -800) this.x = -800;
    if (this.z < -800) this.z = -800;
    if (this.z > 1000) this.z = 1000;
  }
}
