$(function(){	

	//snb tab
	var tabsFn = (function() {
		function init() {
		setHeight();
		}
		function setHeight() {
		var $tabPane = $('.tab-pane'),
				tabsHeight = $('.panels').height();
		
		$tabPane.css({
			//height: tabsHeight
		});
		}
		$(init);
	})();

	//modal popup
	$('[open-modal]').on('click', function(){
		var id = $(this).attr('open-modal');
		$('.modal#'+id).addClass('active');
	});
	$('[close-modal]').on('click', function(){
		$(this).parents('.modal').removeClass('active');
	});
	$('.modal').on('click', function(e) {
		if(e.target !== this){return};
		$(this).removeClass('active');
	});

});
//탭
function commonTab(parentTab, tabNum){
	$("."+parentTab+" ul.tabs li").removeClass("on");
	$("."+parentTab+" ul.tabs li."+tabNum).addClass("on");
	$("."+parentTab+" .tabcontents").removeClass("on");
	$("."+parentTab+" .tabcontents."+tabNum).addClass("on");
}
$(function(){

	//달력
	var datePickerOption = {
		showOn: "both", 
		buttonImage: "../images/ico_calendar.png", 
		buttonImageOnly: true,
		dayNames: [ "일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일" ],
		dayNamesMin: [ "일", "월", "화", "수", "목", "금", "토" ],
		dayNamesShort: [ "일", "월", "화", "수", "목", "금", "토" ],
		monthNames: [ "1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월" ],
		monthNamesShort: [ "1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월" ],
		closeText: '닫기',
		weekHeader: '주',
		dateFormat: 'yy-mm-dd',
		isRTL: false,
		showMonthAfterYear: true,
		yearSuffix: '년'
	};

	try{
	$(".date_box input").datepicker(datePickerOption);	
	}catch(e){}

});

$(document).ready(function(){ 
	var fileTarget = $('.filebox .upload-hidden');
	fileTarget.on('change', function(){  if(window.FileReader){
		 var filename = $(this)[0].files[0].name;
		} 
		else { 
			var filename = $(this).val().split('/').pop().split('\\').pop();
		}
		$(this).siblings('.upload-name').val(filename); 
	  }); 

	$('#filecancle').click(function() {
		var files = document.getElementsByName("upload-name");
		files[i].querySelector();
		document.selection.clear();
	});
});


// tree_menu
jQuery(function($){
	var tree_menu = $('.tree_menu');
	var icon_open = '../images/icon-plus.png';
	var icon_close = '../images/icon-minus.png';

	tree_menu.find('.tree_menu_control').prepend('<button class="menu_control"><img src="' + icon_open + '" /></button> ');
	tree_menu.find('.tree_menu_control:last-child').addClass('end');
	
	$('.tree_menu_control>.menu_control').click(function(){
		var temp_el = $(this).parent().find('>ul');
		if (temp_el.css('display') == 'none'){
			temp_el.slideDown(100);
			$(this).find('img').attr('src', icon_close);
			return false;
		} else {
			temp_el.slideUp(100);
			$(this).find('img').attr('src', icon_open);
			return false;
		}
	});	

	function tree_init(status){
		if (status == 'close'){
			tree_menu.find('ul').hide();
			$('.tree_menu button.control').find('img').attr('src', icon_open);
		} else if (status == 'open'){
			tree_menu.find('ul').show();
			$('.tree_menu button.control').find('img').attr('src', icon_close);
		}
	}
	tree_init('close');
		
}

);
