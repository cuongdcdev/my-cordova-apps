            window.i = 0;
            window.timeDelay = 0 ;  
//            window.arrCode = "0 2 0 2 0 2 0 2 1 2 1 2 0 2 0 2 0 2".split(" ");
            window.arrCode = "0 2 0 2 0 2 0 2 1 2 1 2 1 0 2 0 2 0 2".split(" ");
            window.DELAY = 1000;
            window.isSosOn = false;
var LightOb = {
        init : function(){
            console.log("init called ");
           if ('addEventListener' in document) {
                    document.addEventListener('DOMContentLoaded', function() {
                    FastClick.attach(document.body);
                }, false);
            }//chay fastclick
            $sos = document.getElementById("sos");
            $text = document.getElementsByClassName("text")[0];
            $about = document.getElementsByClassName("about")[0];

            $lightOn = document.getElementsByClassName("light")[0];
            $lightOff = document.getElementsByClassName("light")[1];
            $mainButton = document.getElementsByClassName("main-button")[0];
            
            LightOb.fitFontSize($sos);
            
            
            document.addEventListener("deviceready",LightOb.onDeviceReady,false);
        },
        onDeviceReady : function(){
            console.log("%c device ready ! ","background-color:black;color:white");
        // ---- 2 bien nay cho ham turnSOS ------

            self = LightOb;
            sefl = LightOb;
            
            sefl.checkLight();
            $lightOff.style.display = "none";
            $lightOn.style.display = "block";

            sefl.backButtonExit();
        },
        checkLight : function(){    
            window.plugins.flashlight.available(function(isAvailable) {
                  if (isAvailable) {
                      self.turnLightOn();
                     self.toggleLightButton(true);
                      self.toggleSosButton(true);
                  } else {
                      self.toggleLightButton(false);
                      self.toggleSosButton(false);
                      self.notSupportFlashLight();
                  }
            });
        },
        turnLightOn : function(duration){
            if(duration){
                 console.log("light on " + duration + " ms");
                  window.plugins.flashlight.switchOn(function(){
                      lightInterval = window.setTimeout(function(){
                         window.plugins.flashlight.switchOff();
                    },duration);
                  });
            }else{
                window.plugins.flashlight.switchOn(function(){
                     console.log("light on ");
                });
            }
        },
        turnLightOff : function(dur){
            if(dur){
                window.setTimeout(function(){
                    console.log("turn light off : " + dur + " ms ");
                    window.plugins.flashlight.switchOn();
                },dur);
            }else{
                window.plugins.flashlight.switchOff(function(){
                    console.log("light off");
                }); 
            }
        },
        notSupportFlashLight : function(){
            $text.innerHTML = "Thiết bị của bạn không hỗ trợ đèn flash :(";
            console.log("not support flash light ! ");
            $lightOn.style.display = "none";
            $lightOff.style.display = "block";
            $sos.className = "sos-off";
        },
        turnSos : function(){
         if(window.isSosOn){
            if (i >= arrCode.length) window.i = 0 ;
            if (i < arrCode.length) {
                switch (arrCode[i]) {
                    case "0":
                        timeDelay = DELAY;
                       window.x =  setTimeout(function() {
                            console.log( "0  " + i + " " + timeDelay);
                            self.turnLightOff();
                           window.i++;
                           self.turnSos();
                        }, timeDelay);
                        break;

                    case "2":
                        timeDelay = DELAY;
                      window.x =  setTimeout(function() {
                            console.log("------------" + i + " " + timeDelay);
                            self.turnLightOn();
                          window.i++;
                          self.turnSos();
                        }, timeDelay);
                        break;

                    case "1":
                        timeDelay = DELAY * 3;
                        window.x = setTimeout(function() {
                            console.log("1   " + i + " " + timeDelay);
                            self.turnLightOff();
                            window.i++;
                            self.turnSos();
                        }, timeDelay);
                        break;
                }
              }
         }
        },
        stopSos : function(){
            //reset index i + timeDelay trong ham turnSOS 
          while(window.x--){
            window.clearTimeout(x);
           window.timeDelay = 0;
          }
        },
        toggleLightButton : function(isSupportLight){
            if(isSupportLight){
                    $mainButton.addEventListener("click",function(){
                        if($lightOn.style.display === "none"){
                                $lightOn.style.display = "block";
                                $lightOff.style.display = "none";
                                self.turnLightOn();
                        }else{
                                $lightOff.style.display = "block";
                                $lightOn.style.display = "none";
                                self.turnLightOff();
                        }
                   },false);
                }
        },
        toggleSosButton : function(isSupportLight){
            if(isSupportLight){
                $sos.addEventListener("click",function(){
                    if($sos.className === "sos-off"){
                        console.log("bat screen on ");
                        keepscreenon.enable();
                        $sos.className = "sos-on"; 
                        $lightOn.style.display = "block";
                        $lightOff.style.display = "none";
                        console.log("turn sos " );                 
                       window.isSosOn = true;
                        window.i = 0 ;
                        self.turnSos();
                    }else{
                        console.log("turn SOS off : tat screenon");
                        keepscreenon.disable();
                        $sos.className = "sos-off";
                        $lightOff.style.display = "block";
                        $lightOn.style.display = "none";
                        console.log("stop sos ! " );
                       window.isSosOn = false;
                        self.stopSos();
                        self.turnLightOff();
                    }
                });
            }//end check light 
        },
        fitFontSize : function(ob){
            var fontSize = (parseInt(ob.clientHeight) - 3) + "px";
            var lineHeight = ob.clientHeight + "px";
            ob.style.fontSize = fontSize;
            ob.style.lineHeight = lineHeight;
            console.log("fit fontsize  is set! ");
        },
        backButtonExit : function(){
            document.addEventListener("backbutton", function() {
              // pass exitApp as callbacks to the switchOff method
              window.plugins.flashlight.switchOff(exitApp, exitApp);
            }, false);
            function exitApp() {
              console.log("%c back button pressed , quit app " , "color:red;background-color:black");
              if(window.x && typeof x === "object" ){
                  console.log("x exist");
                while(window.x--){
                    window.clearTimeout(window.x);
                }
              }
              window.plugins.flashlight.switchOff();
              navigator.app.exitApp();
            }
        }
    };//end light ob 

window.addEventListener("load",LightOb.init,false);
