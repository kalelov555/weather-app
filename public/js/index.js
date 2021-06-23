document.querySelector(".search-btn").addEventListener('click', function() {
    document.querySelector(".search-box").style.display = "inline-block"
})

document.querySelector(".fa-times").addEventListener('click', function () {
    document.querySelector(".search-box").style.display = "none"
})