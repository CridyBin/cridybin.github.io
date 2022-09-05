window.onload = function () {
    var imgs = document.querySelectorAll(".stage div")
    imgs.forEach(function (img, i) {
        img.onclick = function () {
            imgs.forEach(function (value, index) {
                value.style.width = (index === i) ? "450px" : "50px"
            })
        }
    })
}