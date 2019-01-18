function banner(){
    new Swiper('.swiper-container',{
        // autoplay:true,//是否自动播放，默认false
        loop:true,//不停切换
        speed:200,//图片划过时间
        autoplay:{//图片之间切换时间
            delay:1000,
            disableOnInteraction:false
        },
        pagination: {
            el:'.swiper-pagination',
            type:'fraction',
            currentClass:'current',
            totalClass:'total'
        }
    })
}


let $ul = $('.bannerbox>.swiper-wrapper')
// function getbanner(){
//     $.ajax({
//         url:'./json/banner.json',
//         type:'get',
//         data:{a:1,b:2},//传给后端的数据
//         success:function(data){
//             getdata(data)
//             banner()
//         },
//         error:function(e){

//         }
//     })
// }
// getbanner()

function getbanner2(){
    let b = new Promise(function(res,rej){
        $.ajax({
            url:'./json/banner.json',
            success:function(data){
                res(data)
            },
            error:function(e){
                rej(e)
            }
        })
    })
    return b  
}
getbanner2().then(function(data){
    getdata(data)
    banner()
},function(){})


function getdata(data){
    data = data || []
    let str= ``
    for (let i = 0; i < data.length; i++) {
        let cur = data[i]
        str +=`<li class="swiper-slide">
        <img src="${cur.img}" alt="">
        <h2>${cur.title}</h2>
    </li>`
    }
    $ul.html(str)
}




















