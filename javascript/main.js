/**
 * Main javascript functions
 */

var Site = {};
// Window size
Site.windowSize = "sm";
Site.rellax = null;
Site.headerCollapse = null;
Site.primaryColor = "#10537d";
Site.blueWhale = "#00426c";
Site.burguerColor = "#c7c7c7";
// Site.logoAnimate = false;
Site.gifDuration = 3000;
Site.loading = true;
// Set window size
Site.setWindowSize = function () {
  Site.windowSize = "sm";
  if (window.innerWidth >= 1200) {
    Site.windowSize = "xl";
  } else if (window.innerWidth >= 1024) {
    Site.windowSize = "lg";
  } else if (window.innerWidth >= 768) {
    Site.windowSize = "md";
  } else if (window.innerWidth >= 375) {
    Site.windowSize = "sm";
  }
  Site.setViewPort();
};

Site.getWindowScroll = function () {
  var doc = document.documentElement;
  var left = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
  var top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
  return { left, top };
};

// Loader
Site.loader = function (timeout) {
  // console.log('Init timeout ms', timeout);
  setTimeout(function () {
    // if (!Site.loading) {
    //console.log('Hide loader')
    $("#loader").addClass("hide-loader");
    $("body").removeClass("is-loading");
    window.scrollTo(0, 0);
    // } else {
    //   console.log("Init again loadin");
    //   Site.loader(Site.gifDuration);
    // }
  }, timeout);
};
//#region Header
Site.stickyHeader = function (scrollTop) {
  var header = $("#happy-ocean-header");
  if (scrollTop > 30) {
    header.addClass("sticky");
    $("body").addClass("is-sticky-header");
  } else {
    header.removeClass("sticky");
    $("body").removeClass("is-sticky-header");
  }
};
Site.toggleNav = function () {
  const myCollapse = document.getElementById("navbar-collpase");
  const bsCollapse = new bootstrap.Collapse(myCollapse, {
    toggle: false,
  });
  Site.headerCollapse = bsCollapse;
  // Header
  const $header = $("#happy-ocean-header");
  // Set Initial burger
  // TweenLite.set('.hamburger line', { stroke: '#000' });
  gsap.set(".hamburger .line02", { attr: { x2: 18 } });
  // Burger transition
  const hamburgerMotion = new gsap.timeline()
    // .to(".hamburger line", 0.4, { stroke: Site.blueWhale }, 0)
    .to(
      ".hamburger .line01",
      0.4,
      { attr: { x1: 5, x2: 25, y1: 5, y2: 25 }, ease: Linear.easeInOut },
      0
    )
    .to(
      ".hamburger .line02",
      0.4,
      { attr: { x1: 5, x2: 25, y1: 25, y2: 5 }, ease: Linear.easeInOut },
      0
    )

    .reverse();

  hamburgerMotion.eventCallback("onComplete", function () {});
  hamburgerMotion.eventCallback("onReverseComplete", function () {
    // gsap.set(".hamburger line", { stroke: Site.burguerColor });
    // if ($("body").hasClass("is-sticky-header")) {
    //   gsap.set(".hamburger line", { stroke: Site.burguerColor });
    // } else {
    //   gsap.set(".hamburger line", { stroke: "#fff" });
    // }
  });
  $("#navbar-collpase").on("show.bs.collapse", function () {
    // Toogle Icon
    hamburgerMotion.reversed(!hamburgerMotion.reversed());
    $header.addClass("collapse-active");
  });
  $("#navbar-collpase").on("hide.bs.collapse", function () {
    hamburgerMotion.reversed(!hamburgerMotion.reversed());
    $header.removeClass("collapse-active");
  });
};
//#endregion Header
Site.imageLoaded = function () {
  $("body").imagesLoaded(function () {
    Site.loading = false;
    // Check if have rellax layers
    if (typeof Site.rellax.refresh === "function") {
      Site.rellax.refresh();
      // window.scrollTo(0, 0);
    }
  });
};
// Scroll
Site.scroll = function () {
  gsap.registerPlugin(ScrollTrigger);
  Site.rellax = new Rellax(".rellax");
};
window.onload = function () {
  // var rellax = new Rellax('.rellax', {opt: val});
};
//  Scroll animation
// Site.scrollAnimation = function () {
//   AOS.init();
// }
// View Port
Site.setViewPort = function () {
  // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
  let vh = window.innerHeight * 0.01;
  // Then we set the value in the --vh custom property to the root of the document
  document.documentElement.style.setProperty("--vh", `${vh}px`);
};
// Inline SVG
Site.inlineSVG = function () {
  $("[data-inline-svg]").inlineSvg();
  $("[data-inline-svg]").on("svgInlined", function (e, svgElement) {
    // console.log('svgElement', svgElement)
    const $svgElement = $(svgElement);

    if ($svgElement.hasClass("svg-browser")) {
      const parentData = $svgElement.parent().data();
      $svgElement.find("#url-text").text(parentData.url);
    }
  });
};
//#region Carousels
// Animations
Site.doAnimations = function (
  elements,
  type = "entrance",
  animatedClass = "animate__animated"
) {
  var animationEndEvents =
    "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend";
  elements.each(function () {
    // Element
    var $this = $(this);
    // Default
    var $animationDelay = $this.data("delay-" + type);
    var $animationType = animatedClass + " " + $this.data("animation-" + type);
    if (Site.windowSize === "sm" || Site.windowSize === "md") {
      var mobile = "-mobile";
      // If has mobile
      if ($this.data("animation-" + type + mobile)) {
        $animationDelay = $this.data("delay-" + type + mobile);
        $animationType =
          animatedClass + " " + $this.data("animation-" + type + mobile);
      }
    }
    // Remove invisible
    $this.removeClass("invisible");
    // Animation
    $this.css({
      "animation-delay": $animationDelay,
      "-webkit-animation-delay": $animationDelay,
    });
    // console.log("animationType", $animationType);
    // Animate
    if (animatedClass === "animate__animated") {
      $this.addClass($animationType).one(animationEndEvents, function () {
        $this.removeClass($animationType);
      });
    }
  });
};
Site.featureBoxCarousel = function () {
  $(".carousel-feature-box").each(function () {
    const $carousel = $(this);
    $carousel.slick({
      infinite: false,
      arrows: false,
      dots: true,
      autoplay: true,
      autoplaySpeed: 6000,
      speed: 900,
      rows: 0,
      slidesToShow: 4,
      slidesToScroll: 4,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 4,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
        // You can unslick at a given breakpoint now by adding:
        // settings: "unslick"
        // instead of a settings object
      ],
    });
  });
};
Site.foodCarousel = function () {
  $(".carousel-about-food").each(function () {
    const $carousel = $(this);

    $carousel.on("init", function (e, slick) {
      var $firstAnimatingElements = $(".slick-active").find("[data-animated]");
      Site.doAnimations($firstAnimatingElements);
    });

    $carousel.slick({
      infinite: false,
      arrows: false,
      dots: true,
      autoplay: false,
      autoplaySpeed: 6000,
      speed: 900,
      rows: 0,
      slidesToShow: 1,
    });
    // var allElements = $('div.hero-slider-item').find('[data-animated]');
    // allElements.addClass('invisible');

    $carousel.on("beforeChange", function (e, slick, currentSlide, nextSlide) {
      var $animatingElements = $carousel
        .find('.slick-slide[data-slick-index="' + nextSlide + '"]')
        .find("[data-animated]");
      $carousel.find(".slick-slide").removeClass("tooltip-active");
      Site.doAnimations($animatingElements);
      $(".list-ingredients li .feature-indictor-circle").removeClass(
        "show-tooltip"
      );
    });
    $carousel.on("afterChange", function (e, slick, currentSlide, nextSlide) {
      const notActives = $carousel
        .find(".slick-slide:not(.slick-active)")
        .find("[data-animated]");
      notActives.addClass("invisible");
    });
  });
};
Site.stuffCarousel = function () {
  $(".carousel-more-stuff").each(function () {
    const $carousel = $(this);
    $carousel.slick({
      infinite: false,
      arrows: false,
      dots: false,
      autoplay: true,
      autoplaySpeed: 6000,
      speed: 900,
      rows: 0,
      slidesToShow: 1,
      slidesToScroll: 1,
    });
    const $navigation = $carousel.siblings(".carousel-more-stuff-navigation");
    console.log("$navigation", $navigation);
    $navigation.on("click", "a", function () {
      if ($(this).hasClass("next")) {
        $carousel.slick("slickNext");
      }
      if ($(this).hasClass("prev")) {
        $carousel.slick("slickPrev");
      }
    });
  });
};

