document.addEventListener('deviceready',onDeviceReady,false);
function onDeviceReady(){
$(document).ready(function(){
FastClick.attach(document.body);
var num = 0;
var Screen = $(".answer-screen");
//var topScreen = $("answer-screen:first");
    //tra lai ket qua cua cau vua nhap 

$(".top-buttons .clear").on('touchstart',function(){
    $(".answer-screen:first").html("");
    $(this).addClass('clear-touched');
});
$(".top-buttons .clear").on('touchend',function(){
    $(this).removeClass('clear-touched');
});
    
    $(".keys span").on('touchstart',function(){
//        var mem = 0;
        $(this).addClass('span-touched');
        var now = $(this).html(); // lay gia tri cua phim dc bam
        var getScreen = Screen.html(); // lay gia tri cua man hinh 
        Screen.html( getScreen + now); // in kq ra man hinh 
        var nowScreen = getScreen + now; // 
    });
    $(".keys span").on('touchend',function(){
        $(this).removeClass('span-touched');
    })
    //khi bam = 
        $(".eval").on('touchstart',function(){
        $(this).addClass('eval-touched');
        if(Screen.html() == "+-÷x="){
        alert("Stupid Calculator - đây là phần mềm đầu tiên tớ viết \n Có 2 phiên bản trên Android và Windows phone \n với Stupid Calculator bạn có thể kéo xuống để xem lại lịch sử những phép tính mình đã bấm :3,rất thích hợp cho những người hay quên như tớ :v \n Cảm ơn bạn đã tốn thời gian tải và sử dụng cái thứ này :D mọi thắc mắc/góp ý xin liên hệ fb của tớ :v , THÔI,LẢM NHẢM THẾ ĐỦ RỒI :V , à quên ,tác giả : Vodanh   ");
        }
        nowScreen = Screen.html();
        num++;
        //xoa  các dấu  trùng nhau :     
        var clearedOperator = 
        nowScreen.replace(/.$/g,'').replace(/x+/g,'*').replace(/÷+/g,'/').replace(/=*/g,'').replace(/\++/g,'+');
//        console.log(clearedOperator);
        //kiểm tra dấu -     
        if (clearedOperator.match(/-+/) === null ){    
        var answer = eval(clearedOperator);
//        Screen.html(nowScreen  + answer)
//       Screen.parent().find(".answered-screen").prepend("<div class='answered'>"+"<span class='count'>"+num+"</span>"+nowScreen+answer+"</div>");
           Screen.parent().find(".answered-screen").prepend("<div class='answered'>"+"<span class='count'>"+num+"</span>"+nowScreen+answer+"</div>");
        Screen.html(answer);
        }
        if(clearedOperator.match(/-+/)[0].length % 2 === 0){
            var answer = eval(clearedOperator.replace(/\-+/,'+'));
             Screen.html(answer);
           Screen.parent().find(".answered-screen").prepend("<div class='answered'>"+"<span class='count'>"+num+"</span>"+nowScreen+answer+"</div>");
        }else{
            var answer = eval(clearedOperator.replace(/-+/,'-'));
             Screen.html(answer);
           Screen.parent().find(".answered-screen").prepend("<div class='answered'>"+"<span class='count'>"+num+"</span>"+nowScreen+answer+"</div>");
        }
            
        $(".percent").on('touchstart',function(){
            $(this).addClass('percent-touched');
            var answered =  $(".answered-screen").children();
           answered.fadeOut("600",function(){
                answered.remove();
            })
            });//end click clear history
        $(".percent").on('touchend',function(){
            $(this).removeClass('percent-touched');
        })
        });//end ontouchstart khi an vao = 
    
        $(".eval").on('touchend',function(){
            $(this).removeClass('eval-touched');
        });
        
        $(".operator").on("touchstart",function(){
            $(this).addClass('operator-touched');
        });
        $(".operator").on("touchend",function(){
            $(this).removeClass('operator-touched');
        });
        }); //end dom ready       
}
//end devices ready
