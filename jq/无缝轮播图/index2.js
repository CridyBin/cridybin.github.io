var arrowL = document.querySelector('.arrow-l')
var arrowR = document.querySelector('.arrow-r')
var main = document.querySelector('.main')

var mainWidth = main.offsetWidth;
// console.log(mainWidth);
main.addEventListener('mouseenter', function () {
    arrowL.style.display = 'block'
    arrowR.style.display = 'block'
    clearInterval(timer);
    timer = null;//清除定时器变量
})
main.addEventListener('mouseleave', function () {
    arrowL.style.display = 'none'
    arrowR.style.display = 'none'
    timer = setInterval(function () {
        //手动调用点击事件
        arrowR.click();
    }, 2000);
})
// 动态生成小圆圈
var ul = main.querySelector('ul.imgs')
var ol = main.querySelector('ol.circle')
// console.log(ul, ol);
for (var i = 0; i < ul.children.length; i++) {
    var li = document.createElement('li')
    li.setAttribute('index', i)
    ol.appendChild(li)
    li.addEventListener('click', function () {
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = ''
        }
        this.className = 'active'

        var index = this.getAttribute('index')
        num = index
        circle = index;
        animate(ul, -index * mainWidth)
    })
}

ol.children[0].className = 'active'

var first = ul.children[0].cloneNode(true)
ul.appendChild(first)

//7、点击右侧按钮，图片滚动一张
var num = 0;
//circle 控制小圆圈的播放
var circle = 0;
var flag = true;
//节流阀

arrowR.addEventListener('click', function () {
    if (flag) {
        flag = false;//关闭节流阀

        // 如果走到最后一张 此时ul的left值快速恢复成0
        if (num == ul.children.length - 1) {
            ul.style.left = 0
            num = 0
        }
        num++
        animate(ul, -num * mainWidth, function () {
            flag = true
        })
        circle++
        circle = circle == ol.children.length ? 0 : circle
        circleChange()
    }
})
function circleChange() {
    //先清除其余小圆圈的current类名
    for (var i = 0; i < ol.children.length; i++) {
        ol.children[i].className = '';
    }
    //留下当前的小圆圈的current类名
    ol.children[circle].className = 'active'
}

// 左侧按钮
arrowL.addEventListener('click', function () {
    if (flag) {
        flag = false;
        if (num == 0) {
            num = ul.children.length - 1
            ul.style.left = -num * mainWidth + 'px'
        }
        num--;
        animate(ul, -num * mainWidth, function () {
            flag = true
        })

        circle--

        circle = circle < 0 ? ol.children.length - 1 : circle
        circleChange()
    }
})


// animate
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
// 自动轮播
var timer = this.setInterval(function () {
    arrowR.click()
}, 2000)