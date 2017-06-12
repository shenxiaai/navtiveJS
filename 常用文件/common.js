'use strict';
var cw = document.documentElement.clientWidth,
	ch = document.documentElement.clientHeight;

function nTabs(thisObj, Num) {
	if (thisObj.className == 'active') return;
	var tabObj = thisObj.parentNode.id;
	var tabList = document.getElementById(tabObj).getElementsByTagName('li');
	for (var i = 0; i < tabList.length; i++) {
		if (i == Num) {
			thisObj.className = 'active';

			document.getElementById(tabObj + '_Content' + i).style.display = 'block';
		} else {
			tabList[i].className = 'normal';
			document.getElementById(tabObj + '_Content' + i).style.display = 'none';
		}
	}
}

function getChildren(obj){
    var objChild = [] ;
    var objs = obj.getElementsByTagName('*');
    for(var i = 0,j = objs.length; i < j;++i){
            if(objs[i].nodeType != 1){
            	alert(objs[i].nodeType);
                continue;
            }
            var temp = objs[i].parentNode;
            if(temp.nodeType == 1){
                    if(temp == obj){
                            objChild[objChild.length] = objs[i];
                    }
            }else if(temp.parentNode == obj){
                    objChild[objChild.length] = objs[i];
            }
    }
    return objChild;
}


function bubbleSort (arr){
	for(var i = 0; i < arr.length-1; i++){
		for(var j = i+1; j < arr.length; j++){
			if(arr[i] < arr[j]){	// 如果前面的数据比后面的小就交换
				var temp = arr[i];
				arr[i] = arr[j];
				arr[j] = temp;
			}
		// console.log(arr);
		}
	}
	return arr;
}

// 随机排序
function randomsort(a, b) {
	return Math.random()>.5 ? -1 : 1; //	通过随机产生0到1的数，然后判断是否大于0.5从而影响排序，产生随机性的效果。
}


function getElementTop (ele) {
　　var eleTop = ele.offsetTop;	//获得ele元素距相对定位的父元素的top
　　ele = ele.offsetParent;	//将ele换成起相对定位的父元素
　　while(ele != null) {		//只要还有相对定位的父元素
　　　　//获得父元素 距他父元素的top值,累加到结果中
　　　　eleTop += ele.offsetTop;
　　　　//再次将ele换成他相对定位的父元素上;
　　　　ele = ele.offsetParent;
　　}
　　return eleTop;
}


function quickSort (arr){
	//如果数组长度小于等于1无需判断直接返回即可
	if(arr.length <= 1){
		return arr;
	}
	var midIndex = Math.floor(arr.length / 2);	//取基准点
	var midIndexVal = arr.splice(midIndex, 1);	//取基准点的值,splice(index,1)函数可以返回数组中被删除的那个数arr[index+1]
	var left = [];	//存放比基准点小的数组
	var right = [];	//存放比基准点大的数组
	//遍历数组，进行判断分配
	for(var i = 0; i < arr.length; i++){
		if(arr[i] < midIndexVal){
			left.push(arr[i]);	//比基准点小的放在左边数组
		}
		else{
			right.push(arr[i]);	//比基准点大的放在右边数组
		}
		// console.log(arr);
	}
	//递归执行以上操作,对左右两个数组进行操作，直到数组长度为<=1；
	return quickSort(left).concat(midIndexVal,quickSort(right));
};



function getStyle (obj, css) {
	if(obj.currentStyle){
		return obj.currentStyle[css];
	}else{
		return getComputedStyle(obj, false)[css];
	}
}

function getByClass(parent, clazz) {
	var result = [],
		ele = parent.getElementsByTagName('*');

	for(var i = 0; i < ele.length; i++) {
		if(ele[i].className == clazz) {
			result.push(ele[i]);
		}
	}
	return result;
}

