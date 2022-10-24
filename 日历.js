$(function(){
    // 定义必要数据
    var cTimes = [28, 29, 30, 31]
    var date = new Date();
    var Month = date.getMonth()+1;
    var riqi = date.getDate();
    var year = date.getFullYear();
    var monthArr1 = [1,3,5,7,8,10,12];
    var monthArr2 = [4,6,9,11];
    var oneWeek =['日','一','二','三','四','五','六'];
    var monthNum = [1,2,3,4,5,6,7,8,9,10,11,12];

    addDate(year,Month)
    // 将日期添加到网页
    function addDate(year,month){
        var newDate = year+'-'+month
        var dateDay = getDateDay(newDate);
        var twoDayList = getTwoDayNumber(month);
        var dayList = setBlank(dateDay, dayNumber(month),twoDayList);

        for(var i = 0; dayList.length > i; i++){
            //给不属于本月的日期加一个效果
            if (dateDay <= i && i < (dayNumber(month).length + dateDay)){
                if(dayList[i] == riqi && year == date.getFullYear() && month == date.getMonth()+1){
                    var span = singleBox(dayList,i);
                    span.className = 'checked';
                    console.log(2);
                }else{
                    var span = singleBox(dayList,i);
                    span.className = 'black';
                }
            }else{
                var span = singleBox(dayList,i);
                span.className = 'gray';
            }
        }
    }

    // 填入数字的单体
    function singleBox(dayList,n){
        var span = document.createElement('span');
        var datelabal = document.querySelector('#date');
        datelabal.appendChild(span);
        span.innerHTML = dayList[n];
        return span
    }

    // 设置星期行
    var str1 = template('tem-week',{week:oneWeek});
    $('#week').html(str1);

    // 动态时钟
    getTime(year,Month,riqi)
    function getTime(){
        var date = new Date();
        var hour = date.getHours()
        var minutes = date.getMinutes()
        var seconds = date.getSeconds()
        var hms = [hour,minutes,seconds];
        var hmschange = [];

        for (var i = 0; hms.length > i; i++){
            hmschange[i] = hms[i] >= 10? hms[i] : "0" + hms[i];
        }
        $('#time').html(hmschange[0]+":"+hmschange[1]+":"+hmschange[2]);
        $('#riqi').html(year+"年"+Month+"月"+riqi+"日")
    }
    setInterval(getTime,1000)

    // 得到该月的天数
    function dayNumber(Month){
        var dayList = [];
        if(monthArr1.includes(Month)){
            for(var i = 1; cTimes[3] >= i; i++){
               dayList.push(i);
            }
        }else if(monthArr2.includes(Month)){
            for(var i = 1; cTimes[2] >= i; i++){
                dayList.push(i);
            }
        }else{
            var year = date.getFullYear();
            if(year%4 === 0 && year%100 !== 0 || year%400 === 0 ){
                    for(var i = 1; cTimes[1] >= i; i++){
                        dayList.push(i);
                } 
            }else{
                for(var i = 1; cTimes[0] >= i; i++){
                    dayList.push(i);
                } 
            }
        }
        return dayList
    }

    // 第一天是星期几
    function getDateDay(day){
        var date = new Date(day);
        var daydate = date.getDay();
        return daydate
    }

    //获取上个月和下个月的天数
    function getTwoDayNumber(Month){
        var oldOne = dayNumber(Month+1);
        var newOne = dayNumber(Month-1);

        return arr = [oldOne, newOne]
    }
   
    // 设置空格
    function setBlank(daydate,dayList,twoDayList){
        for(var i = 0; daydate > i; i++){
            dayList.unshift(twoDayList[0].pop());
        };
        for(var i = 0; 14 > i; i++){
            dayList.push(twoDayList[1].shift());
        }

        return dayList
    }

    // 设置当前日期
    var information = document.querySelector('#information');
    information.innerHTML ='<div id="twoSub"><<</div><div id="sub"><</div><div id="text" class="text">'+year+'-'+ Month +'</div><div id="add">></div><div id="twoAdd">>></div>';

    //赋予按键功能
    function addFunction(Month,year){
            // 调节月份
    var a = parseInt(Month);
    var b = parseInt(year);
    // 增加月份数字
    $('#add').on('click',function(){
        if(a < 12){
            a += 1
            $('#text').html(b +'-'+ a);
        }else{
            b += 1
            a = 1
            $('#text').html(b+'-'+ a);
        }
        $('#date').html('')
        addDate(b,a)
    })

    // 减少月份数字
    $('#sub').on('click',function(){
        if(a > 1){
            a -= 1
            $('#text').html(b +'-'+ a);
        }else{
            b -= 1
            a = 12
            $('#text').html(b+'-'+ a);
        }
        $('#date').html('')
        addDate(b,a)
    })

    //调节年份
    //增加年份
    $('#twoAdd').on('click',function(){
        b += 1;
        $('#text').html(b +'-'+ a);
        $('#date').html('');
        addDate(b,a);
    })

    //减少年份
    $('#twoSub').on('click',function(){
        b -= 1;
        $('#text').html(b +'-'+ a);
        $('#date').html('');
        addDate(b,a);
    })
    }
    addFunction(Month,year)

    // 鼠标进入后展开
    $('.head').on('mouseover',function(){
        $('.bigbox').stop().slideDown(500);
        $('.line').stop().fadeIn(500)
        $('.head').on('mouseleave',function(){
            $('.bigbox').stop().slideUp(500);
            $('.line').stop().fadeOut(500);
        })
    })

    //选择想要的月份
    //1.点击“2022-10”隐藏week和dete,如果再点一次，取消选择
    $('#text').on('click',function(){
        $('#week').hide();
        $('#date').hide();
        $('.monthChose').show();
        //禁用按钮
        $('#information').children('#text').siblings().off('click');
        $('#text').on('click',function(){
            $('#week').toggle();
            $('#date').toggle();
            $('.monthChose').toggle();
            addFunction(Month,year)
        })
    })
    //2.动态创建元素将元素填入
    for(var i = 0; monthNum.length > i; i++){
        var monthChose = document.querySelector('.monthChose');
        var div = document.createElement('div');
        monthChose.appendChild(div);
        div.innerHTML = monthNum[i];
    }
    //3.点击指定月份后隐藏月份并切换到指定月份
    $('.monthChose').on('click',$('.monthChose').children(),function(e){
        $('#week').show();
        $('#date').show();
        $('.monthChose').hide();
        var value = e.target.innerHTML;
        var nowYear = $('#riqi').html().substring(0,4);
        $('#text').html(nowYear + '-' +value);
        $('#date').html('');
        addDate(parseInt(nowYear),parseInt(value));
        addFunction(value,nowYear)
    })
})