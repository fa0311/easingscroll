class easingscroll {
    constructor() {
        this.height = $("page").eq(0).height();
        this.scrollTop = $(window).scrollTop();
        this.eq = 0;
        this.scrollToplog = {};
        this.frame_speed = 30;
        this.scroll_speed = 50;
        this.easelist = {
            "default": function (n) {
                return {
                    "top": n
                };
            },
            "quadratic": function (n) {
                return {
                    "top": n * n * 0.005
                };
            },
            "cubic": function (n) {
                return {
                    "top": n * n * n * 0.00001
                };
            },
            "reverse_quadratic": function (n) {
                return {
                    "top": n * n * -0.005
                };
            },
            "reverse_cubic": function (n) {
                return {
                    "top": n * n * n * -0.00001
                };
            }
        }
        $("page").eq(0).addClass("page-display");
        $("body").css({
            "height": this.height * 10 * ($('page').length - 0.5) + "px"
        });

        $(window).resize(function () {
            $easingscroll.height = $("page").eq(0).height();
        });

        var scroll = function () {
            $easingscroll.scrollToplog[0] = $(window).scrollTop();
            if ($easingscroll.scrollToplog[1] == $easingscroll.scrollToplog[0]) { //移動していないなら

                if ($easingscroll.scrollTop % $easingscroll.height > 25 && $easingscroll.stop) {
                    if ($easingscroll.scrollToplog[1] - $easingscroll.scrollToplog[2] < 0) {
                        $(window).scrollTop($easingscroll.scrollToplog[0] - $easingscroll.scroll_speed);
                    }
                    if ($easingscroll.scrollToplog[1] - $easingscroll.scrollToplog[2] > 0) {
                        $(window).scrollTop($easingscroll.scrollToplog[0] + $easingscroll.scroll_speed);
                    }
                } else {
                    $easingscroll.stop = false;
                }
                $easingscroll.scrollToplog[1] = $(window).scrollTop();
            } else {
                console.log("qqq")
                $easingscroll.scrollToplog[2] = $easingscroll.scrollToplog[1];
                $easingscroll.scrollToplog[1] = $easingscroll.scrollToplog[0];
                $easingscroll.stop = true;


            }

            let instance = $("page").eq($easingscroll.eq);
            $easingscroll.scrollTop = $(window).scrollTop() * 0.1;

            if ($easingscroll.eq != Math.round($easingscroll.scrollTop / $easingscroll.height)) {
                $easingscroll.eq = Math.round($easingscroll.scrollTop / $easingscroll.height);
                $(".page-display").removeClass("page-display");
                $("page").eq($easingscroll.eq).addClass("page-display");
                instance = $("page").eq($easingscroll.eq);
            }
            if (instance.attr("ease")) {
                instance.css($easingscroll.easelist[instance.attr("ease")]($easingscroll.get_easebox_top()));
            } else {
                instance.css($easingscroll.easelist["default"]($easingscroll.get_easebox_top()));
            }

            setTimeout(scroll, $easingscroll.frame_speed);
        };
        setTimeout(scroll, this.frame_speed);

    }
    get_easebox_top() {
        return (this.scrollTop + this.height / 2) % this.height - this.height / 2;
    }
}
var $easingscroll = new easingscroll();