
//loading加载进度根据图片加载速度来控制
function loading(){
    let $progressbar = $('.progressbar'),
        $loadingbox = $('.loadingbox');
    let ary = ['phone-bg.jpg',
    'phone-listen.png', 'phone-key.png', 'phone-logo.png', 'phone-name.png', 'message-head1.png', 'message-head2.png', 'message-keyboard.png', 'cube-bg.jpg', 'cube-img1.png', 'cube-img2.png', 'cube-img3.png', 'cube-img4.png', 'cube-img5.png', 'cube-img6.png', 'cube-tip.png', 'menu-icon.png', 'concat-address.png', 'concat-icon1.png', 'concat-icon2.png', 'course-icon1.png', 'course-icon2.png', 'course-icon3.png', 'course-icon4.png', 'course-icon5.png', 'course-icon6.png', 'course-icon7.png', 'course-pocket.png', 'school-bot1.png', 'school-bot2.png', 'school-img1.jpg', 'school-img2.jpg', 'school-img3.jpg', 'teacher-title.png', 'zf-detailsReturn.png', 'zf-jobTable.png', 'zf-teacher1.png', 'zf-teacher2.png', 'zf-teacher3.jpg', 'zf-teacher4.png', 'zf-teacher5.png', 'zf-teacher6.png'];
    let n = 0
    ary.forEach(item=>{
        let temp = new Image
        temp.src='./imges/'+item
        temp.onload = load
    })
    function load(){
        n++
        if(n === ary.length){
            $progressbar.css({
                width:'100%'
            })
            $loadingbox.css({
                opacity:0
            })
            let timer = setTimeout(()=>{
                clearInterval(timer)
                $loadingbox.css({
                    display:'none'
                })
                phone()
            },1800)
        }else{
            $progressbar.css({
                width:n/ary.length*100+'%'
            })
        }
    }
}
loading()

//管理phonebox

function phone(){
    //电话铃声
    let bell = $('#bell')[0]
    let say = $('#say')[0]
    let music = $('#music')[0]
    bell.play()
    // bell.addEventListener('canplay',function(){
       //次代表当音频可以播放时做什么事
    // })

    let $phonebox = $('.phonebox')
    let $listenbox = $('.listenbox')
    let $listenbtn = $('.listenbtn')
    let $nolistbox = $('.nolistbox')
    let $nolistbtn = $('.nolistbtn')
    let $timebox = $('.timebox')
    let time = null
    $listenbox.tap(function(){
        $listenbox.hide();
        $nolistbox.css({
            transform:'translateY(0)'
        })
        $timebox.show()
        bell.pause()
        say.play()//监听视频播放，播放后执行以下
        say.oncanplay=function(){
            //say.currentTime 当前音频播放时间
            //say.ended = true 代表音频播放完毕
            //say.paused = true 代表音频暂停
            //say.durantion 音频的总时长
            
            time = setInterval(function(){
                let t = Math.floor(say.currentTime)>=10? Math.floor(say.currentTime):'0'+Math.floor(say.currentTime)
                let str = '00'+':'+ t
                $timebox.html(str)
                if(say.ended){
                    clearInterval(time)
                    next()
                }
            },1000)
        }
    })

    function next(){
        $phonebox.css({
            transform:'translateY(100%)'
        })
        msg()
    }
    $nolistbtn.tap(function(){
        clearInterval(time)
        say.pause()
        next()
    })
}


//管理 消息模块

function msg(){
    let $msgbox = $('.msgbox'),
        $lis = $msgbox.find('li')
        $keyboard = $msgbox.find('.keyboard')
        $textbox = $keyboard.find('.textbox') 
        $btn = $keyboard.find('.btn')
        $ul = $msgbox.find('ul') ; 

    let movetime = null
    let n = 0
    let h = 0 //ul 上移
    function move(){
        movetime=setInterval(function(){
            if(n>=$lis.length){
                clearInterval(movetime)
                return
            }
            if(n==3){
                $keyboard.css({
                    transform: 'translateY(0)',
                })
                input()
                clearInterval(movetime)
                return
            }
            if(n>=4){
                h += $lis[n].offsetHeight;
                $ul.css({
                    transform:`translateY(-${h/100}rem)`
                })
            }
           $lis.eq(n++).css({
                transform: 'translateY(0)',
                opacity: 1
           })
        },1000)
    }
    move()
    function input(){
        let str = '显贵打过去还是学不会'
        let str2 = ''
        let i = 0
        let time = setInterval(function(){
            if(i==str.length){
                $btn.show()
                clearInterval(time)
                return
            }
            str2 += str[i]
            $textbox.html(str2).css({
                fontSize:'0.25rem'
            })
            i++
        },600)
    }
    //重置定时器
    $btn.tap(function(){
        $lis.eq(n).css({
            opacity:1,
            transform:'translateY(0)'
        })
        $keyboard.css({
            transform:'translateY(4rem)'
        })
        $textbox.html('')
        n++
        h += $lis[n].offsetHeight;
        $ul.css({
            transform: `translateY(-${h/100}rem)`
        })
        move()
    })
}
 



