Site.directorsCarousel = function () {
  $(".carousel-board-directors").each(function () {
    const $carousel = $(this);
    $carousel.slick({
      infinite: false,
      arrows: false,
      dots: true,
      autoplay: true,
      autoplaySpeed: 6000,
      speed: 900,
      rows: 0,
      slidesToShow: 3,
      slidesToScroll: 3,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
        // You can unslick at a given breakpoint now by adding:
        // settings: "unslick"
        // instead of a settings object
      ],
    });
  });
};
Site.investorsCarousel = function () {
  $(".carousel-our-investors").each(function () {
    const $carousel = $(this);
    $carousel.slick({
      infinite: false,
      arrows: false,
      dots: true,
      autoplay: true,
      autoplaySpeed: 6000,
      speed: 900,
      rows: 0,
      slidesToShow: 4,
      slidesToScroll: 4,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 4,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
        // You can unslick at a given breakpoint now by adding:
        // settings: "unslick"
        // instead of a settings object
      ],
    });
  });
};

Site.allCarousels = function () {
  Site.featureBoxCarousel();
  Site.foodCarousel();
  Site.stuffCarousel();
  Site.directorsCarousel();
  // Site.investorsCarousel();
};
//#endregion Carousels

//#region Forms
// Submit Form generic
Site.submitForm = function (el, action, success, error) {
  console.log("action", action);
  var formData = new FormData(el);
  //@TODO change in production
  // setTimeout(() => {
  //   success();
  // }, 3000);
  console.log("formData", formData);
  $.ajax({
    type: "POST",
    dataType: "json",
    //contentType: 'application/json',
    url: action,
    data: formData,
    processData: false,
    contentType: false,
    success: function (data) {
      if (data.success) {
        success();
      } else {
        error();
      }
    },
    error: function (error) {
      console.log(error);
      error();
    },
  });
};
// On  Sybmit Success
Site.onSubmitSuccess = function (formElement) {
  const validator = $(formElement).data("validator");
  //remove error class on name elements and clear history
  validator.resetForm();
  formElement.reset(); //remove all error and success data
  $(formElement)
    .find(".form-control,select,.form-check-input")
    .removeClass("is-valid");
  $("select").trigger("change");
  if ($(".modal").length > 0) {
    $(".modal").modal("hide");
  }

  // Show Modal Thanks
  Site.thanksOverlayShow(true);
};

