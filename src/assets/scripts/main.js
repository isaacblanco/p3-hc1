+(function () {
  const albumsContainer = document.getElementById("albums");

  // console.log(albumsContainer);

  // Solo se carga en la página de albums
  if (albumsContainer != undefined) {
    // console.log(data.albums);

    data.albums.forEach((album) => {
      const albumDiv = document.createElement("div");
      albumDiv.className = "cat-album";
      albumDiv.innerHTML = `
                <img src="./assets/pictures/albums/${album.cover}" alt="Cover of ${album.title}">
                <h3>${album.title}</h3>
                <p>${album.year}</p>
            `;
      // Nota: por alguna extraña razón no se pintan las imágenes, pero se pintan los títulos y años.
      // Lo dejo por referencia.
      // albumsContainer.appendChild(albumDiv);
    });
  }
})();

document.addEventListener("DOMContentLoaded", function () {
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
    // Navegadores que no soportan IntersectionObserver
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