function moveAction (obj, attr, target) {
	window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
	if(!window.requestAnimationFrame){
		target = parseInt(target);
		clearInterval(obj.timer);
		obj.timer = setInterval( function () {
			var curr = 0;
			if(attr == 'opacity'){
				curr = Math.round(parseFloat(getStyle(obj, attr))) * 100;
			}else{
				curr = parseInt(getStyle(obj, attr));
			}
			var speed = (target - curr) / 3;
			speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
			if(curr == target){
				clearInterval(obj.timer);
			}else{
				if(attr == 'opacity'){
					obj.style.filter = 'alpha(opacity: ' + (curr + speed) + ')';
					obj.style.opacity = (curr + speed) / 100;
					text.value = obj.style.opacity;
				}else{
					obj.style[attr] = curr + speed + 'px';
				}
			}
		}, 30);
	}else {
		// 匀速运动写法
		/*var ani = requestAnimationFrame(function(){
			demo.style.left = (demo.offsetLeft + 1) + 'px';
			//当超过300px后才停止
			if(parseInt(demo.style.left) <= 300) {
				requestAnimationFrame(arguments.callee);
			}else{
				cancelAnimationFrame(ani);
			}
		});*/

		// 变速运动写法
		function ani () {
			var curr = 0;
			if(attr == 'opacity'){
				curr = Math.round(parseFloat(getStyle(obj, attr))) * 100;
			}else{
				curr = parseInt(getStyle(obj, attr));
			}
			var speed = (target - curr) / 6;
			speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

			if(attr == 'opacity'){
				obj.style.filter = 'alpha(opacity: ' + (curr + speed) + ')';
				obj.style.opacity = (curr + speed) / 100;
			}else{
				obj.style[attr] = curr + speed + 'px';
			}

			if(curr == target){
				window.cancelAnimationFrame(ani);
			}else{
				window.requestAnimationFrame(ani);
			}
		};
		window.requestAnimationFrame(ani);
	}
}

function pagination(Pager) {
	var $ = function(id){
		return document.getElementById(id);
	}

	var cont 		= $(Pager.cont),
		pageNum 	= Pager.pageNum,
		pages 		= $(Pager.pages),
		prev 		= $(Pager.prev),
		next 		= $(Pager.next),
		lines 		= cont.children.length,
		pageList 	= '',
		pageCount 	= 0,
		currentPage = 0;

	for(var i = 0; i < cont.children.length; i++){
		cont.children[i].style.display = 'none';
	}
	for(var i = 0; i < pageNum; i++){
		cont.children[i].style.display = '';
	}

	//生成翻页页码
	pageCount = parseInt(lines / pageNum) + (lines % pageNum == 0 ? 0 : 1);
	for(var i = 0; i < pageCount; i++){
		pageList += '<li>' + (i + 1) + '</li>';
	}
	pages.innerHTML = pageList;
	pages.children[0].className = Pager.activeName;

	//点击页码
	for(var i = 0;i < pages.children.length; i++){
		pages.children[i].index = i;
		pages.children[i].onclick = function() {
			showOut(this.index);
			this.className = Pager.activeName;
			currentPage = this.index;
		};
	}

	//上一页
	prev.onclick = function() {
		currentPage--;
		if(currentPage >= 0){
			showOut(currentPage);
		}else{
			console.warn('已经到第一页了！');
		}
	}

	//下一页
	next.onclick = function() {
		currentPage++;
		if(currentPage < pageCount){
			showOut(currentPage);
		}else{
			console.warn('最后一页！');
		}
	}


	//显示或隐藏内容
	function showOut(ind) {
		for(var i = 0; i < pages.children.length; i++) {
			pages.children[i].className = '';
		}
		pages.children[ind].className = Pager.activeName;

		for(var i = 0; i < cont.children.length; i++){
			cont.children[i].style.display = 'none';
		}

		for(var i = ind * pageNum; i < (ind + 1) * pageNum; i++) {
			if(i < cont.children.length){
				cont.children[i].style.display = '';
			}
			continue;
		}
	}
}
