const form = document.querySelector('.searchForm');
const inputs = document.querySelector('.tvSearchInput');
const flex = document.querySelector('.flex');

form.addEventListener('submit', async function (e) {
    e.preventDefault();
    try {
        const config = { params: { q: inputs.value } }
        const res = await axios.get(`https://api.tvmaze.com/search/shows`, config)
        const res2 = res.data
        if (flex.children) {
            flex.innerHTML = ""
        };
        res2.forEach(element => {
            const img = document.createElement('img')
            if (element.show.image) {
                img.src = element.show.image.medium;
            } else {
                img.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png';
            };


            img.classList.add('cardImg');
            const h1 = document.createElement('h1');
            h1.innerText = element.show.name;
            h1.classList.add('cardHeader');
            const a = document.createElement('a');
            a.href = element.show.url;
            a.classList.add('cardBtn');
            a.target = '_blank';
            a.innerText = 'View more';
            const card = document.createElement('div');
            card.classList.add('card');

            card.append(img, h1, a);
            flex.appendChild(card);

        });
    } catch (e) {
        if (flex.innerHTML = "") {
            flex.innerHTML = ' <h1>nothing found</h1>';
        } else {
            flex.innerHTML = `<h1>${e}</h1>`
        }
    }
    inputs.value = "";

});
