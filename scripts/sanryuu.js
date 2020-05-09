/*
label initscreen:
    screen->setup
    intro->start
    buttons->create

goto initscreen

join game?
    map->load
    character->spawn
    loop:
        input->fetch
        map->update
        character->update
        camera->update
*/

let main = [];

{
    //cached functions
    let sin   = Math.sin;
    let cos   = Math.cos;
    let tick  = Date.now;
    let print = console.log;

    //constants
    let pi = Math.PI;

    let proj = mat.calcproj(2/5*pi, 240/320);

    let t0 = tick()/1000;
    let update = function() {
        let t1 = tick()/1000;
        let dt = t1 - t0;

        input.update(dt);

        //update olds
        t0 = t1;
    };
    setInterval(update, 0);

    let render = function() {
        let time = tick()/1000;

        let view = [
            [cos(time), 0, -sin(time), camera.position[0]],
            [0        , 1,          0, camera.position[1]],
            [sin(time), 0,  cos(time), camera.position[2]],
            [0        , 0,          0,                  1]
        ];

        graphics.update(view, proj);
        
        requestAnimationFrame(render);
    };
    requestAnimationFrame(render);
}
