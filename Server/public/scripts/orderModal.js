var modal = document.getElementById("myModal");

// Получить кнопку, которая открывает модальный
var btn = document.getElementById("order");

// Получить элемент <span>, который закрывает модальный
var span = document.getElementsByClassName("close")[0];

// Когда пользователь нажимает на кнопку, откройте модальный
btn.onclick = function() {
  modal.style.display = "block";
}

span.onclick = function() {
  modal.style.display = "none";
}

// Когда пользователь щелкает в любом месте за пределами модального, закройте его
// window.onclick = function(event) {
//   if (event.target == modal) {
//     modal.style.display = "none";
//   }
// }


const mainForm = document.getElementById('createOrder');
console.log(mainForm.elements);

// Работа с плейсхолдерами

// for userName
const fullNamePlaceholder = fullName.placeholder;

fullName.addEventListener("focus", function(e) {
  fullName.placeholder = "";
});
fullName.addEventListener("blur", function(e) {
  fullName.placeholder = fullNamePlaceholder;
});

// for phone
const phonePlaceholder = phone.placeholder;

phone.addEventListener("focus", function(e) {
  phone.placeholder = "";
});
phone.addEventListener("blur", function(e) {
  phone.placeholder = phonePlaceholder;
})

// for userAdress
const adressPlaceholder = adress.placeholder;

adress.addEventListener("focus", function(e) {
  adress.placeholder = "";
});
adress.addEventListener("blur", function(e) {
  adress.placeholder = adressPlaceholder;
})

// for postIndex
const postIndexPlaceholder = postIndex.placeholder;

postIndex.addEventListener("focus", function(e) {
  postIndex.placeholder = "";
});
postIndex.addEventListener("blur", function(e) {
  postIndex.placeholder = postIndexPlaceholder;
})


// for comment
const commentPlaceholder = comment.placeholder;

comment.addEventListener("focus", function(e) {
  comment.placeholder = "";
});
comment.addEventListener("blur", function(e) {
  comment.placeholder = commentPlaceholder;
})

const orderBtn = document.getElementById('createOrder-btn');


orderBtn.addEventListener("click", function(event){
  event.preventDefault();
  const formData = new FormData(mainForm);
  const fullName = formData.get('fullName');
  const phone = formData.get('phone');
  const adress = formData.get('adress');
  const postIndex = formData.get('postIndex');
  const delivery = formData.get('delivery');
  const comment = formData.get('comment');
  if(!fullName || !phone || !adress || !postIndex || !delivery){
    alert("Некоторое поле не заполнено!");
  }
  else {
    $.ajax({
      url: "/basket/createOrder",
      method: "POST",
      dataType: "json",
      data: $("#createOrder").serialize(),  // Сеарилизуем объект
      success: function(res){
        var result = JSON.stringify(res);
        result = JSON.parse(result);
        alert(result.message);
        window.location.href = "/basket";
      },
      error: function(res) { // Данные не отправлены
        alert('Ошибка. Данные не отправлены. Попробуйте еще раз!');
      }
    })
  }
});