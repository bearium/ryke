var state = {
    location: {
        x: 0,
        y: -1000,
        z: 100
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
    if (frame["hands"].length != 0) {

        var hand = frame["hands"][0];
        var grabStrength = hand.grabStrength;
        //var palmNormal = hand.palmNormal;
        var pitch = hand.pitch();
        var roll = hand.roll();
        var speed = (1 - grabStrength);
        var time = frame.timestamp - (previousFrame ? previousFrame.timestamp : frame.timestamp);

        var spherical = state["direction"]["spherical"];
        // If the pitch is within the "dead" zone, no movement in the y axis occurs
        if (Math.abs(pitch) > 0.25) {
            spherical["theta"] -= pitch * time / (1000000 * 0.125);
        }
        if (spherical["theta"] < 0) {
            spherical["theta"] = 0;
        } else if (spherical["theta"] > Math.PI) {
            spherical["theta"] = Math.PI;
        }

        //console.log("roll: " + roll + ", spherical: " + spherical["phi"] + ", change: " + roll*time/(1000000*250000));
        if(Math.abs(roll)>0.1) {
            spherical["phi"] -= roll * time / (1000000 * 200);
        }
        //console.log(roll);
        if (spherical["phi"] < 0) {
            spherical["phi"] += 2 * Math.PI;
        } else if (spherical["phi"] >= (2 * Math.PI)) {
            spherical["phi"] -= (2 * Math.PI);
        }
        // console.log("theta: "+spherical["theta"]+", phi: "+spherical["phi"]);

        var cartesian = state["direction"]["cartesian"];
        //var xz = Math.sin(spherical["theta"]);
        cartesian["x"] = Math.sin(spherical["theta"]) * Math.cos(spherical["phi"]);
        //console.log(spherical["phi"] + " - " + Math.cos(spherical["phi"]) + " - " + cartesian["x"]);
        //console.log(Math.cos(spherical["phi"]));
        cartesian["y"] = Math.cos(spherical["theta"]);
        cartesian["z"] = Math.sin(spherical["theta"]) * Math.sin(spherical["phi"])*-1;

        // console.log("x: "+cartesian["x"]+", y: "+cartesian["y"]+"z: "+cartesian["z"]);

        console.assert(Math.abs(Math.pow(cartesian["x"], 2) + Math.pow(cartesian["y"], 2) + Math.pow(cartesian["z"], 2)) - 1 < 0.000001);
        speed = (1 - grabStrength) * time/1000;


        var location = state["location"];
        var xPrime = (location["x"] * Math.cos(spherical["phi"]))-(location["z"] * Math.sin(spherical["phi"]));
        var zPrime = (location["x"] * Math.sin(spherical["phi"]))+(location["z"] * Math.sin(spherical["phi"]));

        location["x"] += speed * cartesian["z"];
        location["y"] += (speed * cartesian["x"])/15 ;
        location["z"] += speed * cartesian["y"] ;


        // console.log("x: "+location["x"]+", y: "+location["y"]+", z: "+location["z"]);
        previousFrame = frame;

        spherical["theta"] = Math.PI/2;

    }
}
