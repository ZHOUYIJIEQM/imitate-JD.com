$(function() {

  // 秒杀倒计时
  // 参数：html小时的类名 分钟的类名， 秒的类名
  // new Timedown($('.cd_hour p'), $('.cd_minute p'), $('.cd_second p'));
  function Timedown(hour_text, minute_text, second_text) {
    var oThis = this;
    this.hour_html = hour_text;
    this.minute_html = minute_text;
    this.second_html = second_text;
    this.today = new Date();
    this.tdNum = this.dtGet();
    this.goDown()
    this.goDowntimer = setInterval(function() {
      oThis.goDown()
    }, 1000)
  }
  // 返回一个秒数：当天某个秒杀时间点与现在时间相差的秒数
  Timedown.prototype.dtGet = function() {
    var td_set = {};
    var result = 0;
    td_set.year = this.today.getFullYear();
    td_set.month = this.today.getMonth();
    td_set.date = this.today.getDate();
    td_set.hour = this.today.getHours();
    if (td_set.hour >= 0 && td_set.hour < 2) {
      result = (new Date(td_set.year, td_set.month, td_set.date, 2, 0, 0).getTime() - Date.now()) / 1000;
    } else if (td_set.hour >= 2 && td_set.hour < 4) {
      result = (new Date(td_set.year, td_set.month, td_set.date, 4, 0, 0).getTime() - Date.now()) / 1000;
    } else if (td_set.hour >= 4 && td_set.hour < 6) {
      result = (new Date(td_set.year, td_set.month, td_set.date, 6, 0, 0).getTime() - Date.now()) / 1000;
    } else if (td_set.hour >= 6 && td_set.hour < 8) {
      result = (new Date(td_set.year, td_set.month, td_set.date, 8, 0, 0).getTime() - Date.now()) / 1000;
    } else if (td_set.hour >= 8 && td_set.hour < 10) {
      result = (new Date(td_set.year, td_set.month, td_set.date, 10, 0, 0).getTime() - Date.now()) / 1000;
    } else if (td_set.hour >= 10 && td_set.hour < 12) {
      result = (new Date(td_set.year, td_set.month, td_set.date, 12, 0, 0).getTime() - Date.now()) / 1000;
    } else if (td_set.hour >= 12 && td_set.hour < 14) {
      result = (new Date(td_set.year, td_set.month, td_set.date, 14, 0, 0).getTime() - Date.now()) / 1000;
    } else if (td_set.hour >= 14 && td_set.hour < 16) {
      result = (new Date(td_set.year, td_set.month, td_set.date, 16, 0, 0).getTime() - Date.now()) / 1000;
    } else if (td_set.hour >= 16 && td_set.hour < 18) {
      result = (new Date(td_set.year, td_set.month, td_set.date, 18, 0, 0).getTime() - Date.now()) / 1000;
    } else if (td_set.hour >= 18 && td_set.hour < 20) {
      result = (new Date(td_set.year, td_set.month, td_set.date, 20, 0, 0).getTime() - Date.now()) / 1000;
    } else if (td_set.hour >= 20 && td_set.hour < 22) {
      result = (new Date(td_set.year, td_set.month, td_set.date, 22, 0, 0).getTime() - Date.now()) / 1000;
    } else if (td_set.hour >= 22 && td_set.hour < 24) {
      result = (new Date(td_set.year, td_set.month, td_set.date, 24, 0, 0).getTime() - Date.now()) / 1000;
    }
    return result;
  }
  // 格式化小于10的数字
  Timedown.prototype.format = function(num) {
    if (num < 10) {
      return '0' + num
    } else {
      return num
    }
  }
  // 得出对于时分秒，并给dom
  Timedown.prototype.goDown = function() {
    var oThis = this;
    var msh = Math.floor(oThis.tdNum / 60 / 60);
    var msm = Math.floor(oThis.tdNum / 60 % 60);
    var mss = Math.floor(oThis.tdNum % 60);
    this.hour_html.text(oThis.format(msh));
    this.minute_html.text(oThis.format(msm));
    this.second_html.text(oThis.format(mss));
    this.tdNum--;
    if (this.tdNum < 0) {
      this.tdNum = this.dtGet();
    }
  }
  new Timedown($('.cd_hour p'), $('.cd_minute p'), $('.cd_second p'));

  // 无缝轮播
  // 参数: 外层容器 轮播列表容器(ul) 轮播控制圆圈 圆圈样式 时间 是否自动轮播(默认true) 前一张按钮 下一张按钮 轮播项的宽度
  // new Slider('.banner', '.img', '.num', 'on', '2000', 'false', '.btn_l', '.btn_r');
  // new Slider('.slider_img', '.img', '.slider_ctrl', 'active', '2000', 'false')
  function Slider(oBox, oList, item, oCtrl, active, time, autoSli, btn_pre, btn_next, item_width) {
    var othis = this;
    this.active = active;
    this.box = $(oBox);
    this.list = this.box.find(oList);
    this.it = item;
    this.item = this.list.find(item);
    this.width = typeof item_width == 'undefined' ? parseInt(this.item.css('width')) : item_width;
    this.ctrl = this.box.find(oCtrl);
    this.length = 0;
    this.index = 0;
    this.pre = btn_pre;
    this.next = btn_next;
    this.sl_time = time ? parseInt(time) : 2000;
    this.autoSli = autoSli == 'false' ? false : true;
    this.initial()
    this.auto()
    this.hover()
    this.pre_next()
  }
  Slider.prototype.initial = function() {
    if (this.width == 1190) {
      var clonearr = []
      // 乱入特色推荐轮播
      for (var i = 0; i < 3; i++) {
        var clone = this.item.eq(i).clone();
        clonearr.push(clone);
      }
      for (i = 0; i < clonearr.length; i++) {
        this.list.append(clonearr[i]);
      }
      this.length = 5;
      this.list.css({
        'width': 5 * this.width
      });
      for (var i = 0; i < 4; i++) {
        this.ctrl.append('<li></li>')
      }
      this.ctrl.find('li').first().addClass(this.active)

    } else {
      var clone = this.item.first().clone();
      this.list.append(clone);
      this.length = this.list.find(this.it).length;
      this.list.css({
        'width': this.length * this.width
      })
      for (var i = 0; i < this.length - 1; i++) {
        this.ctrl.append('<li></li>')
      }
      this.ctrl.find('li').first().addClass(this.active)
    }
  };
  Slider.prototype.hover = function() {
    var othis = this;
    this.ctrl.find('li').hover(function() {
      othis.index = $(this).index();
      othis.list.stop().animate({
        left: -othis.index * othis.width
      }, 500);
      $(this).addClass(othis.active).siblings().removeClass(othis.active);
    })
    if (this.autoSli) {
      // 移入停止
      this.box.hover(function() {
        clearInterval(othis.timer);
      }, function() {
        othis.timer = setInterval(function() {
          othis.index++;
          othis.move();
        }, othis.sl_time)
      })
    }
  };
  Slider.prototype.pre_next = function() {
    var othis = this;
    if (this.pre != undefined && this.next != undefined) {
      this.box.find(this.pre).click(function() {
        othis.index--;
        othis.move();
      });
      this.box.find(this.next).click(function() {
        othis.index++;
        othis.move();
      });
    }
  };
  Slider.prototype.move = function() {
    if (this.index >= this.length) {
      this.list.css({
        left: 0
      });
      this.index = 1;
    }
    if (this.index <= -1) {
      this.list.css({
        left: -(this.length - 1) * this.width
      });
      this.index = this.length - 2;
    }
    this.list.stop().animate({
      left: -this.index * this.width
    }, 500);
    if (this.index == this.length - 1) {
      this.ctrl.find('li').eq(0).addClass(this.active).siblings().removeClass(this.active);
    } else {
      this.ctrl.find('li').eq(this.index).addClass(this.active).siblings().removeClass(this.active);
    }
  };
  Slider.prototype.auto = function() {
    var othis = this;
    if (this.autoSli) {
      this.timer = setInterval(function() {
        othis.index++;
        othis.move();
      }, othis.sl_time);
    }
  };

  // 下面是一些jq的dom操作
  var cur = 0,
    timer = null,
    shide_flag = true; //点击关闭 .service_hide 部分后会出现意外, 添加条件判断
  function carouselinit() {
    for (var i = 0; i < $('.pic li').length; i++) {
      if (i == 0) {
        $('.pic_control').append("<li class='active'></li>")
        $('.pic li').eq(i).show();
      } else {
        $('.pic_control').append("<li></li>")
        // $('.pic li').eq(i).stop(true).hide();
      }
    }
  }
  function showImg(){
    cur++;
    if (cur > 7) {
      cur = 0;
    }
    $('.pic li').eq(cur).stop(true).fadeIn(500).siblings('li').stop(true).fadeOut(500);
    $('.pic_control li').eq(cur).addClass('active').siblings('li').removeClass('active');
  }
  function autoShow() {
    timer = setInterval(function() {
      // console.log('show')
      showImg();
    }, 2000)
  }
  $('.pic li').hide();
  carouselinit();
  // showImg();
  autoShow();
  // 鼠标滑过轮播控制按钮
  $(".pic_control li").mouseover(function() {
    cur = $(this).index();
    $('.pic li').eq(cur).stop(true).fadeIn(500).siblings('li').stop(true).fadeOut(500);
    $('.pic_control li').eq(cur).addClass('active').siblings('li').removeClass('active');
  });
  // 向前
  $('.prev_side').click(function() {
    cur > 0 ? cur-- : cur = $('.pic li').length - 1;
    $('.pic li').eq(cur).stop(true).fadeIn(500).siblings('li').stop(true).fadeOut(500);
    $('.pic_control li').eq(cur).addClass('active').siblings('li').removeClass('active');
  });
  // 向后
  $('.next_side').click(function() {
    cur < $('.pic li').length - 1 ? cur++ : cur = 0;
    $('.pic li').eq(cur).stop(true).fadeIn(500).siblings('li').stop(true).fadeOut(500);
    $('.pic_control li').eq(cur).addClass('active').siblings('li').removeClass('active');
  });
  // 移入停止
  $('.carousel').hover(function() {
    clearInterval(timer);
  }, autoShow);

  // 京东快报下方
  $('.service_lk').on('mouseenter', function(event) {
    var target = $(event.target);
    if (shide_flag) {
      $('.service_lk>a').animate({
        'margin-top': '-45px'
      });
      $(this).find('p').addClass('service_txt_active').parent().parent().siblings().find('p').removeClass('service_txt_active');
      $('.service_hide').animate({
        'top': '25px'
      }).find('div').eq($(this).index()).css({
        'display': 'block'
      }).siblings('div').css({
        'display': 'none'
      });
      $('.service_hide>a').css({
        'display': 'block'
      });
    }
  });
  $('.service_lk').on('mouseleave', function() {
    shide_flag = true;
  })
  $('.service_hide>a').click(function() {
    $('.service_hide').animate({
      'top': '200px'
    }).children('div').css({
      'display': 'none'
    });
    $(this).css({
      'display': 'none'
    });
    $('.service_lk a').animate({
      'margin-top': '0px'
    }).find('p').removeClass('service_txt_active');
    shide_flag = false;
  })

  // 左边导航
  $('.leftsidebar>ul li').mouseenter(function() {
    var index = $(this).index();
    $(this).addClass('hover').siblings().removeClass('hover');
    $('.leftcontentbox').css({
      'display': 'block'
    });
    $('.leftcontentbox .content_item').eq(index).addClass('hover').siblings().removeClass('hover');
  })

  function displaynone() {
    $('.leftcontentbox').css({
      'display': 'none'
    });
    $('.leftsidebar>ul li').removeClass('hover');
    $('.leftcontentbox .content_item').removeClass('hover');
  }
  $('.leftcontentbox').mouseleave(function() {
    displaynone();
  })
  $('.leftsidebar').mouseleave(function() {
    displaynone();
  })

  // 返回顶部
  $('li.top').click(function() {
    $('html,body').animate({
      'scrollTop': '0px'
    }, 300);
  })

  // 地址选择
  $('.address').hover(function() {
    $('.addressList').css({
      'display': 'block'
    });
  }, function() {
    $('.addressList').css({
      'display': 'none'
    });
  })
  $('.addressList').on('click', 'li', function(event) {
    var target = $(event.target);
    $('.address>span p').text(target.text()).attr({
      'title': target.text()
    });
    $(this).find('a').addClass('add_checked');
    $(this).siblings().find('a').removeClass('add_checked');
    $('.addressList').css({
      'display': 'none'
    });
  });

  //京东秒杀右侧 滚动
  $('.slider_wrapper').css({
    'width': parseInt($('.slider_wrapper li').css('width')) * $('.slider_wrapper li').length
  })
  var sk_wrapper = parseInt($('.slider_wrapper').css('width'));
  var sk_li_width = parseInt($('.slider_wrapper li').css('width'));
  var sk_li_len = $('.slider_wrapper li').length;
  var sk_index = sk_li_len / 2;
  $('.slider_wrapper').css({
    'left': -sk_index * sk_li_width
  })
  $('.sk_prev').click(function() {
    if (sk_index > 4) {
      sk_index = sk_index - 4;
      $('.slider_wrapper').css({
        'left': -sk_index * sk_li_width
      })
    } else {
      $('.slider_wrapper').css({
        'left': 0
      })
      sk_index = 0;
    }
    // console.log('pre'+sk_index)
  })
  $('.sk_next').click(function() {
    if (sk_index < sk_li_len - 4) {
      sk_index = sk_index + 4;
      $('.slider_wrapper').css({
        'left': -sk_index * sk_li_width
      })
    } else {
      $('.slider_wrapper').css({
        'left': -sk_li_width * (sk_li_len - 4)
      })
      sk_index = sk_li_len - 4;
    }
    // console.log('next'+sk_index)
  })
 
  $('.tab_head a').eq(0).addClass('hover');
  $('.tab_body_item').eq(0).css({
    'display': 'block'
  })
  $('.tab_head a').hover(function() {
    var tab_head_i = $(this).index();
    $(this).addClass('hover').siblings().removeClass('hover');
    $('.tab_body_item').eq(tab_head_i).css({
      'display': 'block'
    }).siblings().css({
      'display': 'none'
    });
  })

  // 秒杀右侧轮播
  new Slider('.slider_img', '.img', 'li', '.slider_ctrl', 'active', '2000')
  // 排行榜
  for (var tab_i = 1; tab_i <= $('.tab_body_item').length; tab_i++) {
    var tab_item = '.tab_item' + tab_i;
    new Slider(tab_item, '.slider_list', '.slider_list_item', '.slider_indicators', 'active', '3000', 'false')
  }
  // 会买专辑
  new Slider('.dailyold_slider', '.dailyold_slider_list', '.dailyold_slider_item', '.slider_indicators', 'active', '3500', 'true', '.sl_prev', '.sl_next');
  // 领券中心
  new Slider('.coupon_slider', '.coupon_box', '.coupon_list', '.slider_indicators', 'active', '2000', 'false');
  // 觅me
  new Slider('.mime .box_bd', '.mime_box_list', '.mime_list_item', '.slider_indicators', 'active', '3500', 'true', '.sl_prev', '.sl_next');
  // 特色推荐
  new Slider('.j_special_box', '.box_slider', '.box_slider_item', '.slider_indicators', 'active', '5000', 'true', '.sl_prev', '.sl_next', 1190);
  // 延迟加载
  new LazyLoad('lazybigcontainer', 'imgLazy')

  //窗口滚动事件
  $(window).scroll(function() {
    var scrolltop = $(window).scrollTop();
    var searchfix_appear = 560;

    // 左侧导航部分被移动到视口上方， 则右侧对应内容 贴着视口最上方向下显示
    var tmp = $('.leftsidebar').offset().top - scrolltop;
    if (tmp < 0) {
      $('.leftcontentbox').css({
        'top': -tmp
      })
    } else {
      $('.leftcontentbox').css({
        'top': 0
      })
    }

    // 到达一定高度 显示 '.searchfix' 优化 滚轮停止后再执行
    if (rollTimer) {
      clearTimeout(rollTimer)
    }
    var rollTimer = setTimeout(function() {
      if (scrolltop > searchfix_appear) {
        $('#searchfix').css({
          'display': 'block'
        }).stop(true).animate({
          'top': '0'
        }, 300)
      } else if (scrolltop < searchfix_appear) {
        $('#searchfix').css({
          'display': 'none'
        }).stop(true).animate({
          'top': '-60px'
        }, 100)
      }
    }, 200)
  })

})