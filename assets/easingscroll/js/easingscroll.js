class easingscroll {
    constructor() {
        this.height = $(window).height() / 2;
        this.scrollTop = $(window).scrollTop();
        this.eq = 0;
        this.scrollToplog = {};
        this.frame_speed = 30;
        this.scroll_distance = 5;
        this.view_page_change = function () {};

        this.easelist = {
            "default": function (n) {
                return {
                    "top": n * 2,
                    "opacity": 1 - Math.abs(n / 250)
                };
            },
            "quadratic": function (n) {
                return {
                    "top": n * n * 0.008,
                    "opacity": 1 - Math.abs(n / 250)
                };
            },
            "cubic": function (n) {
                return {
                    "top": n * n * n * 0.00002,
                    "opacity": 1 - Math.abs(n / 250)
                };
            },
            "reverse_quadratic": function (n) {
                return {
                    "top": n * n * -0.008,
                    "opacity": 1 - Math.abs(n / 250)
                };
            },
            "reverse_cubic": function (n) {
                return {
                    "top": n * n * n * -0.00002,
                    "opacity": 1 - Math.abs(n / 250)
                };
            }
        }
        $("page").eq(0).addClass("page-display");
        $("page").eq(0).css("height", $(window).height());

        this.reload();

        var scroll = function () {
            let instance = $("page").eq($es.eq);
            $es.scrollTop = $(window).scrollTop() / $es.scroll_distance;

            if ($es.eq != Math.round($es.scrollTop / $es.height)) {
                $es.eq = Math.round($es.scrollTop / $es.height);
                $(".page-display").removeClass("page-display");
                $("page").eq($es.eq).addClass("page-display");
                instance = $("page").eq($es.eq);
                $es.view_page_change($es.eq);
                $("page").eq($es.eq).css("height", $(window).height());
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
    reload() {
        $("body").css({
            "height": this.height * ($('page').length - 1) * this.scroll_distance + this.height * 2
        });
    }
}

var $es;

function easingscroll_load() {
    $es = new easingscroll();
}