var ms_render_delay = 40;
var time_cache = new Date().toTimeString().slice(0,8);
// var clock_digits_p = document.getElementById("clock-digits-p");

function render_time() {
    var time = new Date().toTimeString().slice(0,8);
    if (time !== time_cache) {
        clock_digits_p.innerHTML = time;
        time_cache = time;
    }
}

function render_loop() {
    setInterval(function(){
        render_time();
    }, ms_render_delay);
}

function remove_by_id(target_id) {
    var target_element = document.getElementById(target_id);
    target_element.remove()
}

// render_loop();
