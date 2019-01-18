
let $uls = $('.box>section>ul')
let $list
let $img2 = $('.box>.box1>.img2')
let $smallimg = $img2.find('img')
let $auto = $('.box>audio')
let $loading = $('.loading')
let $colorload = $('.color')
let $timeer = $('.timeer')
let n = 0
let m
let time1
let time2
let arr
let oppo = true
function tap() {
    $img2.removeClass('ppp')
    $img2.tap(function () {
        if ($auto[0].paused) {
            $img2.addClass('ppp')
            $auto[0].play();
            if (oppo) {
                oppo = false
                clock()
            } else {
                clock()
            }
            transform($list)
           
        } else {
            $auto[0].pause()
            $img2.removeClass('ppp')
            clearInterval(time1)
            clearInterval(time2)
        }
    })
}
tap()

function clock() {
    time1 = setInterval(() => {
        if (Math.floor(n / 60) >= 1) {
            if ((n - Math.floor(n / 60) * 60) >= 10) {
                m = '0' + Math.floor(n / 60) + ':' + (n - Math.floor(n / 60) * 60)
            } else {
                m = '0' + Math.floor(n / 60) + ':' + '0' + (n - Math.floor(n / 60) * 60)
            }
        } else if (Math.floor(n / 60) < 1) {
            if (n >= 10) {
                m = '00:' + n
            } else {
                m = '00:' + '0' + n
            }
        }
        $timeer.html(m)
        n++
        $colorload[0].style.width = (n / $auto[0].duration) * 100 + '%'
        if (n >= $auto[0].duration) {
            $img2.removeClass('ppp')
            n = 0
            $colorload[0].style.width = (n / $auto[0].duration) * 100 + '%'
            $timeer.html('00:00')
            clearInterval(time1)
            clearInterval(time2)
            return
        }
    }, 1000)
}

function getdata() {
    let b = new Promise(function (res, rej) {
        $.ajax({
            url: '../data.json',
            type: 'get',
            async: true,
            success: function (data) {
                res(data)
            },
            error: function (e) {

            }
        })
    })
    return b
}

getdata().then((data) => {
    data = data || []
    let str = data.lyric
    let reg = /\[\d{2}:\d{2}\.\d+\]/g
    arr = str.match(reg)

    let reg2 = /[^\[\d{2}:\d{2}\.\d+\]](\w)[^\[]+/g
    let arr2 = str.match(reg2)
    let str3 = ``
    for (let i = 0; i < arr2.length; i++) {
        str3 += `<li>${arr2[i]}</li>`
    }
    $uls.html(str3)
    $list = $uls.find('li')
    
   
})
let p = 0
let h = 0
let index = 0 
let ti = 0
function transform(li) {
    let reg = /(\d+):([^.]+)/g
    let tem1 = []
    let time = 0
    arr.forEach((item) => {
        item.replace(reg, function (cur, lint1, lint2) {
            if (lint1[1] > 0) {
                if (lint2 >= 10) {
                    time = +(lint1[1]) * 60 + +(lint2)
                } else {
                    time = +(lint1[1]) * 60 + +(lint2[1])
                }
            } else {
                if (lint2 >= 10) {
                    time = +(lint2)
                } else {
                    time = +(lint2[1])
                }
            }
        })
        tem1.push(time)
    })
    
    time2 = setInterval(() => {
        ti = ti + 100
        for (let i = 0; i < tem1.length; i++) {
            let cur =  tem1[index+1]*1000
            let ls = (tem1[tem1.length - 1])*1000
            if(ti>=ls){
                clearInterval(time2)
            }
            if(ti>cur){
                index++
                li.eq(index).addClass('active').siblings().removeClass('active')
                if(index>=3){
                    h += li[index].clientHeight
                    $uls.css({
                        transform: `translateY(-${h/37.5}rem)`
                    })
                }
            }else{
                li.eq(index).addClass('active').siblings().removeClass('active')
            }
        }
    }, 70)
}














