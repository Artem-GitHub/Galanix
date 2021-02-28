const images = ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg', '9.jpg', '10.jpg', '11.jpg', '12.jpg'];
const imagesBlock = document.querySelector('.images__wrapper');

function createElement(tag, name, url = null, content = null) {
  const element = document.createElement(tag);
  element.classList.add(name);
  element.src = url;
  element.innerHTML = content;
  return element;
}

function createImages() {
  images.forEach(item => {
    const image = createElement('img', 'images__image', `img/${item}`);
    const imagesContent = createElement('div', 'images__content');
    const imagesItem = createElement('div', 'images__item');
    imagesContent.appendChild(image);
    imagesItem.appendChild(imagesContent);
    imagesBlock.appendChild(imagesItem);
  });
};
createImages();

const imageItems = imagesBlock.querySelectorAll('.images__item');
const imageQty = document.querySelector('.quantity');
const dateElement = document.querySelector('.date');

function currentQty() {
  const qty = imageItems.length;
  imageQty.textContent = `Current qty: ${qty} pcs`
}
currentQty();

function currentDate() {
  const date = new Intl.DateTimeFormat("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year:"numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date());
  dateElement.textContent = `Current date: ${date}`
}
currentDate();
setInterval(() => currentDate(), 60000);

function createPopup() {
  imageItems.forEach((item, i) => {
    item.addEventListener('click', () => {
      const popup = createElement('div', 'popup');
      const popupContent = createElement('div', 'popup__content');
      const img = createElement('img', 'popup__image', 'img/' + images[i]);
      const btn = createElement('button', 'popup__button', null, '&#10006');
      popupContent.appendChild(img);
      popupContent.appendChild(btn);
      popup.appendChild(popupContent);
      imagesBlock.appendChild(popup);

      setTimeout(() => popup.classList.add('popup__visible'), 10);
      btn.addEventListener('click', () => {
        imagesBlock.removeChild(popup);
      });
    });
  })
}
createPopup()
