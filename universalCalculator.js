/**
 * Created by macdja38 on 11/01/17.
 */

class universalCalculator {
  constructor(x, y, z, phi, theta) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.phi = phi;
    this.theta = theta;
  }

  setPosition(deltaX, deltaY, deltaZ, deltaPhi, deltaTheta) {

  }

  updateCameraLocation(cameraUpdateFunction) {
    cameraUpdateFunction(this.x, this.y, this.z, this.phi, this.theta);
  }

  processLeapFrame(frame) {
    if (frame.hands.length < 1) return;
    let hand = frame.hands[0];
    let grabStrength = hand.grabStrength;
    if (grabStrength > 0.5) return;
    let pitch = hand.pitch();
    let roll = hand.roll();

    let position = hand.palmPosition;
    let x = position[0];
    let y = position[1]-200;
    let z = position[2];

    this.phi += roll / 200;

    this.theta = pitch;

    this.x += (Math.cos(-this.phi) * x / 2 - Math.sin(-this.phi) * z) / 200;
    this.z += (Math.sin(-this.phi) * x / 2 + Math.cos(-this.phi) * z) / 200;
    this.y += y / 100;
    if (this.y < 2) this.y = 2;
    if (this.y > 130) this.y = 130;
    if (this.x > 600) this.x = 600;
    if (this.x < -800) this.x = -800;
    if (this.z < -800) this.z = -800;
    if (this.z > 1000) this.z = 1000;
  }
}
