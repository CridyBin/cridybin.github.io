window.onload = function () {
    var left = document.querySelector(".left")
    var mask = document.querySelector(".mask")
    var dots = document.querySelectorAll("ul li")
    var right = document.querySelector(".right")

    var multiple = 3;


    left.onmousemove = function () {
        // 左边缩略图的宽高
        var leftWidth = left.offsetWidth;
        var leftHeight = left.offsetHeight;
        // console.log(leftWidth, leftHeight);

        // 右边展示区的大小
        var rightWidth = right.offsetWidth
        var rightHeight = right.offsetHeight
        // console.log(rightWidth, rightHeight);

        //  设置遮罩层的宽高
        var maskWidth = leftWidth / multiple
        var maskHeight = leftHeight / multiple
        // console.log(maskWidth, maskHeight);
        mask.style.width = maskWidth + "px";
        mask.style.height = maskHeight + "px";


        // 根据比例设置展示区背景图的大小

        right.style.backgroundSize = multiple * 100 + "%"

        // 获取缩略图的左边距离浏览器的距离 和顶部
        var leftOffsl = left.offsetLeft
        var leftOffst = left.offsetTop
        // console.log(leftOffsl, leftOffst);
        // 鼠标在缩略图上的位置
        // console.log(event);
        var mouseX = event.pageX - leftOffsl
        var mouseY = event.pageY - leftOffst
        // console.log(mouseX, mouseY);

        // 让遮罩层跟鼠标走
        var maskX = mouseX - maskWidth / 2
        var maskY = mouseY - maskHeight / 2

        // 限定放大镜的范围
        if (maskX < 0) {
            maskX = 0
        }
        if (maskX > leftWidth - maskWidth) {
            maskX = leftWidth - maskWidth
        }
        if (maskY < 0) {
            maskY = 0
        }
        if (maskY > leftHeight - maskHeight) {
            maskY = leftHeight - maskHeight
        }

        mask.style.left = maskX + "px"
        mask.style.top = maskY + "px"

        // console.log((rightWidth / maskWidth) * maskX);
        // console.log((rightHeight / maskHeight) * maskY);

        // 让展示区背景移动
        // console.log(-(rightWidth / maskWidth) * maskX + "px " + -(rightHeight / maskHeight) * maskY + "px");
        right.style["background-position"] = -(rightWidth / maskWidth) * maskX + "px " + -(rightHeight / maskHeight) * maskY + "px"

        mask.style.display = "block"
        // right.style.display = "block"

    }
    left.onmouseleave = function () {
        mask.style.display = "none"

        right.style["background-position"] = "0 0"
        // right.style.display = "none"
    }


    for (let i = 0; i < dots.length; i++) {
        dots[i].onclick = function () {
            console.log(dots[i].dataset.pic);
            left.style["background-image"] = "url(" + dots[i].dataset.pic + ")"
            right.style["background-image"] = "url(" + dots[i].dataset.pic + ")"
        }
    }

}