(function(){
	var btnId = '';
	var htmlBtn = '';
	btnId = $("btn[name='newGuide']").attr('buttonId');
	htmlBtn ='<button class="btnClass" id="'+btnId+'">新手引导</button>'
	$('body').append(htmlBtn);

	var newKnow = function(options){
		this.options = $.extend({
			"xsyd" : []
		},options);
		this.init();
	};
	newKnow.prototype.init = function(){
		if(this.options.xsyd.length <= 0){
			if ($("#rightBox").length == 0) {
				var arr = [];
	            $.each($("agileui[name='newGuide']").children()[1].children,function(i,j){
	            	var temp = {title : j.title, src : j.getAttribute('src')};
	     			arr.push(temp)
	            })
	            this.options.xsyd = arr;
	        }
		}

		var htmlMain = '';
		var htmlImg = '';
		var html = '';

		htmlMain +='<div id="rightBox">'
		htmlMain +='<ul class="layui-timeline" id="noviceGuide">'
		htmlMain +='</ul>'
		htmlMain +='<div class="layui-btn-group">'
		htmlMain +='<button class="layui-btn" id="prevStepDt">上一步</button>'
		htmlMain +='<button class="layui-btn" id="nextStepDt">下一步</button>'
		htmlMain +='<button class="layui-btn" id="prevStepDt1">关闭</button>'
		htmlMain +='<button class="layui-btn" id="nextStepDt2">下一步2</button>'
		htmlMain +='</div>'
		htmlMain +='</div>'
		$('body').append(htmlMain);
		$.each(this.options.xsyd,function(i,j){

			if(i==0){
				htmlImg +='<div id="imgBoxMain">'
				htmlImg +='<div class="imgBox">'
				htmlImg +='<img  src="'+j.src+'" alt="" />'
				htmlImg +='</div>'
				htmlImg +='</div>'

				html +='<li class="layui-timeline-item J_active">'
				html +='<i class="layui-icon layui-timeline-axis">&#xe63f;</i>'
				html +='<div class="layui-timeline-content layui-text">'
				html +='<div class="layui-timeline-title">'
				html +='<a class="step_item isStep">'
				html +='<span class="is-step-arrow"></span>'
				html +=''+j.title+''
				html +='</a>'
				html +='</div>'
				html +='</div>'
				html +='</li>'
			}else{
				html +='<li class="layui-timeline-item">'
				html +='<i class="layui-icon layui-timeline-axis">&#xe63f;</i>'
				html +='<div class="layui-timeline-content layui-text">'
				html +='<div class="layui-timeline-title">'
				html +='<a class="step_item isNotStep">'
				html +='<span class=""></span>'
				html +=''+j.title+''
				html +='</a>'
				html +='</div>'
				html +='</div>'
				html +='</li>'
			}
		})
		$("#noviceGuide").html(html);
		$('body').append(htmlImg);

		var arrLength = this.options.xsyd.length;
		var arr = this.options.xsyd;
		function newGuide(e,move,it,arrLength,arr,clicknNum){   /* false在比较运算时默认为0    e:指向当前元素、move:点击下一步获取li的索引值、it:点击上一步获取li的索引值、arrLength:新手引导数组长度、arr:新手引导数组、clicknNum:当前点击对象的li下标*/

			/* 按钮显示 */
			if(move == (arrLength - 2) ){
				$("#prevStepDt1").show();
				$("#nextStepDt").hide();
			}else if( it == 1 ){
				$("#nextStepDt2").show();
				$("#nextStepDt").hide();
				$("#prevStepDt").hide();
			}else{
				$("#prevStepDt1").hide();
				$("#nextStepDt2").hide();
				$("#nextStepDt").show();
				$("#prevStepDt").show();
			}

			/* 选中显示 */
			if(move == (arrLength - 1) ){
				return;
			}else if(it === 0){
				return;
			}else{
				move = arguments[1]  ? arguments[1]: false;
				if(it == 0){

				}else{
					it = arguments[2]   ? arguments[2]: false;
				}
				$.each($('#noviceGuide').find('.step_item'),function(i,j){
					j.className = 'step_item isNotStep';
					j.children[0].className = '';
				})
				$('#noviceGuide').find('li').removeClass('J_active');
				
				if(move >= 0 && it === false){ //下一步
					$('.imgBox img').attr("src",arr[move+1].src);
					move = move + 1;
					if(move == arrLength){
						$('#noviceGuide>li').eq(0).find('.step_item').removeClass('isNotStep');
						$('#noviceGuide>li').eq(0).find('.step_item').addClass('isStep');
						$('#noviceGuide>li').eq(0).find('.step_item').children().addClass('is-step-arrow');
						$('#noviceGuide>li').eq(0).find('.step_item').parent().parent().parent().addClass('J_active');
					}else{
						$('#noviceGuide>li').eq(move).find('.step_item').removeClass('isNotStep');
						$('#noviceGuide>li').eq(move).find('.step_item').addClass('isStep');
						$('#noviceGuide>li').eq(move).find('.step_item').children().addClass('is-step-arrow');
						$('#noviceGuide>li').eq(move).find('.step_item').parent().parent().parent().addClass('J_active');
					}
				}else if( (arrLength - 1) >= it && move === false){ //上一步
					$('.imgBox img').attr("src",arr[it-1].src);
					it = it - 1;
					if(it == -1){
							$('#noviceGuide>li').eq((arrLength - 1)).find('.step_item').removeClass('isNotStep');
							$('#noviceGuide>li').eq((arrLength - 1)).find('.step_item').addClass('isStep');
							$('#noviceGuide>li').eq((arrLength - 1)).find('.step_item').children().addClass('is-step-arrow');
							$('#noviceGuide>li').eq((arrLength - 1)).find('.step_item').parent().parent().parent().addClass('J_active');
						}else{
							$('#noviceGuide>li').eq(it).find('.step_item').removeClass('isNotStep');
							$('#noviceGuide>li').eq(it).find('.step_item').addClass('isStep');
							$('#noviceGuide>li').eq(it).find('.step_item').children().addClass('is-step-arrow');
							$('#noviceGuide>li').eq(it).find('.step_item').parent().parent().parent().addClass('J_active');
						}
				}else{
					$('.imgBox img').attr("src",arr[clicknNum].src);
					$(e).removeClass('isNotStep');
			    	$(e).addClass('isStep');
			    	$(e).children().addClass('is-step-arrow');
			    	$(e).parent().parent().parent().addClass('J_active');
				}
			}
		}
		$('body').on('click','.step_item',function(){
			var clicknNum = $(this).parent().parent().parent().index();
			
			newGuide(this,1,arrLength,arrLength,arr,clicknNum);
			/* 按钮显示 */
			var initIndex = $('#noviceGuide .J_active').index();
			if(initIndex == 0){
				$("#nextStepDt2").show();
				$("#nextStepDt").hide();
				$("#prevStepDt").hide();
			}
			if(initIndex == (arrLength - 1)){
				$("#prevStepDt1").show();
				$("#nextStepDt").hide();
			}
	    });
	    $('#rightBox').on('click','#nextStepDt',function(){
	    	var initIndex = $('#noviceGuide .J_active').index();
	    	newGuide(this,initIndex,false,arrLength,arr);
	    })
	    $('#rightBox').on('click','#nextStepDt2',function(){
	    	var initIndex = $('#noviceGuide .J_active').index();
	    	newGuide(this,initIndex,false,arrLength,arr);
	    })
	    $('#rightBox').on('click','#prevStepDt',function(){
	    	var initIndex = $('#noviceGuide .J_active').index();
	    	newGuide(this,false,initIndex,arrLength,arr);
	    })
	    $('#rightBox').on('click','#prevStepDt1',function(){
	    	$('#imgBoxMain').remove();
	    	$('#rightBox').remove();
	    })
	};
	window.newKnow = newKnow;

	$('body').on('click','#'+btnId+'',function(){
    	new newKnow();
    })
}());
