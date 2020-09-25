class easingscroll {
    constructor() {
        var that = this;
        this.height = $("page").eq(0).height();
        this.scrollTop = $(window).scrollTop();
        this.eq = 0;
        this.scroll_speed = 0;
        this.scrollTop1 = 0;
        this.scrollTop2 = 0;
        this.scroll_timeout = false;
        this.easelist = {
            "default": function (n) {
                return {
                    "top": n
                };
            },
            "quadratic": function (n) {
                return {
                    "top": n * n * 0.01
                };
            },
            "cubic": function (n) {
                return {
                    "top": n * n * n * 0.0001
                };
            },
            "reverse_quadratic": function (n) {
                return {
                    "top": n * n * -0.01
                };
            },
            "reverse_cubic": function (n) {
                return {
                    "top": n * n * n * -0.0001
                };
            }
        }
        $("page").eq(0).addClass("page-display");
        $("body").css({
            "height": that.height * 10 * ($('page').length - 0.5) + "px"
        });

        $(window).resize(function () {
            that.height = $("page").eq(0).height();
        });

        setInterval(function () {
            let instance = $("page").eq(that.eq);
            that.scrollTop = $(window).scrollTop() * 0.1;

            if (that.eq != Math.round(that.scrollTop / that.height)) {
                that.eq = Math.round(that.scrollTop / that.height);
                $(".page-display").removeClass("page-display");
                $("page").eq(that.eq).addClass("page-display");
                instance = $("page").eq(that.eq);
            }
            let top = (that.scrollTop + that.height / 2) % that.height - that.height / 2;
            if (instance.attr("ease")) {
                instance.css(that.easelist[instance.attr("ease")](top));
            } else {
                instance.css(that.easelist["default"](top));
            }
        }, 20);
    }
}
var $easingscroll = new easingscroll();