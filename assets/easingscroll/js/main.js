class easingscroll {
    constructor() {
        this.height = $("page").eq(0).height();
        this.scrollTop = $(window).scrollTop();
        this.eq = 0;
        this.scrollToplog = {};
        this.frame_speed = 30;
        this.scroll_speed = 50;
        this.scroll_distance = 10;
        this.mobile = $(window).width() <= 1024;
        this.easelist = {
            "default": function (n) {
                return {
                    "top": n * 2
                };
            },
            "quadratic": function (n) {
                return {
                    "top": n * n * 0.008
                };
            },
            "cubic": function (n) {
                return {
                    "top": n * n * n * 0.00002
                };
            },
            "reverse_quadratic": function (n) {
                return {
                    "top": n * n * -0.008
                };
            },
            "reverse_cubic": function (n) {
                return {
                    "top": n * n * n * -0.00002
                };
            }
        }
        $("page").eq(0).addClass("page-display");
        $("body").css({
            "height": this.height * this.scroll_distance * ($('page').length - 0.5) + "px"
        });

        $(window).resize(function () {
            $es.height = $("page").eq(0).height();
        });

        var scroll = function () {
            if (!$es.mobile) {
                $es.scrollToplog[0] = $(window).scrollTop();
                if ($es.scrollToplog[1] == $es.scrollToplog[0]) {
                    if ($es.scrollTop % $es.height > ($es.scroll_speed / $es.scrollToplog[3])) {
                        if ($es.scrollToplog[1] - $es.scrollToplog[2] < 0) {
                            $(window).scrollTop($es.scrollToplog[0] - ($es.scroll_speed / $es.scrollToplog[3]));
                        }
                        if ($es.scrollToplog[1] - $es.scrollToplog[2] > 0) {
                            $(window).scrollTop($es.scrollToplog[0] + ($es.scroll_speed / $es.scrollToplog[3]));
                        }
                    } else if ($es.scrollToplog[3] < 100) {
                        $es.scrollToplog[3] = $es.scrollToplog[3] * 1.5;
                    }
                    $es.scrollToplog[1] = $(window).scrollTop();
                } else {
                    $es.scrollToplog[2] = $es.scrollToplog[1];
                    $es.scrollToplog[1] = $es.scrollToplog[0];
                    $es.scrollToplog[3] = 1;
                }
            }
            let instance = $("page").eq($es.eq);
            $es.scrollTop = $(window).scrollTop() / $es.scroll_distance;

            if ($es.eq != Math.round($es.scrollTop / $es.height)) {
                $es.eq = Math.round($es.scrollTop / $es.height);
                $(".page-display").removeClass("page-display");
                $("page").eq($es.eq).addClass("page-display");
                instance = $("page").eq($es.eq);
            }
            if (instance.attr("ease")) {
                instance.css($es.easelist[instance.attr("ease")]($es.get_easebox_top()));
            } else {
                instance.css($es.easelist["default"]($es.get_easebox_top()));
            }

            setTimeout(scroll, $es.frame_speed);
        };
        setTimeout(scroll, this.frame_speed);

    }
    get_easebox_top() {
        return (this.scrollTop + this.height / 2) % this.height - this.height / 2;
    }
}
var $es = new easingscroll();