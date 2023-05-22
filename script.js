window.location.href = "#tab_01";


dataArray=[];//пустой массив в который будет пушется избранные города
const nowTab = document.querySelector('#tab_01'); //выбираю весь контейнер now
const input = document.getElementById('input'); // выбираю весь инпут
const iconElement = document.querySelector('.weather__block-icon');// выбираю картинку
const likeIcon = document.querySelector('.weather__block-content-like');//выбираю сердечко


function data  (event){
     event.preventDefault()

    const serverUrl = 'http://api.openweathermap.org/data/2.5/weather';
    const cityName = input.value;
    const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f';
    const url = `${serverUrl}?q=${cityName}&appid=${apiKey}&units=metric`;

    fetch(url)// отправляю данные на сервер
    .then(response => {
        return response.json() // получаю данные с сервера в формате json
    })
    .then(data => {
        console.log(data)
        const temperature = data.main.temp;    // создаю переменную теспературы в которую кладу температуру с сервера
        const cityName = data.name;//создаю переменную имя города в которое кладу имя города с сервера
        const aicon = data.weather[0].icon;//создаю переменную картинки и кладу картинку с сервера
        const weather = data.weather[0].description //создаю переменную погода в которое кладу нанные с сервера
        const feelsLike=data.main.feels_like //создаю переменную в которое кладу  ощущаемую температуру с сервера
        const sunrise = new Date(data.sys.sunrise * 1000); // Преобразуйте время в миллисекунды
        const sunset = new Date(data.sys.sunset * 1000); // Преобразуйте время в миллисекунды


        const sunriseTimeString = sunrise.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });//преоброзование даты
        const sunsetTimeString = sunset.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });//преоброзование даты

        console.log(sunrise);
        console.log(sunset);
        console.log(feelsLike)
        nowTab.querySelector('.weather__block-temp').textContent = `${temperature}°`; //меняю полученную температуру с сервера на самой страничке
        nowTab.querySelector('.weather__block-content-city').textContent = cityName;// меняю полученное имя с сервера на смой страничке
        iconElement.setAttribute('src', `http://openweathermap.org/img/w/${aicon}.png`);// меняю полученную картинку с сервера на страничке


        const detailsTitleElement = document.querySelector('.weather__details-title');//выбор на вкладке detailsTitle название города
        const detailsTemperatureElement = document.querySelector('.details_temperature');//выбор на вкладке detailsTitle температуры
        const detailsFeelsLikesElement = document.querySelector('.details_feels_likes');//выбор на вкладве detailsTitle  ощущаемую температуру
        const detailsWeatherElement = document.querySelector('.details_weather')// выбор на вкладке detailsTitle  погода

        detailsTitleElement.textContent = cityName;// замена на вкладке detailsTitle название города
        detailsTemperatureElement.textContent = `Temperature: ${temperature}°`;// замена на вкладке detailsTitl температуры
        detailsFeelsLikesElement.textContent = `Feels like: ${feelsLike}°`;// замена на вкладке detailsTitle ощущаемой температуру
        detailsWeatherElement.textContent = `Weather: ${weather}` ;// замена на вкладке detailsTitle погоды


        const detailsSunriseElement = document.querySelector('.details_sunrise');//выбор элеменат время восхода
        const detailsSunsetElement = document.querySelector('.details_sunset');// выбор элемента заката
        detailsSunriseElement.textContent = `Sunrise: ${sunriseTimeString}`;// вствка времени восхода
        detailsSunsetElement.textContent = `Sunset: ${sunsetTimeString}`;// вставка времени заката
    })
}
form.addEventListener('submit',data) // слущатель инпута и кнопки

