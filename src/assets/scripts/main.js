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
