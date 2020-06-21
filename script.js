$('body').on('click',function() {

    var container = $('#container');
    var car = $('#car');
    var car_1 = $('#car_1');
    var car_2 = $('#car_2');
    var car_3 = $('#car_3');
    var car_4 = $('#car_4');
    var car_5 = $('#car_5');
    var car_6 = $('#car_6');
    var line_1 = $('#line_1');
    var line_2 = $('#line_2');
    var line_3 = $('#line_3');
    var restart_div = $('#restart_div');
    var restart_btn = $('#restart');

    var animation ;
    var container_width = parseInt(container.width());
    var container_height = parseInt(container.height());
    var car_width = parseInt(car.width());

    var game_over = false;

    var speed = 3;
    var line_speed = 5;

    var move_right = false;
    var move_left = false;

    $(document).on('keydown', function(e) {
        if (game_over === false) {
            var key = e.keyCode;
            if (key === 37 && move_left === false) {
                move_left = requestAnimationFrame(left);
            } else if (key === 39 && move_right === false) {
                move_right = requestAnimationFrame(right);
            }
        }
    });

    $(document).on('keyup', function(e) {
        if (game_over === false) {
            var key = e.keyCode;
            if (key === 37) {
                cancelAnimationFrame(move_left);
                move_left = false;
            } else if (key === 39) {
                cancelAnimationFrame(move_right);
                move_right = false;
            }
        }
    });

    function left() {
        if (game_over === false && parseInt(car.css('left')) > 0) {
            car.css('left', parseInt(car.css('left')) - 5);
            move_left = requestAnimationFrame(left);
        }
    }

    function right() {
        if (game_over === false && parseInt(car.css('left')) < container_width - car_width) {
            car.css('left', parseInt(car.css('left')) + 5);
            move_right = requestAnimationFrame(right);
        }
    }

    animation = requestAnimationFrame(repeat);

    function repeat() {
        if (collision(car, car_1) || collision(car, car_2) || collision(car, car_3) || collision(car, car_4) || collision(car, car_5) || collision(car, car_6)) {
            game_over = true;
            cancelAnimationFrame(animation);
            cancelAnimationFrame(move_right);
            cancelAnimationFrame(move_left);
            restart_div.slideDown();
            restart_btn.focus();
            return;
        }

        car_down(car_1);
        car_down(car_2);
        car_down(car_3);
        car_down(car_4);
        car_down(car_5);
        car_down(car_6);

        line_down(line_1);
        line_down(line_2);
        line_down(line_3);

        animation = requestAnimationFrame(repeat);
    }

    function car_down(car) {
        var car_current_top = parseInt(car.css('top'));
        if (car_current_top > container_height) {
            car_current_top = -200;
            var car_left = parseInt(Math.random() * (container_width - car_width));
            car.css('left', car_left);
        }
        car.css('top', car_current_top + speed);
    }

    function line_down(line) {
        var line_current_top = parseInt(line.css('top'));
        if (line_current_top > container_height) {
            line_current_top = -300;
        }
        line.css('top', line_current_top + line_speed);
    }

    restart_btn.click(function() {
        location.reload();
    });

    function collision(car, obs) {
        var x1 = car.offset().left;
        var y1 = car.offset().top;
        var h1 = car.outerHeight(true);
        var w1 = car.outerWidth(true);
        var b1 = y1 + h1;
        var r1 = x1 + w1;
        var x2 = obs.offset().left;
        var y2 = obs.offset().top;
        var h2 = obs.outerHeight(true);
        var w2 = obs.outerWidth(true);
        var b2 = y2 + h2;
        var r2 = x2 + w2;

        if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
        return true;
    }
});
