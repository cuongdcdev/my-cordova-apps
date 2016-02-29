document.addEventListener("deviceready", Ondeviceready, false);
function Ondeviceready() {
        document.addEventListener("backbutton", function () {
            // pass exitApp as callbacks to the switchOff method
            window.plugins.flashlight.switchOff(exitApp, exitApp);
        }, false);

        function exitApp() {
                navigator.app.exitApp();
            } //end exit app via backbutton android !!
    
            function checkflashlight() {
                    window.plugins.flashlight.available(function (isAvailable) {
                        if (isAvailable) {
                            console.log("co den ");
                            return true;
                        } else {
                            console.log("ko co den");
                            return false;
                        }
                    });
                } //end check flashlight

            function morseSOScode() {
                    var sos = [0, 0, 0, 1, 1, 1, 0, 0, 0];
                    for (i = 0; i < sos.length; i++) {
                        if (sos[i] === 0) {
                            setTimeout(turnLightOn(), 1000)
                        }
                        if (sos[i] == 1) {
                            setTimeout(turnLightOn(), 500)
                        }
                    }
                } //end morseSOS Code
    
                if (checkflashlight()) {
                    window.plugins.flashlight.switchOn(); //bat den luon ;
                    
                    $sos.on("touchstart", function () {
                            if (this.is(".toYellow")) {
                                window.plugins.flashlight.switchOff();
                            } else { //bat che do SOS 
                                morseSOScode();
                            }
                        }) //end sos
                } else {
                    img.attr("src", "img/cricle-off.svg");
                    text.html("Im Sorry!  I cannot find your light ")
                }
            }) //end document ready