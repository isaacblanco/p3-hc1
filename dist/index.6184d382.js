void 0!=document.getElementById("albums")&&data.albums.forEach(e=>{let t=document.createElement("div");t.className="cat-album",t.innerHTML=`
                <img src="./assets/pictures/albums/${e.cover}" alt="Cover of ${e.title}">
                <h3>${e.title}</h3>
                <p>${e.year}</p>
            `});