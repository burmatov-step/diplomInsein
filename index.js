"use strict";

const toggleMenu = () => {
  const headPhoneNumAccord = document.querySelector(
      ".header-contacts__phone-number-accord"
    ),
    headPhoneNumAccordLink = headPhoneNumAccord.querySelector(
      ".header-contacts__phone-number"
    ),
    headerContactsArrow = document.querySelector(".header-contacts__arrow"),
    menuIcon = document.querySelector(".menu__icon"),
    popupDialogMenu = document.querySelector(".popup-dialog-menu"),
    blockSections = document.querySelectorAll(".block-sections"),
    popupRepairTypes = document.querySelector(".popup-repair-types");

  // Добавление номера
  const addNumber = () => {
    headPhoneNumAccordLink.style.opacity = "1";
    headPhoneNumAccord.style.top = "24px";
    headerContactsArrow.style.transform = "rotateX(180deg)";
  };

  // удаление номера
  const delNumber = () => {
    headPhoneNumAccordLink.style.opacity = "0";
    headPhoneNumAccord.style.top = "0px";
    headerContactsArrow.style.transform = "rotateX(0deg)";
  };

  // Функция скроллтнга
  const scrollTo = (elem) => {
    window.scroll({
      left: 0,
      top: elem.offsetTop,
      behavior: "smooth",
    });
  };

  document.body.addEventListener("click", (e) => {
    const target = e.target;

    // При клике на стрелку выезжает и уезжает номер
    if (target.closest(".header-contacts__arrow")) {
      headerContactsArrow.classList.toggle("active");
      headerContactsArrow.classList.contains("active")
        ? addNumber()
        : delNumber();
    }

    // при клике на меню, выезжает меню
    if (target === menuIcon) {
      popupDialogMenu.style.transform = "translate3d(0,0,0)";
    }

    // закрытие меню при клике на ссылки в меню
    if (
      target.closest(".popup-menu-nav__item") ||
      target.closest(".link-list-menu") ||
      target.closest(".button-footer")
    ) {
      e.preventDefault();
      popupDialogMenu.style.transform = "translate3d(645px,0,0)";
    }
    // плавный скролл
    blockSections.forEach((item) => {
      if (`#${item.id}` === target.hash) {
        scrollTo(item);
      }
    });

    // открытие полного списка услуг и цен
    if (target.closest(".link-list")) {
      e.preventDefault();
      popupRepairTypes.style.visibility = "visible";
    }
  });
};

toggleMenu();

// Отправка формы

const feedback = () => {
  const feedbackPhone = document.querySelectorAll("[name='phone']"),
    formAll = document.querySelectorAll("form"),
    linkPrivacy = document.querySelectorAll(".link-privacy"),
    popupPrivacy = document.querySelector(".popup-privacy"),
    close = popupPrivacy.querySelector('.close');



  feedbackPhone.forEach((e) => {
    maskPhone(e);
  });
// функция запроса
  const postData = (body) => {
    return fetch("server.php", {
      method: "POST",
      headers: {
        "Content-Type": "aplication/json",
      },
      body: JSON.stringify(body),
    });
  };


// Открытие окна политики конфиденц...
  linkPrivacy.forEach((item) => {
    item.addEventListener('click', ()=>{
      popupPrivacy.style.visibility = 'visible';
    })
  });

  close.addEventListener('click', () =>{
    popupPrivacy.style.visibility = "hidden";
  })


  formAll.forEach((item) => {

    // обработчик на форму
    item.addEventListener("submit", (e) => {
      e.preventDefault();
      const check = e.target.querySelector("[type='checkbox']");
      if (check.checked) {
        const formData = new FormData(item);
        let body = {};
        formData.forEach((val, key) => {
          body[key] = val;
        });
        postData(body)
          .then((response) => {
            if (response.status !== 200) {
              throw new Error("status network not 200");
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }

    });
  });
};

feedback();
