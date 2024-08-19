$(document).ready(function(){
    gsap.registerPlugin(ScrollTrigger);

    /*preload script*/
    $(window).on("load", function () {
        setTimeout(function(){
            HideLoad(); // call out animations.
        }, 0);
    });
    function RevealLoad() {
        var tl_transitIn = gsap.timeline({ defaults: { duration: 1, ease: Expo.easeInOut }});
        tl_transitIn.set("#page-transition", { autoAlpha: 1 });
        tl_transitIn.to(".ptr-overlay", { scaleY: 1, transformOrigin: "center bottom" }, 0);
        tl_transitIn.to(".ptr-preloader", { autoAlpha: 1 }, 0.4);
    }

    function HideLoad() {
        var tl_transitOut = gsap.timeline();
        tl_transitOut.to(".ptr-preloader", { duration: 1, autoAlpha: 0, ease: Expo.easeInOut });
        tl_transitOut.to(".ptr-overlay", { duration: 1, scaleY: 0, transformOrigin: "center top", ease: Expo.easeInOut }, 0.3);

        tl_transitOut.from("header", { duration: 1, y: 20, autoAlpha: 0, ease: Expo.easeInOut, clearProps:"all" }, 0.6);

        tl_transitOut.from("#jyContent", { duration: 1.5, autoAlpha: 0, y: 80, ease: Expo.easeOut, clearProps:"all" }, 0.8);
        tl_transitOut.set("#page-transition", { duration: 1, autoAlpha: 0, ease: Expo.easeInOut });
    }

    $("a")
        .not('[href^="javascript"]')
        .not('[target="_blank"]') // omit from selection
        .not('[href^="#"]') // omit from selection
        .not('[href^="mailto"]') // omit from selection
        .not('[href^="tel"]') // omit from selection
        .not(".lg-trigger") // omit from selection
        .not(".tt-btn-disabled a") // omit from selection
        .not(".no-transition") // omit from selection
        .not(".tt-btn-disabled a") // omit from selection.
        .not(".comment-reply-link") // omit from selection
        .not("#cancel-comment-reply-link") // omit from selection
        .not(".lg-share") // omit from selection
        .not(".tt-add-to-cart") // omit from selection
        .not(".remove_from_wishlist") // omit from selection
        .not(".remove") // omit from selection
        .not(".wb-btn-dwqr")
        .not(".elementor-gallery-item")
        .on('click', function(e) {
            e.preventDefault();

            setTimeout(function (url) {
                window.location = url
            }, 0, this.href);

            RevealLoad(); // call in animations.
        });

    /*accordian script*/
    $(".accordion").each(function() {


        $(this).find(".accordion_item").each(function() {
            var $this = $(this);

            if ($this.find(".accordion_con").hasClass("is-open")) {
                $this.addClass("active");
            }
        });

        // Accordion item on click
        $(this).find(".accordion_tit").on("click", function() {
            var $this = $(this);

            if ($this.parents(".accordion_item").hasClass("active")) {
                $this.parents(".accordion_item").removeClass("active");
                $this.next(".accordion_con").slideUp(350);
            } else {
                $this.parent().parent().find(".accordion_item").removeClass("active");
                $this.parent().parent().find(".accordion_con").slideUp(350);
                $this.parents(".accordion_item").toggleClass("active");
                $this.next(".accordion_con").slideToggle(350);
            }
            return false;
        });
    });

    /*mobile gnb*/
    let windowWidth = $(window).outerWidth();
    if(windowWidth < 1201){
        $('.menu_toggle_wrap').on('click', function(){
            $(this).find('.mb_btn').toggleClass('active');
            $('#gnb').fadeToggle();
            if($(this).find('.mb_btn').hasClass('active')){
                $('html, body').css('overflow-y', 'hidden');

                let tl_MenuIn = gsap.timeline({
                    onComplete: function() {
                        $("body").removeClass("tt-m-menu-toggle-no-click");
                    }
                });
                tl_MenuIn.to("#gnb", { duration: 0.4, autoAlpha: 1 });
                tl_MenuIn.from("#gnb > ul > li", { duration: 0.4, y: 80, autoAlpha: 0, stagger: 0.05, ease: Power2.easeOut, clearProps:"all" });
            }else{
                $('html, body').css('overflow-y', 'auto');
            }
        });
    }

    /*scroll animation*/
    $(".anim-zoomin").each(function() {

        $(this).wrap('<div class="anim-zoomin-wrap"></div>');

        $(".anim-zoomin-wrap").css({ "overflow": "hidden" })

        var $this = $(this);
        var $asiWrap = $this.parents(".anim-zoomin-wrap");

        let tl_ZoomIn = gsap.timeline({
            scrollTrigger: {
                trigger: $asiWrap,
                start: "top 90%",
                markers: false,
                onEnter: () => animZoomInRefresh(),
            }
        });
        tl_ZoomIn.from($this, { duration: 1.5, autoAlpha: 0, scale: 1.2, ease: Power2.easeOut, clearProps:"all" });

        function animZoomInRefresh() {
            ScrollTrigger.refresh();
        };
    });

    $(".anim-fadeinup").each(function() {
        let tl_FadeInUp = gsap.timeline({
            scrollTrigger: {
                trigger: this,
                start: "top bottom",
                markers: false
            }
        });

        tl_FadeInUp.from(this, { duration: 2.5, autoAlpha: 0, y: 100, ease: Expo.easeOut, clearProps:"all" }, "+=0.3");
    });

    $(".anim-image-parallax").each(function() {

        // Add wrap <div>.
        $(this).wrap('<div class="anim-image-parallax-wrap"><div class="anim-image-parallax-inner"></div></div>');

        // Add overflow hidden.
        $(".anim-image-parallax-wrap").css({ "overflow": "hidden" });

        var $animImageParallax = $(this);
        var $aipWrap = $animImageParallax.parents(".anim-image-parallax-wrap");
        var $aipInner = $aipWrap.find(".anim-image-parallax-inner");

        // Parallax
        gsap.to($animImageParallax, {
            yPercent: 30,
            ease: "none",
            scrollTrigger: {
                trigger: $aipWrap,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
                markers: false,
            },
        });

        // Zoom in
        let tl_aipZoomIn = gsap.timeline({
            scrollTrigger: {
                trigger: $aipWrap,
                start: "top 90%",
                markers: false,
            }
        });
        tl_aipZoomIn.from($aipInner, { duration: 1.5, autoAlpha: 0, scale: 1.2, ease: Power2.easeOut, clearProps:"all" });

    });

    /*top_btn*/
    $(".scroll-to-top").on("click", function() {
        $("html,body").animate({scrollTop: 0}, 800);
        return false;
    });



})