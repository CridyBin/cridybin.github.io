// 鼠标经过页面时显示切换箭头 离开时消失
$('.arrow-l').fadeOut()
$('.arrow-r').fadeOut()
$('.main').mouseenter(function () {
    // console.log("aa");
    $('.arrow-l').fadeIn()
    $('.arrow-r').fadeIn()
})
$('.main').mouseleave(function () {
    // console.log("aa");
    $('.arrow-l').fadeOut()
    $('.arrow-r').fadeOut()
})

// 动态生成小点


for (let i = 0; i < $('ul.imgs li').length; i++) {
    var liNode = document.createElement('li');
    $('.circle').append(liNode)
}
$('.circle li').first().addClass('active')
$('.circle li').click(function () {
    $(this).addClass('active').siblings().removeClass('active')
    showImg($(this).index())
})

// 箭头切换
$('.arrow-l').click(function () {
    // console.log($('.circle li').filter('.active').index());
    var index = $('.circle li').filter('.active').index()
    // console.log(index);
    if (index > 0) {
        $('.circle li').eq(index - 1).addClass('active').siblings().removeClass('active')
        showImg(index - 1)
    } else {
        index = $('ul.imgs li').length - 1
        $('.circle li').eq(index - 1).addClass('active').siblings().removeClass('active')
        showImg(index - 1)
    }
})
$('.arrow-r').click(function () {
    // console.log($('.circle li').filter('.active').index());
    var index = $('.circle li').filter('.active').index()
    console.log(index);
    if (index < $('ul.imgs li').length - 2) {
        $('.circle li').eq(index + 1).addClass('active').siblings().removeClass('active')
        showImg(index + 1)
    } else {
        index = 0
        $('.circle li').eq(index).addClass('active').siblings().removeClass('active')
        showImg(index)
    }
})
// 复制第一个照片添加到最后一个
$('ul.imgs').append($('.imgs li').first().clone());



function showImg(n) {
    $('ul.imgs').css({
        left: -n * 800 + 'px',
    })
}
// function animate(obj, target, callback) {
//     // console.log(callback);//callback=function(){} 调用的时候 callback()
//     //当我们不断点击按钮，这个元素的速度会越来越快，因为每点击一次就开启一个定时器 开启了太多定时器
//     //解决方案  让元素只有一个定时器执行
//     clearInterval(obj.timer1);//清除以前的定时器，只保留当前的一个定时器执行
//     obj.timer1 = setInterval(function () {
//         //把步长值写道定时器里面
//         //把步长值改为整数 不要出现小数的问题 往上取整
//         // var step = Math.ceil((target - obj.offsetLeft) / 10);
//         //解决盒子移动时距离的不准确  原因是除法得出小数除不尽 向前-向上取整 向后-向下取整
//         var step = (target - obj.offsetLeft) / 10;
//         step = step > 0 ? Math.ceil(step) : Math.floor(step);
//         if (obj.offsetLeft == target) {
//             clearInterval(obj.timer1);
//             //回调函数写到 定时器结束里面
//             // if (callback) {//判断有没有callback这个参数传进来
//             //     //调用函数
//             //     callback();
//             // }
//             callback && callback();
//         } else {
//             //把每次加1 这个步长值改成一个慢慢变小的值 步长公式：（目标值-现在的位置）/ 10
//             obj.style.left = obj.offsetLeft + step + 'px';
//         }

//     }, 15);
// }