function addWeather(event) {
    event.preventDefault();
    const temperature = nowTab.querySelector('.weather__block-temp').textContent; // выбираю температуру из странички
    const cityName = nowTab.querySelector('.weather__block-content-city').textContent;//выбираю название города
    const icon = iconElement.getAttribute('src');// выбираю картинку

    const weatherData = {
        temperature,
        cityName,
        icon
    };// создаю объект в котором температура название города и картинка

    dataArray.push(weatherData); // пушу объект  с названием города температурой и картинкой в пустой массив
    console.log(dataArray);

    const listElement = document.querySelector('.weather__location-save .list');// выбираю элемент который хочу очистить

    listElement.innerHTML = ''; // очищаю элемент

    // Создаю элементы списка для каждого элемента в dataArray
    dataArray.forEach((weatherItem) => {
        const newItem = document.createElement('li'); //создаю ли
        newItem.classList.add('list__item'); // присваиваю ли класс
        newItem.textContent = weatherItem.cityName; // беру из массива имя города и вывожу на страничке

        const removeButton = document.createElement('button');//создаю кнопку удаления
        removeButton.classList.add('list__item-remove');//создаю клас кнопке
        removeButton.textContent = 'Remove'; //текст в кнопке

        newItem.addEventListener('click', () => {
            fetchDataForCity(weatherItem.cityName);
        });// прослушивание на нажатие на название города

        removeButton.addEventListener('click', () => {
            // Нахожу индекс элемента в массиве по названию
            const index = dataArray.findIndex(item => item.cityName === weatherItem.cityName);
            if (index !== -1) {
                // Удаляю элемент из массива
                dataArray.splice(index, 1);
                // Удаляю элемент из страницы
                listElement.removeChild(newItem);
                listElement.removeChild(removeButton);
            }

        });

        listElement.appendChild(newItem);// добавление в самый конец элемента из массива на страницу
        listElement.appendChild(removeButton);// добавление кнопки в коцен
    });
    function fetchDataForCity(cityName) {
        const serverUrl = 'http://api.openweathermap.org/data/2.5/weather';
        const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f';
        const url = `${serverUrl}?q=${cityName}&appid=${apiKey}&units=metric`;

        fetch(url)
            .then(response => {
                return response.json()
            })
            .then(data => {
                console.log(data)
                const temperature = data.main.temp;
                const cityName = data.name;
                const aicon = data.weather[0].icon
                console.log(aicon)
                nowTab.querySelector('.weather__block-temp').textContent = `${temperature}°`;
                nowTab.querySelector('.weather__block-content-city').textContent = cityName;
                iconElement.setAttribute('src', `http://openweathermap.org/img/w/${aicon}.png`);
            })
        renderSavedCities();// вызов рендера
    }
    renderSavedCities(); // вызов рендера

    // Сохраняем данные в localStorage
    localStorage.setItem('weatherData', JSON.stringify(dataArray));
}



function renderSavedCities() {
    const listElement = document.querySelector('.weather__location-save .list');
    listElement.innerHTML = '';

    dataArray.forEach((weatherItem) => {
        const newItem = document.createElement('li');
        newItem.classList.add('list__item');
        newItem.textContent = weatherItem.cityName;

        const removeButton = document.createElement('button');
        removeButton.classList.add('list__item-remove');
        removeButton.textContent = 'Remove';

        newItem.addEventListener('click', () => {
            fetchDataForCity(weatherItem.cityName);
        });

        removeButton.addEventListener('click', () => {
            const index = dataArray.findIndex(item => item.cityName === weatherItem.cityName);
            if (index !== -1) {
                dataArray.splice(index, 1);
                listElement.removeChild(newItem);
                listElement.removeChild(removeButton);
                // Сохраняем обновленные данные в localStorage
                localStorage.setItem('weatherData', JSON.stringify(dataArray));
            }
        });

        listElement.appendChild(newItem);
        listElement.appendChild(removeButton);
    });
}

window.addEventListener('DOMContentLoaded', () => {
    const savedData = localStorage.getItem('weatherData');
    if (savedData) {
        dataArray = JSON.parse(savedData);
        renderSavedCities();
    }
});

likeIcon.addEventListener('click', addWeather);



