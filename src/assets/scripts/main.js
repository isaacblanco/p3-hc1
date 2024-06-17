document.addEventListener("DOMContentLoaded", function () {
  function addPreloadLink(href) {
    var link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = href;
    link.type = "image/webp";
    link.setAttribute("fetchpriority", "high");
    document.head.appendChild(link);
  }

  if (window.innerWidth < 768) {
    addPreloadLink("../src/assets/pictures/images/hero-small.webp");
  } else {
    addPreloadLink("../src/assets/pictures/images/hero-big.webp");
  }

  let lazyImages = [].slice.call(document.querySelectorAll("img[data-src]"));

  if ("IntersectionObserver" in window) {
    let lazyImageObserver = new IntersectionObserver(function (
      entries,
      observer
    ) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          let lazyImage = entry.target;
          lazyImage.src = lazyImage.dataset.src;
          lazyImage.removeAttribute("data-src");
          lazyImageObserver.unobserve(lazyImage);
        }
      });
    });

    lazyImages.forEach(function (lazyImage) {
      lazyImageObserver.observe(lazyImage);
    });
  } else {
    // Fallback para navegadores sin soporte de IntersectionObserver
    let lazyLoad = function () {
      lazyImages.forEach(function (lazyImage) {
        if (
          lazyImage.getBoundingClientRect().top < window.innerHeight &&
          lazyImage.getBoundingClientRect().bottom > 0
        ) {
          lazyImage.src = lazyImage.dataset.src;
          lazyImage.removeAttribute("data-src");
        }
      });
    };

    lazyLoad();
    window.addEventListener("scroll", lazyLoad);
    window.addEventListener("resize", lazyLoad);
  }
});
