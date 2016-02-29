        $(document).ready(function () {
            document.addEventListener("deviceready",deviceReady,false);
        function deviceReady(){
            $(function(){
                FastClick.attach("document.body");
            });
            //preload audio :
            if(window.plugins && window.plugins.NativeAudio){
                window.plugins.NativeAudio.preloadComplex('_bgSound','sounds/bg.mp3',0.7,1,function(message){},function(msg){
                    console.log("co loi : " + msg);
                });
                window.plugins.NativeAudio.preloadComplex('_correctSound','sounds/tick.mp3',1,1,function(msg){},function(msg){
                    console.log("co loi : " + msg);
                });
                window.plugins.NativeAudio.preloadComplex('_overSound','sounds/wellDone.mp3',1,1,function(msg){},function(msg){
                    console.log("co loi : " + msg);
                });
            
            if(!localStorage.crazyColors){
                localStorage.crazyColors = JSON.stringify({
                });
            }
            var canPlaySound = true;
            var assetLoaded = 0;
            var gameAssets = [];
            var saveHighScore = JSON.parse(localStorage.crazyColors);
            var timeCounter ;
            var randomColorIndex;
            var randomTextIndex;
            var userChoose = null;
            var score = 0;
            var highScore = saveHighScore.highScore ? saveHighScore.highScore : 0 ;
            var time = 2;
            var _content = $("html,body");
            var _text = $(".text");
            var _playButton  = $("#playButton,#replayButton");
            var _sound = $(".sound span");
            var wwidth = $(window).innerWidth() ;
            var wheight =$(window).innerHeight();
            _text.css("width",Math.floor(wwidth/2)).css("height",Math.floor(wwidth/2)).css("left",wwidth/2-wwidth/4).css("top",wwidth/2-wwidth/4);
            
            _playButton.css("width",Math.floor(wwidth/2)).css("height",Math.floor(wwidth/2)).css("left",wwidth/2-wwidth/4).css("top",wwidth-50);
            var text = ["vàng", "vàng cam", "cam", "đỏ cam", "đỏ", "đỏ tím",
                            "tím", "tím xanh", "lục", "lục nhạt", "xanh", "xanh nhạt","xám","đen"];

            var colors = ["#FEF900", "#FD8000", "#FF3800", "#FE0000", "#B80000", "#581540",
                              "#6F0080", "#20004E", "#001588", "#00406E", "#007717", "#38BB00","#C0C0C0","#000000"
                            ];
            
            function randomComment(){
                var comments = [
                      "tạm","awesome...","\|\﻿\ \(\•\ \◡\•\)\|  ",
                      "ổn","phong độ","khá lắm",
                     "đập zai ... ","suất sắc!!"  
                ];
                var rand = Math.floor(Math.random()*comments.length);
                return comments[rand];
            }
            
            function renderColor() {
                var randColor = Math.floor(Math.random() * colors.length);
                _content.animate({
                   backgroundColor : colors[randColor],
                });            
                
                
                randomColorIndex = randColor;
            }
            
            function renderText() {
                var randColor = Math.floor(Math.random() * colors.length);
                _text.css("color", colors[randColor]);
                _text.removeClass().addClass("text animated  " +randomFx());
                _text.html(text[randColor]);
                _text.animate({
                    backgroundColor : colors[randColor],
                    color : "white"
                });
                _text.squishy();
                randomTextIndex = randColor;
            }

            function renderQuestion() {
                renderColor();
                renderText();
            }
            
            function checkAnswer() {
                if (userChoose===false && randomColorIndex !== randomTextIndex) {
                    score++;
                    correctSound.currentTime = 0;
                    correctSound.play();
                    window.plugins.NativeAudio.play('_correctSound');
                    renderQuestion();
                    time = 2;
                }else if(userChoose===true && randomColorIndex === randomTextIndex){
                    score++;
                    renderQuestion();
                    correctSound.currentTime = 0;
                    correctSound.play();
                     window.plugins.NativeAudio.play('_correctSound');
                    time = 2 ;
                }else if (userChoose === null){
                    renderQuestion();
                }else{
                    gameOver();
                }
                return false;
            }
            
            function randomFx(){
                var effects =
                ['slideInLeft','slideInRight','zoomIn','zoomInDown','zoomInLeft','zoomInRight','flipInX',
                'fadeInLeft','bounceInLeft','bounceInDown','wobble','tada','shake','rubberBand','tada','tada','tada','tada'];
                var length = effects.length;
                var random_effect_num = Math.floor((Math.random()*length));
                return effects[random_effect_num];
            }
            
            function swapAnswerBtn(){
                if(Math.random() > 0.3 ){
                $("#chooseTrue").removeClass("toRight").addClass("toLeft");
                $("#chooseFalse").removeClass("toLeft").addClass("toRight");
            }else{
                $("#chooseTrue").removeClass("toLeft").addClass("toRight");
                $("#chooseFalse").removeClass("toRight").addClass("toLeft");
            }
            }
            
            function gameOver(){
                clearInterval(timeCounter);
                 $(".sound span").removeClass().addClass("glyphicon glyphicon-volume-up");
                overSound.currentTime =  0;
                overSound.volume = 1 ;
                overSound.play();
                bgSound.pause();
                 window.plugins.NativeAudio.stop('_bgSound');
                 window.plugins.NativeAudio.play('_overSound');
                    time = 2; 
                    userChoose = null;
                if(score > parseInt(highScore)){
                    highScore = score;
                    localStorage.crazyColors = JSON.stringify({
                        highScore : score
                    });
                }
                $("#gamePlay").hide("200");
                $("#yourScore").html(score);
                $("#gameOver").show(200);
                $("#comment").text("").html(randomComment()).squishy({maxWidth:200});
                
                $("#replayButton span ").on("click touchend",function(e){
                    location.reload();
                });
            }
            
            function gameStart(){
                $("html").css("backgroundColor","#6F0080");
                $("#highScoreScreen span").html(highScore + "<sup class='glyphicon glyphicon-star-empty'>\<\/sup\>" );
                $("#gamePlay,#gameOver").css("display","none");
                $("#playButton").on("click touchend",function(){
                    $("#gameMenu,#gameOver").css("display","none");
                    $("#gamePlay").show("200");
                    playGame();
                });
            }
            
            function playGame() {
                //counter time :
                 timeCounter = setInterval(function () {
                    time--;
                     console.log("diem :  "+  score);
                    console.log(time);
                    if (time === 0) {
                        gameOver();
                        
                    }
                     return false;
                }, 1000);
                
            
                renderQuestion();
                
            //user click 
                $("#chooseTrue").on("click touchend",function(e){
                    e.stopPropagation();
                    userChoose = true;
                     checkAnswer();
                     $(this).removeClass("action-button-touch");
                    swapAnswerBtn();
                     $("#score_display").html(score).removeClass().addClass("animated tada");
                    return false;
                });
                
                $("#chooseTrue").on("touchstart",function(e){
                     $(this).addClass("action-button-touch");
                    e.stopPropagation();
                    return false;
                });
                
                $("#chooseFalse").on("click touchend",function(e){
                    e.stopPropagation();
                    userChoose = false;
                     checkAnswer();
                    $(this).removeClass("action-button-touch");
                    swapAnswerBtn();
                     $("#score_display").text(score);
                    return false;
                });
                
               $("#chooseFalse").on("touchstart",function(e){
                   e.stopPropagation();
                 $(this).addClass("action-button-touch");
                   return false;
               });
            //score : 
               $("p#score_display").html("").append(score);
                $("p#hightScore_display").html("").append(highScore);
            }//end playGame()
            
            
//            GAME SOUNDS ::
            var bgSound = document.getElementById("backgroundSound");
                bgSound.addEventListener("canplaythrough",loadHandler,false);
                bgSound.load();
            gameAssets.push(bgSound);
            
            var correctSound = document.getElementById("tickSound");
                correctSound.addEventListener("canplaythrough",loadHandler,false);
                correctSound.load();
            gameAssets.push(correctSound);
            
            var overSound = document.getElementById("overSound");
                overSound.addEventListener("canplaythrough",loadHandler,false);
                overSound.load();
            gameAssets.push(overSound);
            
            function loadHandler(){
                assetLoaded++;
                if(assetLoaded === gameAssets.length+1){
                    gameStart();
                    bgSound.volume = 0.7;
                    bgSound.play();
                     window.plugins.NativeAudio.loop('_bgSound');
                     window.plugins.NativeAudio.play('_bgSound');
                    if(typeof bgSound.loop === 'boolean'){
                        bgSound.loop  = true;       
                    }else{
                    bgSound.addEventListener("ended",function(){
                        this.currentTime =0;
                        this.play();
                    },false);
                }
                }
                console.log("load ");
            }
            loadHandler();
                }//end preLoadAudio!
            else{
                console.log("chua co plugin " );
            } 
        }//end deviceReady()
        });