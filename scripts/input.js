let input = [];

{
    //on mouse move
    let onmousemove = function(event) {

    };
    addEventListener("mousemove", onmousemove);

    //table of pressed keys
    input.keyspressed = [];

    //key pressed
    let onkeydown = function(event) {
        input.keyspressed[event.key] = true;
    };
    addEventListener("keydown", onkeydown);

    //key raised
    let onkeyup = function(event) {
        input.keyspressed[event.key] = false;
    };
    addEventListener("keyup", onkeyup);
    
    input.update = function(dt) {
        let px = input.keyspressed["d"] ? 1 : 0;
        let nx = input.keyspressed["a"] ? 1 : 0;
        let py = input.keyspressed["e"] ? 1 : 0;
        let ny = input.keyspressed["q"] ? 1 : 0;
        let pz = input.keyspressed["w"] ? 1 : 0;
        let nz = input.keyspressed["s"] ? 1 : 0;
        camera.position[0] -= 3*dt*(px - nx);
        camera.position[1] -= 3*dt*(py - ny);
        camera.position[2] -= 3*dt*(pz - nz);
    };
}
