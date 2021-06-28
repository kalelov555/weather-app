

document.querySelector(".search-btn").addEventListener('click', function() {
    document.querySelector(".search-box").style.display = "inline-block"
})

document.querySelector(".fa-times").addEventListener('click', function () {
    document.querySelector(".search-box").style.display = "none"
})



const matchList = document.querySelector(".match-list");
const search = document.querySelector(".city-input");

let allCities = [];

// fetch("https://countriesnow.space/api/v0.1/countries")
//     .then(res => res.json())
//     .then(data => {
//         for(var i=0; i<data.data.length; i++) {
//             for(var j=0; j<data.data[i].cities.length; j++) {
//                 if (!allCities.includes(data.data[i].cities[j]))
//                 allCities.push(data.data[i].cities[j]);
//             }
//         }
//     });



    console.log(allCities);

let sugCities = [];

search.addEventListener('input', function(e) {
    matchList.innerHTML = "";
    console.log(e.target.value);

    fetch("https://www.metaweather.com/api/location/search/?query=" + e.target.value, {
        mode: 'no-cors'
    })
    .then(res => res.json())
    .then(data => {
        data.forEach(element => {
            allCities.push(element.title);
        });
    });

    if(e.target.value) {
    sugCities = allCities.filter(city => city.toLowerCase().includes(e.target.value))

    console.log(sugCities);
    }

    if(sugCities.length >3) {
        for(var i=0; i<3; i++) {
            const div = document.createElement('div');
            div.innerHTML = sugCities[i];
            div.classList.add("match-els-style");
            matchList.appendChild(div);
        }
    }

    else {
        for(var i=0; i<sugCities.length; i++) {
            const div = document.createElement('div');
            div.innerHTML = sugCities[i];
            div.classList.add("match-els-style");
            matchList.appendChild(div);
        }
    }
})