// Validate Form
Site.validateForm = function () {
  $.validator.setDefaults({
    submitHandler: function (formElement, event) {
      // console.log(event);
      // console.log("form elemen", formElement);
      // Action
      const action = $(formElement).attr("action");
      const submit = $(formElement).find(":submit");
      submit.addClass("btn-loading");
      submit.attr("disabled", true);
      // Submit Form
      Site.submitForm(
        // Element
        formElement,
        // Action
        action,
        // On Success
        function () {
          Site.onSubmitSuccess(formElement);
          submit.attr("disabled", false);
          submit.removeClass("btn-loading");
        },
        // On Error
        function () {
          alert("An error ocurred submiting the form. Please try again.");
          submit.attr("disabled", false);
          submit.removeClass("btn-loading");
        }
      );
    },
  });
  // Validate Form Default

  $("form.validate-form").each(function () {
    // attach to all form elements on page
    $(this).validate({
      errorElement: "span",
      errorPlacement: function (error, element) {
        // Add the `invalid-feedback` class to the error element
        if (element.closest(".form-check-multiple").length > 0) {
          // Do Nothing
        } else if (element.prop("type") === "checkbox") {
          error.addClass("invalid-feedback");
          error.insertAfter(element.next("label"));
        } else {
          error.addClass("invalid-feedback");
          error.insertAfter(element);
        }
      },
      highlight: function (element, errorClass, validClass) {
        if ($(element).closest(".form-check-multiple").length > 0) {
          const wrapper = $(element).closest(".form-check-multiple-wrapper");
          wrapper.addClass("is-invalid").removeClass("is-valid");
          wrapper
            .find(".form-check-input")
            .addClass("is-invalid")
            .removeClass("is-valid");
        } else {
          $(element).addClass("is-invalid").removeClass("is-valid");
        }
      },
      unhighlight: function (element, errorClass, validClass) {
        if ($(element).closest(".form-check-multiple").length > 0) {
          const wrapper = $(element).closest(".form-check-multiple-wrapper");
          wrapper.addClass("is-valid").removeClass("is-invalid");
          wrapper
            .find(".form-check-input")
            .addClass("is-valid")
            .removeClass("is-invalid");
        } else {
          $(element).addClass("is-valid").removeClass("is-invalid");
        }
      },
    });
  });
};
// Thanks Overlay
Site.thanksOverlayShow = function (show) {
  $thanksOverlay = $("#thansk-overlay");
  if (show) {
    $("body").addClass("overflow-hidden");
    $thanksOverlay.addClass("show");
  } else {
    $("body").removeClass("overflow-hidden");
    $thanksOverlay.removeClass("show");
  }
};
Site.thanksOverlay = function (show) {
  $thanksOverlay = $("#thansk-overlay");
  $thanksOverlay.find(".overlay-close").on("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    Site.thanksOverlayShow(false);
  });
};
// Select Generic
Site.selectGeneric = function () {
  $("select").on("change", function () {
    if (!$(this).val() || $(this).val() === "") {
      $(this).removeClass("not-empty");
    } else {
      $(this).addClass("not-empty");
    }
  });
};
//#endregion Forms

