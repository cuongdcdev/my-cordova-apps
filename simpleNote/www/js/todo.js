$(document).on('pagecreate', "#page_content", function () {
    
//document.addEventListener('deviceready',onPageLoad,false);
//function onPageLoad(){  
    if (!localStorage.Todo) {
        localStorage.Todo = JSON.stringify({
            'title': [],
            'content': [],
            'time': [],
            'date': [],
            'isDone': [],
            'level': []
        });
    } //end nap chuoi JSON

    var list = JSON.parse(localStorage.Todo);
    var todo = {};
    var num = 0;
    var _content = $("#content");
    var _title = $("#title");
    //    var tmpId = (lastListId + 1) ; //bien nay la id tam ,sau khi user bam add o todo.refresh , tmpId nay  su dung cho context popup box
    var lastListId = -1; // day la id dung de add vao cho todo.refresh()
    var tmpid ;
    
    todo.add = function () {
        //LÀM NHIỆM VỤ LƯU CÁC GIÁ TRỊ NÀY VÀO localStorage
        var $title = $("#title").val();
        var $content = $("#content").val();
        var $date = formatDate()[0];
        var $time = formatDate()[1];
        var $level = $("#level input[type='radio'][name='radio-choice-a']:checked") ? $("#level input[type='radio'][name='radio-choice-a']:checked").val() : "3";
        list.title[list.title.length] = $title;
        list.content[list.content.length] = $content;
        list.time[list.time.length] = $time;
        list.date[list.date.length] = $date;
        list.isDone[list.isDone.length] = null;
        list.level[list.level.length] = $level;
    };



    todo.refresh = function () {

        //đưa các giá trị này vào Dom + cập nhật lại localStorage
        var $title = $("#title").val();
        var $content = $("#content").val();
        var $date = formatDate()[0];
        var $time = formatDate()[1];
        var $isDone = null;
        var $level = $("#level input[type='radio'][name='radio-choice-a']:checked") ? $("#level input[type='radio'][name='radio-choice-a']:checked").val() : "3";
        localStorage.Todo = JSON.stringify(list); // tao lai list moi hoan toan sau do luu vao localStorage 
        var _content =
            "<span class='list_item'><li class=' ui-li ui-li-divider ui-mini ui-bar-b ui-li-has-count' style='font-size:69%;font-weight:100' data-role='list-divider' >" +
            $date +
            "<span class='ui-li-count ui-btn-up-c ui-btn-corner-all'>" +
            $time +
            "</span></li>" +
            "<li class='list_wrapper ui-li ui-li-static ui-btn-up-b ui-last-child'>" +
            "<p style='padding-left:1%;font-size:110%;font-weight:200' class='title_list ui-li-heading ui-li-desc' level= " + $level + "  isDone=" + $isDone + " list_id=" + (lastListId) + ">" + $title + "</p>" +
            "<p class='ui-li-desc'>" + $content + "</p> " +
            "</li></span>";
    $("#ul_list_wrapper").append(_content);
        todo.renderColor();
        todo.isDone();
       todo.onClickDialogBox();
    };

    todo.clearAll = function () {
        localStorage.clear();
    };

    todo.delList = function (stt) {
        
        list.title.splice(stt, 1);
        list.content.splice(stt, 1);
        list.date.splice(stt, 1);
        list.level.splice(stt, 1);
        list.time.splice(stt, 1);
        list.isDone.splice(stt, 1);
        

    };
    
    //dialog box khi bấm vào 1 list bất kì 
    todo.onClickDialogBox = function(){
        //tao context box khi click vao listwrapper (moi tag li)
    $(".list_wrapper").on('click', function () {
                $("p.title_list").removeClass('active');
        $(this).find('p:eq(0)').addClass('active');
        $("#todoPopup").popup('open');
       _this = $(this);
        tmpid = $(this).find('.title_list').attr('list_id');
        
                //context box -> action ->del:
                $("#del").on('click',function () {
                    todo.delList(tmpid);
                   localStorage.Todo = JSON.stringify(list); // tao lai list moi hoan toan sau do luu vao localStorage 
                    //xoa list khoi dom :
                    _this.parent().fadeOut(400,function(){
                       _this.parent().remove();
                        
                    });
                    
                    $("#todoPopup").popup('close');
                 $("#donePopup,#doingPopup,#notDonePopup").hide(); //xoa cac popup khac : 
                    $("#deletePopup").fadeIn().fadeOut(3000);
                });
        
                //context box => action -> done:
                $("#done").on('click','',function(){
                    list.isDone.splice(tmpid,1,"true");
                    $(".list_wrapper p.active").removeClass('doing not-done').addClass('done');
                    localStorage.Todo = JSON.stringify(list); // tao lai list moi hoan toan sau do luu vao localStorage 
                    $("#todoPopup").popup('close');
                });
                
                //context box => action ->not done
                $("#notDone").on('click',function(){
                    list.isDone.splice(tmpid,1,'false');
                    $(".list_wrapper p.active").removeClass('doing done').addClass('not-done');
                    localStorage.Todo = JSON.stringify(list); // tao lai list moi hoan toan sau do luu vao localStorage 
                    $("#todoPopup").popup('close');
                });
                
                //context box => action -> doing
                
                $("#doing").on('click',function(){
                    list.isDone.splice(tmpid,1,'null');
                    $(".list_wrapper p.active").removeClass('not-done done').addClass('doing');
                    localStorage.Todo = JSON.stringify(list); // tao lai list moi hoan toan sau do luu vao localStorage 
                    $("#todoPopup").popup('close');
                });
    });
    };
    
    
    //TẠO MÀU CHO LEVEL :
    todo.renderColor = function () {
        var paras = document.getElementsByClassName("title_list");
        for (i = 0; i < paras.length; i++) {
            var title_level = paras[i].getAttribute("level");
            switch (title_level) {
            case "1":
                paras[i].className = paras[i].className + ' level1';
                break;

            case "2":
                paras[i].className = paras[i].className + ' level2';
                break;

            }
        }
    };
    
    //tạo màu đánh dấu xem đã hoàn thành hay chưa :
    todo.isDone = function () {
        var paras = document.getElementsByClassName("title_list");
        for (i = 0; i < paras.length; i++) {
            var isDone = paras[i].getAttribute("isDone");
            if (isDone == 'true') {
                paras[i].className = paras[i].className + ' done';
//                paras[i].className = paras[i].className + ' done';
            } 
            if ( isDone == 'null'){
                paras[i].className = paras[i].className + ' doing';
//                paras[i].className = paras[i].removeClass('done not-done').className + ' doing';
            }
            if(isDone == 'false'){
                paras[i].className = paras[i].className + ' not-done';
//                paras[i].className = paras[i].removeClass('doing done').className + ' not-done';
            }
        }
    };

    todo.fetch_data = function () {
        count = 0;
        for (i = 0; i < list.title.length; i++) {
            //    if(list.date[i+1] == list.date[i]){
            //neu date cua cai truoc = date cua cai sau thi cung 1 ngay -> gom cung 1 thu muc 
            count++;
            var $content =
                "<span class='list_item'><li style='font-size:69%;font-weight:100;'  data-role='list-divider' class='ui-li ui-li-divider ui-mini ui-bar-b'  >" +
                list.date[i] +
                "<span class='ui-li-count ui-btn-up-c ui-btn-corner-all'>" +
                list.time[i] +
                "</span></li>" +
                "<li class='list_wrapper ui-li ui-li-static ui-btn-up-b ui-last-child'>" +
                "<p class='title_list ' style='padding-left:1%;font-size:110%;font-weight:200' class='ui-li-heading;' level=" + list.level[i] + " isDone =" + list.isDone[i] + " list_id = " + i + ">" + list.title[i] + "</p>" +
                "<p>" + list.content[i] + "</p> " +
                "</li></span>";
            
            $("#ul_list_wrapper").append($content);
        }
        if(list.title.length === 0 ){ lastListId === 0 ;}else{ lastListId = (list.title.length - 1);}
    }; //end todo.fetch_data


    function formatDate() {
            var date = new Date();
            var days = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
            var months = ["tháng Giêng", "tháng Hai", "tháng Ba", "tháng Tư", "tháng Năm", "tháng Sáu", "tháng Bảy", "tháng Tám", "tháng Chín", "tháng Mười", "tháng Mười Một", "tháng Mười Hai", ];
            var $time = date.toLocaleTimeString();
            var $day_name = days[date.getDay()]; //date.getDay() tra ve gia tri cua ngay trong tuan dang so 0- 6 
            var $day = date.getDate();
            var $month = months[date.getMonth()]; // -> 0-11
            var $year = date.getFullYear();
            var $total_date = [[$day_name + ',' + 'ngày ' + $day + ' ' + $month + ',' + $year], [$time]];
            return $total_date;
        } //end format date 




    //cap nhat lai list view 
    todo.fetch_data();
    $("#ul_list_wrapper").listview().listview('refresh');
    //end cap nhat lai list view 

    todo.renderColor(); //do mau cho level 
    todo.isDone(); //cap nhat tinh trang cong viec da lam xong hay chua ? 
    $("#ul_list_wrapper").listview().listview('refresh');

    //    $(".list_item").on("click", "li", function () {
    //    $(this).fadeOut("slow", function () {
    //        var stt = $(this).attr("stt");
    //        $(this).remove();
    //        todo.delList(stt);
    //        todo.refresh();
    //    });
    //});


    //xoa tat ca list 
    $("#clear_all").click(function () {
    var  result = confirm('Hành động này không thể khôi phục lại và sẽ xóa HOÀN TOÀN mọi ghi chú của bạn \n Bạn chắc chứ? ');
    if(result){
        todo.clearAll();
        location.reload();
    }
    });

    //add 1 list
    $("#submit").click(function () {
        lastListId++;
        todo.add();
        todo.refresh();
        $("#title").val("");
        $("#content").val("");
        $("#todoDialogAdd").fadeOut(400);
    });



    todo.onClickDialogBox();
    
    
    $("#addList").on('click',function(){
    $("#todoDialogAdd").fadeIn(400);
    var _this = $("#todoDialogAdd");
    $("#todoDialogAdd span.close-btn").on('click',function(){
        _this.fadeOut(400,function(){_this.hide();});
    });
    });
    
//    }//end onPageLoad

}); //end check document.ready
    