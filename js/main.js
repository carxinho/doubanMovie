
var top250 = {
    init: function () {
        this.$element = $('#top250')
        this.$main = $('main')
        this.isLoading = false
        this.index = 0
        this.isFinish = false
        this.clock = undefined
        this.bind()
        this.start()
    },
    bind: function () {
        var _this = this
        this.$main.scroll(function () {
            if (_this.clock) {
                clearTimeout(_this.clock);
            }
            _this.clock = setTimeout(function () {
                if (_this.$element.eq(0).height() - 10 <= _this.$main.height() + _this.$main.scrollTop()) {
                    _this.start();
                }
            }, 300)
        })
    },
    start: function () {
        var _this = this
        var callback = function (data) {
            _this.render(data)
        }
        this.getData(callback)
    },
    getData: function (callback) {
        var _this = this
        if (_this.isLoading) return
        _this.isLoading = true
        _this.$element.find('.loading').show()
        $.ajax({
            url: 'https://api.douban.com/v2/movie/top250',
            type: 'GET',
            data: {
                start: _this.index || 0
            },
            dataType: 'jsonp'
        }).done(function (res) {
            _this.index += 20
            if (_this.index >= res.total) {
                _this.isFinish = true
            }
            // if(callback) {
            //     callback(res)
            // }
            callback && callback(res)
        }).fail(function (res) {

        }).always(function () {
            _this.isLoading = false
            _this.$element.find('.loading').hide()
        })
    },
    render: function (data) {
        console.log('1',data)
        var _this = this
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
        </a></div>`
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
            _this.$element.find('.container').append($node)
        })
    },
}
var hot = {
    init: function () {
        this.$element = $('#hot')
        this.start()
    },
    start: function () {
        var _this = this
        var callback = function (data) {
            _this.render(data)
        }
        this.getData(callback)
    },
    getData: function (callback) {
        var _this = this
        if (_this.isLoading) return
        _this.isLoading = true
        _this.$element.find('.loading').show()
        $.ajax({
            url: 'https://api.douban.com/v2/movie/in_theaters',
            type: 'GET',
            dataType: 'jsonp'
        }).done(function (res) {
            // if(callback) {
            //     callback(res)
            // }
            callback && callback(res)
        }).fail(function (res) {

        }).always(function () {
            _this.$element.find('.loading').hide()
        })
    },
    render: function (data) {
        console.log(data)
        var _this = this
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
        </a></div>`
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
            _this.$element.append($node)
        })
    }
}
var search = {
    init: function () {
        this.$element = $('#search')
        this.$searchResult = $('.search-result')
        this.$button = $('.button')
        this.$input = $('input')
        this.keyword = ''
        this.bind()
        this.start()
    },
    bind: function(){
        var _this = this
        this.$button.click(function(){
            _this.keyword = _this.$input.val()
            console.log(_this.keyword)
            _this.start()
        })
    },
    start: function () {
        var _this = this
        var callback = function (data) {
            _this.render(data)
        }
        this.getData(callback)
    },
    getData: function (callback) {
        var _this = this
        _this.$element.find('.loading').show()
        $.ajax({
            url: 'https://api.douban.com/v2/movie/search',
            data:{
                q: _this.keyword
            },
            type: 'GET',
            dataType: 'jsonp'
        }).done(function (res) {
            // if(callback) {
            //     callback(res)
            // }
            callback && callback(res)
        }).fail(function (res) {

        }).always(function () {
            _this.$element.find('.loading').hide()
        })
    },
    render: function (data) {
        console.log(data)
        var _this = this
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
        </a></div>`
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
            _this.$searchResult.append($node)
        })
    }

}

var app = {
    init: function () {
        this.$tabs = $('footer>div')
        this.$panels = $('section')
        this.bind()
        top250.init()
        hot.init()
        search.init()
    },
    bind: function () {
        var _this = this

        this.$tabs.on('click', function () {
            $(this).addClass('active').siblings().removeClass('active')
            _this.$panels.eq($(this).index()).show().siblings().hide()
        })
    }
}
app.init()