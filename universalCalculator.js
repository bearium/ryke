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
    let y = -position[2];
    let z = position[1] - 200;

    this.theta = pitch + Math.PI / 2;

    this.phi += roll / 5000;

    this.x += (Math.cos(this.phi) * x / 2 - Math.sin(this.phi) * y) / 100;
    this.y += (Math.sin(this.phi) * x / 2 + Math.cos(this.phi) * y) / 100;
    this.z += z / 100;
    if (this.z < 1) this.z = 1;
  }
}