// Video
Site.video = function () {
  $(".video-js").each(function (index, el) {
    // console.log(el);
    const player = videojs(el, {
      controls: true,
      autoplay: false,
      fluid: true,
      preload: true,
      techOrder: ["vimeo", "youtube", "html5"],
      bigPlayButton: true,
      youtube: {
        ytControls: 0,
        customVars: { wmode: "transparent" },
      },

      vimeo: {
        ytControls: 0,
      },
    });
    // console.log('player', player)
    player.ready(function () {
      const iframe = $(this.el_).closest(".video-js").find("iframe");
      iframe
        .contents()
        .find("head")
        .append(
          $(
            "<style type='text/css'>  .vp-controls-wrapper{display:none};  </style>"
          )
        );
    });
    player.on("loaded", function () {
      const iframe = $(this.el_).closest(".video-js").find("iframe");
      iframe
        .contents()
        .find("head")
        .append(
          $(
            "<style type='text/css'>  .vp-controls-wrapper{display:none};  </style>"
          )
        );
    });
    player.on("ended", function () {
      player.pause();
      player.currentTime(0);
      player.hasStarted(false);
      // player.initChildren();
    });
  });
};
// Tooltip
Site.tooltip = function () {
  var tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl, {
      // popperConfig: function (config) {
      //   const flip = config.modifiers.find(({name})=> name === 'flip');
      //   flip.options ={
      //     ...flip.options,
      //     boundary: 'window'
      //   }
      //   return config;
      // }
    });
  });
};
// Food
Site.aboutFood = function () {
  $(".food-main-image").on("mouseenter", function () {
    console.log(
      '$(this).closest(".food-item-slide")',
      $(this).closest(".food-item-slide")
    );
    $(this).closest(".food-item-slide").addClass("tooltip-active");
  });
  $(".food-main-image").on("mouseleave", function () {
    $(this).closest(".food-item-slide").removeClass("tooltip-active");
  });
  $(".food-item-slide").on("mouseenter", ".tooltip-trigger", function () {
    $(this).closest(".food-item-slide").addClass("tooltip-active");
  });
  $(".food-item-slide").on("mouseleave", ".tooltip-trigger", function () {
    $(this).closest(".food-item-slide").removeClass("tooltip-active");
  });
  $(".list-ingredients li .feature-indictor-circle").on(
    "mouseenter",
    function () {
      $(this).addClass("show-tooltip");
    }
  );
  $(".list-ingredients li .feature-indictor-circle").on(
    "mouseleave",
    function () {
      $(this).removeClass("show-tooltip");
    }
  );
};
Site.modalContactForm = function () {};
// Grid Masonry
Site.gridResources = null;
Site.initGrids = function () {
  if (Site.windowSize == "lg" || Site.windowSize === "xl") {
    // init Masonry
    Site.gridResources = $(".resource-grid").masonry({
      itemSelector: ".grid-item",
      percentPosition: true,
      columnWidth: ".grid-sizer",
    });
    // layout Masonry after each image loads
    Site.gridResources.imagesLoaded().progress(function () {
      Site.gridResources.masonry();
    });
  } else {
    if (Site.gridResources) {
      Site.gridResources.masonry("destroy"); // destroy
    }
  }
};
// Modal Resource
Site.modalResource = function () {
  // Modal Text Alternative of Video

  const modal = new bootstrap.Modal(document.getElementById("modal-resource"), {
    backdrop: "static",
    focus: true,
  });
  $('.trigger-modal-resource-close').on("click", function () {
     //  modal.hide();
  })
  $(".trigger-modal-resource").on("click", function () {
    const $parent = $(this).closest(".resource-column");
    // Alternative Text 
    const $alternativeText = $parent.find(".resource-text-alternative");
    // Data
    const data = $parent.data();
    console.log(data);
    $(modal._element).find(".modal-title").html(data.title);
    $(modal._element).find(".dinamic-content").html($alternativeText.html());
    $(modal._element).find("#resource-modal-link").attr('href',data.link ? data.link : 'javascript:void(0)');
    
    modal.show();
  });
};
// Preloader first time
const firstStime = localStorage.getItem("ho_first_time");
if (!firstStime) {
  Site.loader(Site.gifDuration);
  localStorage.setItem("ho_first_time", true);
}
// Main
$(function () {
  // Load
  Site.imageLoaded();
  // Header Sticky
  Site.stickyHeader(Site.getWindowScroll().top);
  // Windows Size
  Site.setWindowSize();
  // View Port
  Site.setViewPort();
  Site.scroll();
  // Masonry Grids
  Site.initGrids();
  // Modal to show resource text
  Site.modalResource();
  // Site.scrollAnimation();
  // Inline SVG
  Site.inlineSVG();
  // Carousels
  Site.allCarousels();
  // Validation
  Site.validateForm();
  // Select Generic
  Site.selectGeneric();
  // Thanks Overlay
  Site.thanksOverlay();
  // Video
  Site.video();
  // Scroll
  // $(window).on("scroll", function (event) {});
  // Toggle Nav
  Site.toggleNav();
  // Tooltip
  Site.tooltip();
  // About the food
  Site.aboutFood();
  $(window).on("scroll", function ($event) {
    // Sticky
    Site.stickyHeader(Site.getWindowScroll().top);
  });
  // Resize
  $(window).on("resize", function ($event) {
    // Window Size
    Site.setWindowSize();
    // View Port
    Site.setViewPort();
    // Update
    // Site.locoScroll.update();
    // Hide Collapse
    Site.headerCollapse.hide();
    // Sticky
    Site.stickyHeader(Site.getWindowScroll().top);
    // Grid
    Site.initGrids();
  });
});
