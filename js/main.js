$('footer>div').click(function () {
    var index = $(this).index()
    $('section').eq(index).show().siblings().hide()
    $(this).addClass('active').siblings().removeClass('active')
})

var index = 0
var isLoading = false
start()
function start() {
    if(isLoading) return
    $('.loading').show()
    isLoading = true
    $.ajax({
        url: 'https://api.douban.com/v2/movie/in_theaters',
        type: 'GET',
        data: {
            start: index,
            count: 20
        },
        dataType: 'jsonp'
    }).done(function (res) {
        console.log(res)
        setData(res)
        index += 20
    }).fail(function (res) {
        console.log('error')
    }).always(function(){
        isLoading = false
        $('.loading').hide()    
    })
}

$('main').scroll(function(){
    if($('section').eq(0).height() - 10 <= $('main').height() + $('main').scrollTop()){
        start()
    }
})


function setData(data) {
    data.subjects.forEach(function (movie) {
        var tpl = `<div class="item">
        <a href="#">
            <div class="cover">
                <img src="https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2548870813.jpg" alt="">
            </div>
            <div class="detail">
                <h2></h2>
                <div class="extra"><span class="score"></span>分 / <span class="collect"></span>收藏</div>
                <div class="extra"><span class="year"></span> / <span class="type"></span></div>
                <div class="extra">导演:<span class="director"></span></div>
                <div class="extra">主演:<span class="actor"></span></div>
            </div>
        </a>
    </div>`
        var $node = $(tpl)
        $node.find('.cover img').attr('src', movie.images.medium)
        $node.find('.detail h2').text(movie.title)
        $node.find('.score').text(movie.rating.average)
        $node.find('.collect').text(movie.rating.stars)
        $node.find('.year').text(movie.year)
        $node.find('.type').text(movie.genres)
        $node.find('.director').text(function () {
            var directorArr = []
            movie.directors.forEach(function (item) {
                directorArr.push(item.name)
            })
            return directorArr
        })
        $node.find('.actor').text(function () {
            var actorsArr = []
            movie.casts.forEach(function (item) {
                actorsArr.push(item.name)
            })
            return actorsArr
        })
        $('#top250').append($node)
    })
}