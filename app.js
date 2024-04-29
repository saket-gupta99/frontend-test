const container = document.querySelector('#container');
const modal = document.querySelector('#modal');
const modalOverlay = document.querySelector('.modal-overlay');

async function display() {
    try {
        const apiResult = await fetch('https://my-json-server.typicode.com/Codeinwp/front-end-internship-api/posts');
        const result = await apiResult.json();

        createElements(result);

    } catch (err) {
        console.error("Error fetching data: ", err);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    display();
});

function createElements(result) {
    const displayElements = result.map((item, index) => {
        const date = new Date();

        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        return `
            <div class="card" data-index="${index}">
                <img class="img-small" src = ${item.thumbnail.small} >
                <div class="overlay">
                    <span class="overlay-text">Learn More</span>
                </div>
                <div class="details">
                    <span class="circle"></span>
                    <span class="circle"></span>
                    <h2 class="title">${item.title}</h2>
                    <p class="content">${item.content}</p>
                    <div class="author">
                        <span>${item.author.name} - ${item.author.role}</span>
                        <span>${monthNames[date.getMonth()] + " " + date.getDate() + " " + date.getFullYear()}</span>
                    </div>
                </div>
            </div>
        `;
    }).join("");

    container.innerHTML = displayElements;

    //hover effect over image
    hoverEffect();

    //to view modal
    addCardClickListeners(result);
}

function hoverEffect() {
    const cards = document.querySelectorAll('.card');

    //sometimes the hovering effect is applied sometimes not
    cards.forEach((card) => {
        card.addEventListener('mouseover', function (event) {
            if (event.target.classList.contains('img-small')) {
                event.target.nextElementSibling.style.display = 'flex';
            }
        });
        card.addEventListener('mouseout', function (event) {
            if (event.target.classList.contains('img-small')) {
                event.target.nextElementSibling.style.display = 'none';
            }
        });
    });
}

//for modal
function addCardClickListeners(result) {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('click', function (event) {
            const index = event.currentTarget.dataset.index;

             displayModal(result, index);

            //for tapping on image or 'overlay' or 'title'. but doesn't work accurately on other screen
            // if(event.target.classList.contains('img-small') ||
            //    event.target.classList.contains('overlay') ||
            //    event.target.classList.contains('overlay-text') ||
            //    event.target.classList.contains('title')) {
            //         displayModal(result, index);
            // }
        });
    });
}

function displayModal(result, index) {

    modal.innerHTML = `
        <div class="main-card">
            <span class="cross"><i class="fa-solid fa-x"></i></span>
            <img class="img-big" src=${result[index].thumbnail.large}>
            <div class="card-detail">
                <h2 class="card-title">${result[index].title}</h2>
                <p class="card-content">${result[index].content}</p>
                <div class="card-author">
                    <img class="author-img" src=${result[index].author.avatar} />
                    <span class="author-name">${result[index].author.name} - ${result[index].author.role}</span>
                </div>
            </div>
        </div>
    `;
    modal.style.display = 'block';
    modalOverlay.style.display = 'block';

    closeModal();
}

function closeModal() {
    const cross = document.querySelector('.cross');

    cross.addEventListener('click', function() {
        modal.style.display = 'none';
        modalOverlay.style.display = 'none';
    });
}
