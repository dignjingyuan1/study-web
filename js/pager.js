var Pager = {
	index : 1,
	limit : 10,
	total : 0,
	list: undefined,
	pagerId: undefined,
	Init: ()=>{
		Pager.setPager();
	},
	onLoad: undefined,
	setPager: ()=>{
		var $pager = Pager.pagerId ? $(Pager.pagerId) : $("#pager");
		$pager.empty();
		let _html = $("<uL></ul>").appendTo($pager);
		let _li = "";
		if(Pager.index == 1){
		 	$("<li class='paging-item--disabled'><i class='icon iconfont icon-icon_paging_left'></i></li>").appendTo($(_html));
			$("<li class='paging-item--disabled'><i class='icon iconfont icon-fanhui1'></i></li>").appendTo($(_html));
		}else{
			$("<li><i class='icon iconfont icon-icon_paging_left'></i></li>").bind('click',(e)=>{
		 		Pager.first();
		 		var index = $(e.target).parents(".pager").attr("value");
		 		if(typeof Pager.onLoad == 'function'){
		 			var item = Pager.list ? Pager.list[index] : undefined;
					Pager.onLoad(item);
				}
		 	}).appendTo($(_html));
		 	$("<li><i class='icon iconfont icon-fanhui1'></i></li>").bind('click',(e)=>{
				Pager.prev();
				var index = $(e.target).parents(".pager").attr("value");
				if(typeof Pager.onLoad == 'function'){
					var item = Pager.list ? Pager.list[index] : undefined;
					Pager.onLoad(item);
				}
			}).appendTo($(_html));
		}
		let totalIndex = Math.ceil(Pager.total/Pager.limit)+1;
		let iIndex = Pager.index > 1 ? Pager.index - 1 : Pager.index;
		let index = totalIndex > iIndex+5 ? iIndex+5 : totalIndex;
		for(var i= iIndex; i<index; i++){
			if(i == Pager.index){
				$("<li class='paging-item--disabled'>"+i+"</li>").appendTo($(_html))
			}else{
				$("<li>"+i+"</li>").bind('click',{pageIndex:i},(e)=>{
					var pageIndex = e['data'].pageIndex;
					Pager.index = pageIndex;
					var index = $(e.target).parents(".pager").attr("value");
					if(typeof Pager.onLoad == 'function'){
						var item = Pager.list ? Pager.list[index] : undefined;
						Pager.onLoad(item);
					}
				}).appendTo($(_html));
			}
		}
		if(Pager.index == Pager.pages()){
			$("<li class='paging-item--disabled'><i class='icon iconfont icon-jinru'></i></li>").appendTo($(_html));
			$("<li class='paging-item--disabled'><i class='icon iconfont icon-icon_paging_right'></i></li>").appendTo($(_html));
		}else{
			$("<li><i class='icon iconfont icon-jinru'></i></li>").bind('click',(e)=>{
				Pager.next();
				var index = $(e.target).parents(".pager").attr("value");
				if(typeof Pager.onLoad == 'function'){
					var item = Pager.list ? Pager.list[index] : undefined;
					Pager.onLoad(item);
				}
			}).appendTo($(_html));
			$("<li><i class='icon iconfont icon-icon_paging_right'></i></li>").bind('click',(e)=>{
				Pager.last();
				var index = $(e.target).parents(".pager").attr("value");
				if(typeof Pager.onLoad == 'function'){
					var item = Pager.list ? Pager.list[index] : undefined;
					Pager.onLoad(item);
				}
			}).appendTo($(_html));
		}
	},
	
	pages: ()=>{
		return Math.ceil(Pager.total / Pager.limit);
	},
	
	// 首页
	first: ()=>{
		if (Pager.index !== 1) {
    			Pager.index = 1;
		}
	},
	
	// 上一页
	prev: ()=>{
		if(Pager.index > 1){
			Pager.index = Pager.index - 1;
		}
	},
	
	// 下一页
	next: ()=>{
		if(Pager.index < Pager.pages()){
			Pager.index = Pager.index + 1;
		}
	},
	/**
	 * 尾页
	 */
	last: ()=>{
		if (Pager.index != Pager.pages()) {
			Pager.index = Pager.pages();
	    }
	}
	
}

/**
 * 计算页码
 */
function pagers(){
	const array = []
    const perPages = this.perPages
    const pageCount = this.pages
    let current = this.index
    const _offset = (perPages - 1) / 2
    const offset = {
    		start : current - _offset,
        end   : current + _offset
   	}

    //-1, 3
    if (offset.start < 1) {
   		offset.end = offset.end + (1 - offset.start)
        offset.start = 1
    }
    if (offset.end > pageCount) {
    		offset.start = offset.start - (offset.end - pageCount)
        offset.end = pageCount
    }
    if (offset.start < 1) offset.start = 1

     this.showPrevMore = (offset.start > 1)
     this.showNextMore = (offset.end < pageCount)

    for (let i = offset.start; i <= offset.end; i++) {
          array.push(i)
    }
   	return array
}