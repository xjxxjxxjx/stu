

window.onload=function(){
	//隐藏菜单
	function ten(){
				var oli=$('.p_left ul').children('li');
				var index;
				var oScetion=$('.popup').find('.scetion');
				//console.log(oScetion)
				oli.mouseenter(function(){//当移入鼠标li中
					index=$(this).index();
					//console.log(index)
					$('.popup').show()
					oScetion.eq(index).show().siblings().hide();
				})
				oli.mouseleave(function(){//离开li
					
					$('.popup').mouseenter(function(){
						$(this).show()
						oScetion.eq(index).show().siblings().hide()
						oli.eq(index).addClass('ac').siblings().removeClass('ac');
						
					})
					$('.popup').hide();
				
				})
				oScetion.mouseleave(function(){
					$('.popup').hide();
					oli.eq(index).removeClass('ac')
				})
				
				
			};
			ten();	
			
//右边盒子  变框————————————————————————————————————————————————————————————
//   右边 12个 切换
	function qie(){
		var timer;
		$('.icon').hover(function(){
			timer=setInterval(function(){
				$(".icon").animate({"top":-38},300)
				$(".popupa").animate({"top":30},300)
			},500)
			$(".dialog").eq($(this).index()).show().siblings().hide()			
		},
			function(){
				clearTimeout(timer)
			}
		
		)
		$('.close').on('click',function(){
			$(".icon").animate({"top":0},300)
			$(".popupa").animate({"top":208},300)
			
		})
		
	};
	qie();

		
		//轮播图__________________________________________________________________
		function ChangeImg(imgBox){
	    this.box=imgBox; //容器
	    
		this.ul=imgBox.getElementsByTagName('ul')[0];
		this.img_li=this.ul.getElementsByTagName('li');//图片
		
		this.ol=imgBox.getElementsByTagName('ol')[0];
		this.aLi=this.ol.getElementsByTagName('li');//按钮
		
		this.timer=null;
		
		this.n=0;
		
		//调用原型上的方法
		this.change();
	};
	
	//切换图片的公用方法  定义在prototype
	ChangeImg.prototype.change=function(){
		
		var _this=this;  //构造函数中的this，指向实例化的对象
		
		for(var i=0; i<this.aLi.length; i++){
			
			this.aLi[i].index=i; //发编号
			
			this.aLi[i].onclick=function(){
				
				//其他变灰色   所有图片都隐藏
				for( var j=0; j<_this.aLi.length; j++){
					_this.aLi[j].className="";
					_this.img_li[j].className="hide";
				};
				
				
				//对应的图片显示？？？！！！！！！！！！
				
				_this.img_li[this.index].className="";
				//自己变红色
				this.className="ac";
				
				_this.n=this.index;
				
			};
		};
		
		return this; //返回实例对象
	};
	
	//原型上定义一个  自动切换图片   的方法
	ChangeImg.prototype.autoplay=function(){
		
		var _this=this;
	
		this.timer=setInterval(function(){
		   	_this.n++;
            
            if(_this.n==_this.aLi.length){
                _this.n=0;
            };
		   	
		    for( var j=0; j<_this.aLi.length; j++){
                _this.aLi[j].className="";
                _this.img_li[j].className="hide";
            };
            //对应的图片显示？？？！！！！！！！！！
            _this.img_li[_this.n].className="";
            //自己变红色
            _this.aLi[_this.n].className="ac";
            
		},1000);
		
		//鼠标进入box  停止切换
		this.box.onmouseenter=function(){
		    clearInterval(_this.timer);
		};
		
		//鼠标离开box  重启
		this.box.onmouseleave=function(){
            _this.autoplay();
        };
        return this; //返回实例对象
	};
	
	//---------------------------------------------------------------
	
		
	var aBox=document.getElementsByClassName('p_banner');	
	
	
	var chg_img1=new ChangeImg(aBox[0]);
	
	chg_img1.change().autoplay();//链式操作
	
	
//	//---------------------------------
//	var chg_img2=new ChangeImg(aBox[1]);
//	
//	chg_img2.change();


//楼层滚动________________________________________________________________
	function srcol(){
		
		var oli=$(".LocationFloorList li");//找到 li
		$(window).scroll(function(){//执行 滚动事件
			var s_t=$(window).scrollTop();//将 楼层滚动的  位移 设为变量
			//console.log($('.page5').eq(1))
			if(s_t>$('.page5').eq(0).offset().top-200){//判断  当滚动 达到第一个  楼层的 高度 就 显示  左边
				$(".LocationFloorList").show();
				oli.eq(0).addClass('ac');//为第一个 li  添加AC 样式
			}
			else if(s_t<$('.page5').eq(0).offset().top){
				$(".LocationFloorList").hide();
			}
			$(".page5").each(function(i){//将  楼层遍历
				if(s_t>$(this).offset().top-200){//判断当前滚动到 当前  楼层时   将  此楼层下边所对应的 li 添加 ac类  li的兄弟级隐藏  
					oli.eq(i).addClass('ac').siblings().removeClass('ac')
				}
				
			})
			
		})
		oli.each(function(i,elm){//遍历li   当点击li时  此  下标对应的  楼层 跳转到此位子
				$(this).click(function(){
					// 当滚动到此楼层时  又会触动  上面的滚动事件  所以不用  在 为 li添类  $('this').addClass('ac').siblings().removeClass('ac')
					$("html,body").stop().animate({"scrollTop":$(".page5").eq(i).offset().top+"px"},1000)
				});
		})
		
		
	};
	srcol();
	
	function xian(){
		//var index;
		$(".page5").each(function(i){
			//index=$(this),index();
			//console.log(oli)
			var omain=$(this).find(".op_main");
			//console.log(omain)
			var oli=$(this).find(".qie li");
			var timer;
			var n=0;
			oli.mouseenter(function(){
				
			omain.eq($(this).index()).removeClass('hid').siblings().addClass('hid')
			})
			//定时器
//			function run(){
//				timer=setInterval(function(){
//					
//						oli.eq(n).addClass('y yi').siblings().removeClass('y')
//						omain.eq(n).removeClass('hid').siblings().addClass('hid')
//						n++;
//						if(n==9){
//							n=0
//						}
//					
//				},1000)	
//				
//			}
//			run();
//			oli.mouseenter(function(){
//				clearInterval(timer)				
//			})
//			oli.mouseleave(function(){
//				run()				
//			})
		})
				
	};
	xian()

	
}
 

