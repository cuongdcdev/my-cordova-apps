document.addEventListener('deviceready',onDeviceReady,false);
function onDeviceReady(){
$(document).ready(function(){
FastClick.attach(document.body);
var num = 0;
var Screen = $(".answer-screen");
var operators = ['+', '-', 'x', '÷'];
//var topScreen = $("answer-screen:first");
    //tra lai ket qua cua cau vua nhap 

$(".top-buttons .clear").click(function(){
    $(".answer-screen:first").html("");
});
    
    $(".keys span").click(function(){
//        var mem = 0;
        var now = $(this).html(); // lay gia tri cua phim dc bam
        var getScreen = Screen.html(); // lay gia tri cua man hinh 
        Screen.html( getScreen + now); // in kq ra man hinh 
        var nowScreen = getScreen + now; // 
    });
    //khi bam = 
        $(".eval").click(function(){
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
            
        $(".percent").click(function(){
            var answered =  $(".answered-screen").children();
           answered.fadeOut("600",function(){
                answered.remove();
            })
//            $(".answered").fadeOut("500",function(){
//                this.remove();  
            });
        });//end click clear history
        });        
}
//end devices ready
