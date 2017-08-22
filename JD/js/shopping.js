window.onload=function(){
	var bpic=$(".big_pic").find('img');//找到大图片
	var mpic=$('.wrap ul li');//小图片
	//console.log(bpic)
	mpic.mousemove(function(){//给小图片绑定鼠标移入事件
		var index=$(this).index();//给下标设  
		$(this).addClass('ac').siblings().removeClass('ac')//鼠标移入时对应的图片变色
		bpic.eq(index).show().siblings().hide()//根据下标 显示对应的大图
		
		
	})
//	//点击购物车 显示对应的图片 价格
	var arr=["199:00","299:00","399:00","499:00","99:00"];
	var num=1;//给被点击的次数  设置变量 默认为1
	
	//点击选项，被点击的获得ac属性，其他的选项移除ac
	$('.choose_size li').click(function(){
		var index=$(this).index();//将点击的队像发编号
		
		$(this).addClass('red_border').siblings().removeClass('red_border');
		$('.wrap li').eq(index).addClass('ac').siblings().removeClass('ac');
		
		$('.jiage').find('em').append().text(arr[index]);//将价格 从数组中根据下标取出 并显示
		$('.okBtn').attr('disabled',false);//当有点击事件时    加入购物车按钮激活
		$('.big_pic img').eq(index).show().siblings().hide();//大图片显示
    });
	
	//点击按钮，数量增加
	$('.change_num .addBtn').click(function(){//点击+时  数值 被显示哦到  框内
		num++;
		$('.change_num .input').val(num);
	});
	
	//点击按钮，数量减少
	$('.change_num .subBtn').click(function(){//当点击——时  当低于1时  默认为  1
		num--;
		if(num<1){
			num=1;
		}
		$('.change_num .input').val(num);
	});
	
	//点击购物车  成功
	$('.okBtn').click(function(){
		alert('添加成功！');
	});
	//让图片随着下标能够切换------------------------------------------------------------------
    $('.tab_title').find('li').mouseover(function(){
        var _this=$(this);
        var index=_this.index();
        _this.parent().siblings('div').eq(index).show().siblings('div').hide()
    })
	
 //放大镜 ————————————————————————————————————————————————————
	 
	//获取大图片    和   对应的  小图片   元素
	var big_Pic=$('.big_pic');
	var a_box=big_Pic.children().last();
	var max_Pic=$('.max_pic');
	
	
	//当鼠标 在 大图片里  移动
	big_Pic.mousemove(function(ev){
		var _this=$(this).index()
		var i=$('.wrap').find('.ac').index()
		//获取 放大镜在大图片里的位置 X  Y
		var l=ev.pageX-$(this).offset().left-a_box.width()/2;
		var t=ev.pageY-$(this).offset().top-a_box.height()/2;
		//限制移动范围
		var max_l=$(this).width()-a_box.width();
		var max_t=$(this).height()-a_box.height();
		
		//判断
		if(l<0){
			l=0;
		}
		if(t<0){
			t=0;
		}
		if(l>max_l){
			l=max_l
		}
		if(t>max_t){
			t=max_t
		}	
		
		a_box.show().css({"top":t,"left":l});//放大镜显现  并给其赋值
		max_Pic.show();
		$('.max_pic img').eq(i).show().siblings().hide()
		//放大镜 里的图片  与 显示的  图片  比例为1：2
		max_Pic.children('img').css({"top":-t*2,"left":-l*2});
	});
	
	//鼠标移出  放大镜 和 显示的 图片 都消失
	big_Pic.mouseleave(function(){
		a_box.hide();
		max_Pic.hide();
	});
	
	
	
}
