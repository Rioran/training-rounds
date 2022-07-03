var training_is_going = false;
var status_text = "Начинаем!";
var status_pointer = -1;
const statuses = [
    "Внимание!",
    "РАБОТА!",
    "Отдых",
];
const durations = [
    5,
    180,
    55,
];
const button_classes = [
    "btn btn-warning w-100 h-100 text-responsive",
    "btn btn-danger w-100 h-100 text-responsive",
    "btn btn-success w-100 h-100 text-responsive",
];
const button_pause_class = "btn btn-secondary w-100 h-100 text-responsive";

var seconds_before_status_change = 5;
var status_start_dttm;
var status_end_dttm;

const support_span = document.getElementById("support_span");
const main_span = document.getElementById("main_span");
const main_button = document.getElementById("main_button");

const ms_render_delay = 40;
var delta_cache = "00:00";
var interval_object = null;


function ms_to_text(ms) {
    const minutes = parseInt(ms / 1000 / 60);
    const seconds = parseInt(ms / 1000 % 60);
    const seconds_zero = seconds < 10 ? "0" : "";
    return "" + minutes + ":" + seconds_zero + seconds;
}


function render_time() {
    const time = new Date();
    if (time >= status_end_dttm) {
        status_pointer = (status_pointer + 1) % statuses.length;
        status_text = statuses[status_pointer];
        seconds_before_status_change = durations[status_pointer];
        status_start_dttm = status_end_dttm;
        status_end_dttm = new Date(status_start_dttm.getTime() + seconds_before_status_change*1000);
        support_span.innerText = status_text;
        main_button.className = button_classes[status_pointer];
    }
    if (time < status_end_dttm) {
        const delta = ms_to_text(status_end_dttm - time);
        if (delta == delta_cache) {return;}
        main_span.innerHTML = "<br>" + delta;
        delta_cache = delta;
    }
}


function render_loop() {
    interval_object = setInterval(function(){
        render_time();
    }, ms_render_delay);
}


function main_button_clicked() {
    if (status_pointer < 0) {
        status_pointer += 1;
        status_text = statuses[status_pointer];
        support_span.innerText = status_text
        status_start_dttm = new Date();
        status_end_dttm = new Date(status_start_dttm.getTime() + seconds_before_status_change*1000);
        training_is_going = true;
        main_button.className = button_classes[status_pointer];
        render_loop();
        return;
    }
    if (training_is_going) {
        training_is_going = !training_is_going;
        interval_object = clearInterval(interval_object);
        seconds_before_status_change = parseInt((status_end_dttm - new Date()) / 1000) + 1;
        main_button.className = button_pause_class;
        return;
    }
    if (!training_is_going) {
        training_is_going = !training_is_going;
        status_start_dttm = new Date();
        status_end_dttm = new Date(status_start_dttm.getTime() + seconds_before_status_change*1000);
        main_button.className = button_classes[status_pointer];
        render_loop();
        return;
    }
}
