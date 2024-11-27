let btn;
// Работа с товаром

// Просмотр товаров
btn = document.querySelector('#viewProducts-btn');
btn.addEventListener('click',(el) => {
    if(document.querySelector('#viewProducts').style.display == "table"){
        document.querySelector('#viewProducts').style.display = "none";
    }
    else document.querySelector('#viewProducts').style.display = "table";
})

// добавление товара
btn = document.querySelector('#addProduct-btn');
btn.addEventListener('click', (el) => {
    
    if(document.querySelector('#form-addProduct').style.display == "flex"){
        document.querySelector('#form-addProduct').style.display = "none";
    }
    else document.querySelector('#form-addProduct').style.display = "flex";
})

// Редактирование товара
btn = document.querySelector('#updateProduct-btn');
btn.addEventListener('click', (el) => {
    if(document.querySelector('#form-updateProduct').style.display == "flex"){
        document.querySelector('#form-updateProduct').style.display = "none";
    }
    else document.querySelector('#form-updateProduct').style.display = "flex";
})
// Удаление товара
btn = document.querySelector('#deleteProduct-btn');
btn.addEventListener('click', (el) => {
    if(document.querySelector('#form-deleteProduct').style.display == "flex"){
        document.querySelector('#form-deleteProduct').style.display = "none";
    }
    else document.querySelector('#form-deleteProduct').style.display = "flex";
})

// Работа с типами
//  Просмотр Типов

btn = document.querySelector('#viewTypes-btn');
btn.addEventListener('click',(el) => {
    if(document.querySelector('#viewTypes').style.display == "table"){
        document.querySelector('#viewTypes').style.display = "none";
    }
    else document.querySelector('#viewTypes').style.display = "table"
})

// добавление типа
btn = document.querySelector('#addType-btn');
btn.addEventListener('click', (el) => {
    if(document.querySelector('#form-addType').style.display == "flex"){
        document.querySelector('#form-addType').style.display = "none";
    }
    else document.querySelector('#form-addType').style.display = "flex";
})
// Удаление типа
btn = document.querySelector('#deleteType-btn');
btn.addEventListener('click', (el) => {
    if(document.querySelector('#form-deleteType').style.display == "flex"){
        document.querySelector('#form-deleteType').style.display = "none";
    }
    else document.querySelector('#form-deleteType').style.display = "flex";
})

// Работа с брендами

//  Просмотр Брендов

btn = document.querySelector('#viewBrands-btn');
btn.addEventListener('click',(el) => {
    if(document.querySelector('#viewBrands').style.display == "table"){
        document.querySelector('#viewBrands').style.display = "none";
    }
    else document.querySelector('#viewBrands').style.display = "table"
})

// добавление бренда
btn = document.querySelector('#addBrand-btn');
btn.addEventListener('click', (el) => {
    if(document.querySelector('#form-addBrand').style.display == "flex"){
        document.querySelector('#form-addBrand').style.display = "none";
    }
    else document.querySelector('#form-addBrand').style.display = "flex";
})
// Удаление бренда
btn = document.querySelector('#deleteBrand-btn');
btn.addEventListener('click', (el) => {
    if(document.querySelector('#form-deleteBrand').style.display == "flex"){
        document.querySelector('#form-deleteBrand').style.display = "none";
    }
    else document.querySelector('#form-deleteBrand').style.display = "flex";
})

//  Просмотр Картинок

btn = document.querySelector('#viewImgs-btn');
btn.addEventListener('click',(el) => {
    if(document.querySelector('#viewImgs').style.display == "table"){
        document.querySelector('#viewImgs').style.display = "none"
    }
    else document.querySelector('#viewImgs').style.display = "table"
})

// добавление картинки товара
btn = document.querySelector('#addImg-btn');
btn.addEventListener('click', (el) => {
    
    if(document.querySelector('#form-addImg').style.display == "flex"){
        document.querySelector('#form-addImg').style.display = "none";
    }
    else document.querySelector('#form-addImg').style.display = "flex";
})

// Удаление картинки товара
btn = document.querySelector('#deleteImg-btn');
btn.addEventListener('click', (el) => {
    if(document.querySelector('#form-deleteImg').style.display == "flex"){
        document.querySelector('#form-deleteImg').style.display = "none";
    }
    else document.querySelector('#form-deleteImg').style.display = "flex";
})

//  Просмотр Размеров

btn = document.querySelector('#viewSizes-btn');
btn.addEventListener('click',(el) => {
    if(document.querySelector('#viewSizes').style.display == "table"){
        document.querySelector('#viewSizes').style.display = "none";
    }
    else document.querySelector('#viewSizes').style.display = "table"
})

// добавление размера товара
btn = document.querySelector('#addSize-btn');
btn.addEventListener('click', (el) => {
    if(document.querySelector('#form-addSize').style.display == "flex"){
        document.querySelector('#form-addSize').style.display = "none";
    }
    else document.querySelector('#form-addSize').style.display = "flex";
})

// Удаление размера товара
btn = document.querySelector('#deleteSize-btn');
btn.addEventListener('click', (el) => {
    if(document.querySelector('#form-deleteSize').style.display == "flex"){
        document.querySelector('#form-deleteSize').style.display = "none";
    }
    else document.querySelector('#form-deleteSize').style.display = "flex";
})

//  Просмотр Заказов

btn = document.querySelector('#viewOrders-btn');
btn.addEventListener('click',(el) => {
    if(document.querySelector('#viewOrders').style.display == "table"){
        document.querySelector('#viewOrders').style.display = "none";
    }
    else document.querySelector('#viewOrders').style.display = "table"
})
// Удаление заказа
btn = document.querySelector('#deleteOrder-btn');
btn.addEventListener('click', (el) => {
    if(document.querySelector('#form-deleteOrder').style.display == "flex"){
        document.querySelector('#form-deleteOrder').style.display = "none";
    }
    else document.querySelector('#form-deleteOrder').style.display = "flex";
})

//  Просмотр Отзывов

btn = document.querySelector('#viewReviews-btn');
btn.addEventListener('click',(el) => {
    if(document.querySelector('#viewReviews').style.display == "table"){
        document.querySelector('#viewReviews').style.display = "none";
    }
    else document.querySelector('#viewReviews').style.display = "table"
})

// Удаление отзыва
btn = document.querySelector('#deleteReview-btn');
btn.addEventListener('click', (el) => {
    if(document.querySelector('#form-deleteReview').style.display == "flex"){
        document.querySelector('#form-deleteReview').style.display = "none";
    }
    else document.querySelector('#form-deleteReview').style.display = "flex";
})

//  Просмотр пользователей

btn = document.querySelector('#viewUsers-btn');
btn.addEventListener('click',(el) => {
    if(document.querySelector('#viewUsers').style.display == "table"){
        document.querySelector('#viewUsers').style.display = "none";
    }
    else document.querySelector('#viewUsers').style.display = "table"
})

// редактирование пользователя
btn = document.querySelector('#updateUser-btn');
btn.addEventListener('click',(el) => {
    if(document.querySelector('#form-updateUser').style.display == "flex"){
        document.querySelector('#form-updateUser').style.display = "none";
    }
    else document.querySelector('#form-updateUser').style.display = "flex"
})

// Удаление пользователя
btn = document.querySelector('#deleteUser-btn');
btn.addEventListener('click', (el) => {
    if(document.querySelector('#form-deleteUser').style.display == "flex"){
        document.querySelector('#form-deleteUser').style.display = "none";
    }
    else document.querySelector('#form-deleteUser').style.display = "flex";
})