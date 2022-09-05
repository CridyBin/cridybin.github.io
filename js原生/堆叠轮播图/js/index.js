window.onload = () => {
    var out = document.querySelector(".out")
    var img = document.querySelectorAll(".img")
    var left = document.querySelector(".left")
    var right = document.querySelector(".right")
    var dots = document.querySelectorAll(".button li")

    //设置一个数组，用来存id
    var idArr = ["first", "second", "right", "left", "left", "left", "last"];

    //设置一个变量用来当图片的索引
    var index = 0;

    initialize();

    //设置一个定时器，让图片轮播
    var timer = setInterval(next, 2000);

    // 当鼠标进入轮播图时定时器停止
    out.addEventListener("mouseover", function () {
        clearInterval(timer)
        timer = null;
    })
    out.addEventListener("mouseout", function () {
        timer = setInterval(next, 2000);
        // console.log(123);
    })

    // 给箭头绑定点击事件
    left.addEventListener("click", prev)
    // 当鼠标指到箭头是 定时器停止
    // left.addEventListener("mouseover", () => {
    //     clearInterval(timer)
    //     timer = null;
    // })
    // 鼠标离开箭头时 定时器重新开始
    // left.addEventListener("mouseout", () => {
    //     timer = setInterval(next, 2000)
    // });

    // 给箭头绑定点击事件
    right.addEventListener("click", next)
    // 当鼠标指到箭头是 定时器停止
    // right.addEventListener("mouseover", () => {
    //     clearInterval(timer)
    //     timer = null;
    // })
    // 鼠标离开箭头时 定时器重新开始
    // right.addEventListener("mouseout", () => {
    //     timer = setInterval(next, 2000)
    // });

    // 给li 添加点击事件
    for (let i = 0; i < dots.length; i++) {
        dots[i].addEventListener("mouseover", () => {
            console.log(i, index);

            if (index > i) {
                let x = index - i;
                while (x--) {
                    prev()
                }
            } else if (index < i) {
                let x = i - index;
                while (x--) {
                    next()
                }
            }
        })
    }

    // 创建切换图片函数
    function prev() {
        // 切换上一张 让数组的最后一个元素变成第一个元素
        idArr.push(idArr.shift())
        initialize();
        if (index == 0) {
            index = dots.length - 1
        } else {
            index--
        }
        clearColor();
    }

    function next() {
        idArr.unshift(idArr.pop());
        initialize();
        if (index === dots.length - 1) {
            index = 0
        } else {
            index++
        }
        clearColor()
    }

    // 创建函数 让li跟随图片改变
    function clearColor() {
        for (let i = 0; i < dots.length; i++) {
            dots[i].className = ""
        }
        dots[index].className = "current"
    }

    // 初始化图片
    function initialize() {
        for (let i = 0; i < img.length; i++) {
            img[i].id = idArr[i]
        }
    }

}