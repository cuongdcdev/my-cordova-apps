document.addEventListener('deviceready',onDeviceReady,false);

function onDeviceReady(){
$(document).ready(function(){
FastClick.attach(document.body);
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
        //chi cho phep in tren man hinh neu nowScreen ko trong hoac ko co bieu thuc nao o dong cuoi cung :
    });
    //khi bam = 
        $(".eval").click(function(){
        nowScreen = Screen.html();
        //xoa  các dấu  trùng nhau :     
        var clearedOperator = 
        nowScreen.replace(/.$/g,'').replace(/x+/g,'*').replace(/÷+/g,'/').replace(/=*/g,'').replace(/\++/g,'+');
//        console.log(clearedOperator);
        //kiểm tra dấu -     
        if (clearedOperator.match(/-+/) === null ){    
        var answer = eval(clearedOperator);
//        Screen.html(nowScreen  + answer)
       Screen.parent().append("<div class='answered'>"+nowScreen+answer+"</div>");
        }
        if(clearedOperator.match(/-+/)[0].length % 2 === 0){
            var answer = eval(clearedOperator.replace(/\-+/,'+'));
            Screen.parent().append("<div class='answered'>"+nowScreen+answer+"</div>");
//            Screen.html(answer);
//                    console.log("da xoa : " + clearedOperator);
        }else{
            var answer = eval(clearedOperator.replace(/-+/,'-'));
            Screen.parent().append("<div class='answered'>"+nowScreen+answer+"</div>");
//            Screen.html(answer);
        }
        });        
});//end dom ready
}//end dvice ready 