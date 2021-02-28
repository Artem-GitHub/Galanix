"use strict";

var images = ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg', '9.jpg', '10.jpg', '11.jpg', '12.jpg'];
var imagesBlock = document.querySelector('.images__wrapper');

function createElement(tag, name) {
  var url = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var content = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  var element = document.createElement(tag);
  element.classList.add(name);
  element.src = url;
  element.innerHTML = content;
  return element;
}

function createImages() {
  images.forEach(function (item) {
    var image = createElement('img', 'images__image', "img/".concat(item));
    var imagesContent = createElement('div', 'images__content');
    var imagesItem = createElement('div', 'images__item');
    imagesContent.appendChild(image);
    imagesItem.appendChild(imagesContent);
    imagesBlock.appendChild(imagesItem);
  });
}

;
createImages();
var imageItems = imagesBlock.querySelectorAll('.images__item');
var imageQty = document.querySelector('.quantity');
var dateElement = document.querySelector('.date');

function currentQty() {
  var qty = imageItems.length;
  imageQty.textContent = "Current qty: ".concat(qty, " pcs");
}

currentQty();

function currentDate() {
  var date = new Intl.DateTimeFormat("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date());
  dateElement.textContent = "Current date: ".concat(date);
}

currentDate();
setInterval(function () {
  return currentDate();
}, 60000);

function createPopup() {
  imageItems.forEach(function (item, i) {
    item.addEventListener('click', function () {
      var popup = createElement('div', 'popup');
      var popupContent = createElement('div', 'popup__content');
      var img = createElement('img', 'popup__image', 'img/' + images[i]);
      var btn = createElement('button', 'popup__button', null, '&#10006');
      popupContent.appendChild(img);
      popupContent.appendChild(btn);
      popup.appendChild(popupContent);
      imagesBlock.appendChild(popup);
      setTimeout(function () {
        return popup.classList.add('popup__visible');
      }, 10);
      btn.addEventListener('click', function () {
        imagesBlock.removeChild(popup);
      });
    });
  });
}

createPopup();