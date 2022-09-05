function swiper(main, option, speed) {
    var option = option
    var main = $(main)
    var timer = null
    var arrowL = $('.arrow-l')
    var arrowR = $('.arrow-r')
    $('.arrow-l').fadeOut()
    $('.arrow-r').fadeOut()
    $(main).mouseenter(function () {
        $('.arrow-l').fadeIn()
        $('.arrow-r').fadeIn()
        if (option) {
            clearInterval(timer);
            timer = null;//清除定时器变量
        }
    })
    $(main).mouseleave(function () {
        $('.arrow-l').fadeOut()
        $('.arrow-r').fadeOut()
        if (option) {
            timer = setInterval(function () {
                //手动调用点击事件
                arrowR.click();
            }, speed || 2000);
        }
    })
    var num = 0
    var circle = 0
    var flag = true
    // 动态生成小圆圈
    var ul = $('ul.imgs')
    var ol = $('ol.circle')
    var mainWidth = main[0].offsetWidth;

    for (var i = 0; i < ul[0].children.length; i++) {
        var li = document.createElement('li')
        // li.setAttribute('index', i)
        ol.append(li)
        $(li).click(function () {
            $(this).addClass('active').siblings().removeClass('active')
            var index = $(this).index()
            num = index
            circle = index

            animate(ul[0], -index * mainWidth)
        })
    }

    $('ol.circle li').first().addClass('active')
    $('ul.imgs').append($('ul.imgs li').first().clone(true))
    $('.arrow-r').click(function () {
        if (flag) {
            flag = false;

            if (num == $('ul.imgs li').length - 1) {
                ul.css({
                    left: 0
                })
                num = 0;
            }
            num++
            animate(ul[0], -num * mainWidth, function () {
                flag = true
            })
            circle++
            circle = circle == $('ol.circle li').length ? 0 : circle
            circleChange()
        }
    })

    $('.arrow-l').click(function () {
        if (flag) {
            flag = false;

            if (num == 0) {
                num = $('ul.imgs li').length - 1;
                ul.css({
                    left: -num * mainWidth + 'px'
                })

            }
            num--;
            animate(ul[0], -num * mainWidth, function () {
                flag = true
            })
            circle--
            circle = circle < 0 ? $('ol.circle li').length - 1 : circle
            circleChange()
        }
    })


    function circleChange() {
        $('ol.circle li').eq(circle).addClass('active').siblings().removeClass('active')
    }

    function animate(obj, target, callback) {
        // console.log(callback);//callback=function(){} 调用的时候 callback()
        //当我们不断点击按钮，这个元素的速度会越来越快，因为每点击一次就开启一个定时器 开启了太多定时器
        //解决方案  让元素只有一个定时器执行
        clearInterval(obj.timer1);//清除以前的定时器，只保留当前的一个定时器执行
        obj.timer1 = setInterval(function () {
            //把步长值写道定时器里面
            //把步长值改为整数 不要出现小数的问题 往上取整
            // var step = Math.ceil((target - obj.offsetLeft) / 10);
            //解决盒子移动时距离的不准确  原因是除法得出小数除不尽 向前-向上取整 向后-向下取整
            var step = (target - obj.offsetLeft) / 10;
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            if (obj.offsetLeft == target) {
                clearInterval(obj.timer1);
                //回调函数写到 定时器结束里面
                // if (callback) {//判断有没有callback这个参数传进来
                //     //调用函数
                //     callback();
                // }
                callback && callback();
            } else {
                //把每次加1 这个步长值改成一个慢慢变小的值 步长公式：（目标值-现在的位置）/ 10
                obj.style.left = obj.offsetLeft + step + 'px';
            }
        }, 15);
    }

    if (option) {
        // 自动轮播
        var timer = setInterval(function () {
            arrowR.click()
        }, speed || 2000)
    }

}


$(function () {
    $.fn.swiper = swiper
})

console.log($.fn);

