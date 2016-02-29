$(document).ready(function(){
var Screen = $(".answer-screen");
var operators = ['+', '-', 'x', '÷'];
    
$(".top-buttons .clear").click(function(){
    $(".answer-screen").html("");
});
    
    $(".keys span").click(function(){
//        var mem = 0;
        var now = $(this).html(); // lay gia tri cua phim dc bam
        var getScreen = $(".answer-screen").html(); // lay gia tri cua man hinh 
        $(".answer-screen").html( getScreen + now); // in kq ra man hinh 
        var nowScreen = getScreen + now; // 
        //chi cho phep in tren man hinh neu nowScreen ko trong hoac ko co bieu thuc nao o dong cuoi cung :
    });
    
        $(".eval").click(function(){
        nowScreen = Screen.html();
        //xoa  các dấu  trùng nhau :     
        var clearedOperator = 
        nowScreen.replace(/.$/g,'').replace(/x+/g,'*').replace(/÷+/g,'/').replace(/=*/g,'').replace(/\++/g,'+');
        console.log(clearedOperator);
        //kiểm tra dấu -     
        if (clearedOperator.match(/-+/) === null ){    
        var answer = eval(clearedOperator);
        Screen.html(answer);}
        if(clearedOperator.match(/-+/)[0].length % 2 === 0){
            var answer = eval(clearedOperator.replace(/\-+/,'+'));
            Screen.html(answer);
//                    console.log("da xoa : " + clearedOperator);
        }else{
            var answer = eval(clearedOperator.replace(/-+/,'-'));
            Screen.html(answer);
        }
        });        
});