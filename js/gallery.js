// 'use strict'
import gallery from "./gallery-items.js";




const refs = {
  galleryList: document.querySelector(".js-gallery"),
  lightbox: document.querySelector(".js-lightbox"),
  btn: document.querySelector('[data-action="close-lightbox"]')
};

const imageCreate = (item, parent) => {
  const { preview, original, description } = item;
  const img = document.createElement("img");

  img.classList.add("gallery__image");
  img.dataset.source = preview;
  img.src = original;
  img.alt = description;

  parent.appendChild(img);
};

const linkCreate = (item, parent) => {
  const { original } = item;
  const a = document.createElement("a");

  a.classList.add("gallery__link");
  a.href = original;

  imageCreate(item, a);

  parent.appendChild(a);};

const createItem = item => {
  const li = document.createElement("li");
  li.classList.add("gallery__item");

  linkCreate(item, li);

  return li;
};

const listItems = arr => {
  const items = arr.map(item => createItem(item));

  refs.galleryList.append(...items);
};

listItems(gallery);

function onClickHandler(e) {
  e.preventDefault();

  if (e.target.nodeName === "IMG") {
    refs.lightbox.classList.add("is-open");
    refs.lightbox.querySelector(".lightbox__image").src = e.target.src;
    refs.lightbox.querySelector(".lightbox__image").alt = e.target.alt;
  }
}

function onCloseHandler(e) {
  if (e.target.nodeName === "I" || e.target.nodeName === "BUTTON") {
    refs.lightbox.classList.remove("is-open");
  }
}

refs.galleryList.addEventListener("click", onClickHandler);
refs.btn.addEventListener("click", onCloseHandler);
