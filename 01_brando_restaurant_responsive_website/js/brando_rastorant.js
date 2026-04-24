;(function(window,document,$,undefined){

    var brando = {
        init:       function(){
            var that = this;

                that.headerFn();
                that.section01Fn();
                that.section234Fn();
                that.section05Fn();
                that.section06Fn();
                that.section07Fn();
                that.section08Fn();
                that.section09Fn();
                that.section09GalleryFn();
                that.section10Fn();
                that.section11Fn();
                that.section12Fn();
                that.section13Fn();
                that.section14Fn();
                //that.scrollEventFn(); //스크롤 이벤트(패럴럭스) 코딩 나열형
                that.scrollEventArrayFn(); //스크롤 이벤트(패럴럭스) 배열 반복 처리 - 코딩 간략식

        },
        headerFn:   function(){
            var smoothBtn = $('.smooth-btn'); //웹 전체 공통 클래스
            var htmlBody = $('html,body');
            var mobileMenu = $('#header .mobile-menu');
            var mobileBtn = $('#header .mobile-btn');
            var window_ = $(window);
            var header = $('#header');
            var goTop = $('.goTop'); //웹 전체 공통 클래스
            
            var winW = $(window).width();
            var url = null;  
            var t=0;  

                //Smooth Scrolling Event : <a href= #해시태그 가져와서 부드럽게 해당 섹션으로 이동
                smoothBtn.on({
                    click:  function(event){
                        var that = $(this);

                        event.preventDefault();
                        url = that.attr('href');
                        htmlBody.stop().animate({scrollTop: $( url ).offset().top  }, 600);
                        // mobileMenu.hide();
                        t=0; //초기화
                        mobileMenu.stop().animate({right:-100+'%'},0); //초기화

                        mobileBtn.removeClass('addClose');                        
                    }
                });

                

                window_.scroll(function(){
                    if( window_.scrollTop() >= 30 ) {
                        header.addClass('addMobile');
                        goTop.addClass('addGotop');
                    }
                    else{
                        header.removeClass('addMobile');
                        goTop.removeClass('addGotop');
                    }
                });


                window_.resize(function(){
                    winW = window_.width();                    
                    if( winW>990 ){
                        t=0;
                        mobileBtn.removeClass('addClose');
                        // mobileMenu.stop().slideUp(0);
                        mobileMenu.stop().animate({right:-100+'%'},400);
                    }
                    // else{
                    //     t=1; 
                    // }
                });

                mobileBtn.on({
                    click:  function(event){
                        var that = $(this);

                        event.preventDefault();
                        that.toggleClass('addClose');
                        if(t==0){
                            t=1;
                            mobileMenu.stop().animate({right:0},400);
                        }
                        else{
                            t=0;
                            mobileMenu.stop().animate({right:-100+'%'},400);
                        }
                    }
                });



                ////////////////////////////////////////////////////////
                // 마우스 휠 이벤트

                var _wheelDelta = null;
                var n = $('.wheel-event').length; //15개

                    

                $('.wheel-event').each(function(idx){

                    $(this).on('mousewheel DOMMouseScroll',function(e){
                        e.preventDefault();

                            if(e.detail){
                                _wheelDelta = e.detail*(-1*40);
                            }
                            else{
                                _wheelDelta = e.originalEvent.wheelDelta;
                            }
                            
                            // console.log( $(this).next().offset().top );
                                //헤더영역이 마우스 방향에 따라서 변함
                                if( _wheelDelta < 0 ){ //마우스 휠 아래로 돌리면 메뉴는 부드럽게 사라지고
                                    $('#header').addClass('addMousewheel');
                                    if( idx < n-1 ){
                                        $('html,body').stop().animate({scrollTop: $(this).next().offset().top },600);
                                    }
                                }
                                else{ ////마우스 휠 위로 돌리면 메뉴는 부드럽게 나타난다.
                                    $('#header').removeClass('addMousewheel');
                                    if( idx > 0 ){
                                        $('html,body').stop().animate({scrollTop: $(this).prev().offset().top },600);
                                    }

                                }

                    });

                });

        },
        section01Fn: function(){
            var htmlBody = $('html,body');
            var section02 = $('#section02');
            var hungry = $('#section01 .hungry');
            var section01 = $('#section01');
            var slide = $('#section01 .slide');
            var arrowDownBtn = $('#section01 .arrow-down-btn');
            var n = $('#section01 .slide').length-1;  //3=4-1
            var imgH = $('#section01 .hungry img').height();

            var cnt = 0;
            var win = $(window); //window 예약 식별자 이므로 win
            var winH = 969;
            var imgTop = (winH-imgH)/2;



                setTimeout(resizeFn,100);
                function resizeFn(){
                    winH = win.height();
                        section01.css({ height:winH });
                        section01.css({ height:winH });
                        imgH = hungry.height();
                        imgTop = (winH-imgH)/2;
                        hungry.css({ top:imgTop });
                }

                win.resize(function(){
                    resizeFn();
                });

                //Smooth Scrolling Event
                arrowDownBtn.on({
                    click:  function(){
                        htmlBody.stop().animate({ scrollTop: section02.offset().top }, 1000);
                    }
                });


                /////////////////////////////////////////////////////////
                // 페이드 인아웃 효과 슬라이드
                /////////////////////////////////////////////////////////
                //메인 다음 슬라이드
                //포인트 : 현재 슬라이드 위에 다음 슬라이드가 서서히 나타난다.
                function mainNextSlideFn(){
                    slide.css({zIndex:1});
                    //현재슬라이드 에]첫번째
                    slide.eq(cnt==0?n:cnt-1).css({zIndex:2});
                    //다음슬라이드 예]두번째
                    slide.eq(cnt).css({zIndex:3}).animate({opacity:0},0).animate({opacity:1},1000); 
                                                    //페이드 인 효과   
                }

                
                //메인 이전 슬라이드
                //포인트 : 현재 슬라이드를 사라지게하면 이전 슬라이드 보인다.
                function mainPrevSlideFn(){
                    slide.css({zIndex:1}).animate({opacity:1},0); //초기화
                    //이전 슬라이드
                    slide.eq(cnt).css({zIndex:2});
                    //현재 슬라이드를 사라지게하면 이전 슬라이드가 보인다.
                    slide.eq(cnt==n?0:cnt+1).css({zIndex:3}).animate({opacity:1},0).animate({opacity:0},1000);
                }

                //다음 카운트 함수
                function nextCountFn(){
                    cnt++; //0 1 2
                    if(cnt>n){cnt=0;}
                    mainNextSlideFn();
                }
                //이전 카운트 함수
                function prevCountFn(){
                    cnt--; //2 1 0 2 1 0
                    if(cnt<0){cnt=n;}
                    mainPrevSlideFn();
                }


                section01.swipe({
                    swipeLeft:  function(){
                        if( !slide.is(':animated') ){
                            nextCountFn(); //다음카운트
                        }
                    },
                    swipeRight: function(){
                        if( !slide.is(':animated') ){
                            prevCountFn(); //이전카운트
                        }
                    }
                });


                setInterval(nextCountFn,3000);



        },
        section234Fn: function(){
            var section234 = $('.section234');
            var sec0204content0204Wrap = $('#section02 .content-wrap, #section04 .content-wrap');
            var sec03ContentWrap =$('#section03 .content-wrap');          
            var textWrapH3 = $('.section234 .text-wrap h3');
            var textWrapH4 = $('.section234 .text-wrap h4');
            var textWrapP = $('.section234 .text-wrap p');
            var textWrap = $('.section234 .text-wrap');
            var contentWrap = $('.section234 .content-wrap');
            var boxW = $('.section234 .content-wrap').width();  //450
            var textW = $('.section234 .text-wrap').width();

            var win = $(window);
            var winH = $(window).height();  //969
            var sectionH = winH;
            var boxH = boxW * 1.222222222; //550
            var boxTop = (winH-boxH)/2;  // 209.5.=(969-550)/2
            var winW = $(window).width();  //969
            var x = (winW-boxW)/2;

            var rateH3 = 0.096551724;
            var rateH4 = 0.037931034;
            var rateP  = 0.048275862;

            var fontSizeH3 = rateH3 * textW;
            var fontSizeH4 = rateH4 * textW;
            var fontSizeP = rateP * textW;


                setTimeout(resizeFn,100);

                function resizeFn(){
                    //창높이기준으로 섹션높이 변경
                    winH = win.height();  //969
                    sectionH = winH;  //창너비가 세션높이
                    //박스너비에 따라서 비율로 높이 변경
                    boxW = contentWrap.width();  //450
                    boxH = boxW * 1.222222222; //550   
                    //창너비의 따라서 X(LEFT RIGHT) 위치 가운데 정렬 계산 
                    winW = win.width();  //969
                    x = (winW-boxW)/2;                                     
                    // boxTop = (winH-boxH)/2;  // 209.5.=(969-550)/2
                    //박스높이보다 창높이가 작을 때 섹션높이는 박스 높이로 설정 됨.
                    //그러니 박스의 탑값은 창높이랑 박스높이랑 같기 때문에 30으로 설정한다.
                    if( winH < (boxH + 60) ){
                        sectionH = boxH + 60;
                        boxTop = 30;
                    }
                    else{
                        sectionH = winH;
                        boxTop = (winH-boxH)/2;
                    }            


                    //폰트 사이즈 반응형                    
                    textW = textWrap.width();
                    fontSizeH3 = rateH3 * textW;
                    fontSizeH4 = rateH4 * textW;
                    fontSizeP = rateP * textW;

                    textWrapH3.css({ fontSize:fontSizeH3 });
                    textWrapH4.css({ fontSize:fontSizeH4 });
                    textWrapP.css({ fontSize:fontSizeP });

                    //박스 탑, 박스 높이
                    contentWrap.css({ top:boxTop, height:boxH });
                    
                    //섹션의 높이
                    section234.css({ height:sectionH });                
                    
                    if( winW <= 1170 ){
                        sec0204content0204Wrap.stop().animate({ right:x-15 },300);
                        sec03ContentWrap.stop().animate({ left:x-15 },300);   
                    }
                    else{
                        sec0204content0204Wrap.stop().animate({ right:0 },200);
                        sec03ContentWrap.stop().animate({ left:0 },200);    
                    }

                }
               
                win.resize(function(){
                    resizeFn();
                });

        },    
        section05Fn: function(){

        },
        section06Fn: function(){

        },
        section07Fn: function(){

        },
        section08Fn: function(){

        },
        section09Fn: function(){
            var win =$(window);
            var htmlRoot = $('html');
            var winH = $(window).innerHeight();
            var imgWrap = $('.modal .img-wrap');    
            var galleryImgBtn = $('#section09 .gallery-img-btn'); //섹션9
            var arrowLeftBtn = $('.modal .arrow-left-btn')
            var modal = $('.modal');
            var imgWrapImg = $('.modal  .img-wrap  img');
            var arrowRightBtnImgBtn = $('.modal  .arrow-right-btn, .modal  .img-btn');
            var closeBtnImgWrap = $('.modal .close-btn, .modal .img-wrap');

            var fileName = null;
            var endNum  = null;
            var fileNum  = null;

                setTimeout(resizeFn,100);

                function resizeFn(){
                    winH = win.innerHeight();
                     
                    //lineHeight, backgroundPosition등은 반드시 'px' 단위를 넣어준다.
                    imgWrap.css({ lineHeight:winH + 'px' });
                }    


                win.resize(function(){
                    resizeFn();
                });

                //모달 창 띄우기
                galleryImgBtn.on({
                    click:  function(event){
                        var that = $(this);
                        event.preventDefault();

                        //스크롤바 제어
                        htmlRoot.addClass('addScroll');
                        
                        //파일번호
                        fileName = that.find('img').attr('src');
                        endNum  = fileName.indexOf('.jpg'); //search()
                        fileNum = Number(fileName.slice(endNum-2,endNum));

                        //모달창 메인 슬라이드
                        modalSlidefn();
                    }
                });

                function modalSlidefn(){
                    modal.stop().fadeIn(300);
                    imgWrapImg.stop().fadeOut(0).attr('src','./img/restaurant-img' + fileNum + '.jpg').fadeIn(1000);
                }


                //모달 창 닫기
                closeBtnImgWrap.on({
                    click:  function(){
                        modal.stop().fadeOut(300); 
                        //스크롤바 제어
                        htmlRoot.removeClass('addScroll'); 
                    }
                });

                
                arrowRightBtnImgBtn.on({
                    click:  function(event){
                        event.stopPropagation();

                        fileNum++;
                        if(fileNum>32){
                            fileNum=25;
                        }
                        modalSlidefn();
                    }
                });

                arrowLeftBtn.on({
                    click:  function(){
                        fileNum--;
                        if(fileNum<25){
                            fileNum=32;
                        }
                        modalSlidefn();
                    }
                });




        },
        section09GalleryFn: function(){
            var win = $(window);
            var winW = $(window).innerWidth();
            var n = $('#section09 .gallery li').length; //8
            var galleryList = $('#section09 .gallery li');
            var gallery = $('#section09 .gallery');
            var galleryBtn = $('#section09 .gallery-btn');

            var hRate = 600/800; //이미지높이/이미지너비 초기 고정된 값 상수 값(const)
            var cols = 4; //칸수 해상도별 변수 사용 예정
            var rows = Math.ceil(n/cols); //줄수=올림(갤러리갯수/칸수)            
            var imgW = winW/cols; //창너비/칸수
            var imgH = imgW*hRate; //이미지너비*이미지높이비율값
            var hide = []; //초기 값 감추기(hidden) 없음 
            var show = [0,1,2,3,4,5,6,7]; //초기 값은 8개 보이기(show)

                setTimeout(galleryFn,100);
                
                function galleryFn(){
                    
                    winW = win.innerWidth();
                    
                    if( winW > 1200 ){
                        cols = 4; //칸수 해상도별 변수 사용 예정
                    }
                    else if( winW <= 1200 &&  winW > 980 ){ //981~1200
                        cols = 3; //칸수 해상도별 변수 사용 예정
                    }
                    else if( winW <= 980 &&  winW > 760){ // 761~980
                        cols = 2; //칸수 해상도별 변수 사용 예정
                    }
                    else if( winW <= 760 && winW >=0 ){ //0~760
                        cols= 1; //칸수 해상도별 변수 사용 예정
                    }
                   
                    // n = $('.gallery li').length; //목록의 갯수
                    n = show.length; //클릭한 버튼 내용 보이기 이미지 갯수
                    rows = Math.ceil(n/cols); //줄수=올림(갤러리갯수/칸수)

                    imgW = winW/cols; //창너비/칸수
                    imgH = imgW*hRate; //이미지너비*이미지높이비율값
                    
                        gallery.removeClass('addZoom');
                        galleryList.removeClass('addZoom2');

                        gallery.css({ height:imgH*rows }) //이미지높이*줄수

                        //갤러리 숨김 hide();                        
                        for(var i=0; i<hide.length; i++){
                            galleryList.eq(hide[i]).hide();
                        }
                      

                        //갤러리 보이기 show();
                        var cnt=-1;
                        for(i=0;i<rows;i++){
                            for(j=0;j<cols;j++){
                                cnt++; //0 1 2 3 4 5 ..
                                if(cnt>=show.length) //보이는 갯수에 따라서 변경
                                break;     
                                galleryList.eq(show[cnt]).show().stop().animate({ top:(imgH*i), left:(imgW*j), width:imgW, height:imgH },300, function(){
                                    galleryList.addClass('addZoom2');
                                });
                            }
                        }  

                        gallery.addClass('addZoom');  

                } //갤러리 메인 함수 끝


                $(window).resize(function(){
                    galleryFn();
                });

                //갤러리 버튼 이벤트 0 ~ 4(5개)
                galleryBtn.each(function(index){
                    var that = $(this);
                    that.on({
                        click:  function(event){
                            event.preventDefault();

                            galleryBtn.removeClass('addNav');
                            that.addClass('addNav');

                            switch(index){
                                case 0:
                                    hide = [];
                                    show = [0,1,2,3,4,5,6,7];
                                    break;
                                case 1:
                                    hide = [0,2];
                                    show = [1,3,4,5,6,7]
                                    break;
                                case 2:
                                    hide = [1,3,4,5];
                                    show = [0,2,6,7];
                                    break;
                                case 3:
                                    hide = [0,2,5];
                                    show = [1,3,4,6,7];
                                    break;
                                default:
                                    hide = [0,1,3,6];
                                    show = [2,4,5,7];
                            }

                            galleryFn(); //갤러리 메인함수 호출 실행

                        }
                    });

                });


        },
        section10Fn: function(){
            var win = $(window);
            var winW = win.innerWidth();
            var slideW = 975;
            var cnt=0;
            var nextBtn = $('#section10 .next-btn');
            var prevBtn = $('#section10 .prev-btn');
            var slideWrap = $('#section10 .slide-wrap');
            var slide = $('#section10 .slide');
            //슬라이드 좌우이동 구현
            //첫번째에서는 좌측으로 더이상 이동 안함 0
            //세번째에서는 우측으로 더이상 이동 안함 2
            
            setTimeout(resizeFn,100);

            function resizeFn(){
                winW = win.innerWidth();
                if( winW > 975 ){
                    slideW = 975;
                }
                else{
                    slideW = winW;
                }

                slide.css({width:slideW});  //.slide
                slideWrap.css({width:slideW*3}); //.slide-wrap                
                
                //slideWrap.stop().animate({left:(-slideW*cnt)},300);//창너비가 바뀌면서 적용
                mainSlideFn();
            }

            win.resize(function(){
                resizeFn();
            });

            //1 메인함수
            function mainSlideFn(){
                slideWrap.stop().animate({left:(-slideW*cnt)},1000,'easeOutExpo');
            }

            //2-1 다음
            function nextCountFn(){
                cnt++;
                    if(cnt>2)
                    cnt=2;
                    mainSlideFn();
            }
            //2-2 이전
            function prevCountFn(){
                cnt--;
                    if(cnt<0)
                    cnt=0;
                    mainSlideFn();
            }
            
            //3-1 다음 클릭 이벤트
            nextBtn.on({
                click:  function(){
                    nextCountFn();
                }
            });
            //3-2 이전 클릭 이벤트
            prevBtn.on({
                click:  function(){
                    prevCountFn();
                }
            });

            //터치 스와이프
            slideWrap.swipe({
                swipeLeft:function(){
                    nextCountFn();
                },
                swipeRight:function(){
                    prevCountFn();
                }
            });

            var _wheelDelta = null;


            //마우스 휠 이벤트
            $('#section10 .slide-container').on('mousewheel DOMMouseScroll', function(e){
                e.preventDefault();
                
                if( e.detail ){
                    _wheelDelta = e.detail*(-1*40);
                }
                else{
                    _wheelDelta = e.originalEvent.wheelDelta;
                }

                if( _wheelDelta < 0 ){ //다음 슬라이드                   
                        nextCountFn();
                }
                else{
                        prevCountFn();
                }
                
            });



        },
        section11Fn: function(){
            //반응형으로 제작    win = $(window)
            //좌측의 li 박스 높이를 이용 
            //우측의 li 박스 높이를 설정
            var win = $(window);
            var blog = $('#section11 .blog'); //4개 배열처리 메서드 eqch() 활용
            var blogList = $('#section11 .blog li'); //첫번째의 li
            var blogListImgH = blogList.eq(0).innerHeight(); //첫번째의 li의 높이
            var fontRateH3 = 0.039711191; //폰트 비율
            var fontRateP = 0.072202166; //폰트비율
            var blogListImgW = blogList.eq(0).innerWidth(); //첫번째의 li의 너비
            var fontSizeH3 = fontRateH3 * blogListImgW; //폰트 사이즈 반응형 계산
            var fontSizeP = fontRateP * blogListImgW; //폰트 사이즈 반응형 계산

            setTimeout(resizeFn,100);

            function resizeFn(){
                blogListImgH  = blogList.eq(0).innerHeight();
                blogListImgW = blogList.eq(0).innerWidth();
                fontSizeH3 = fontRateH3 * blogListImgW;
                fontSizeP = fontRateP * blogListImgW;
                                
                fontSizeH3>11 ? fontSizeH3=11:fontSizeH3;
                fontSizeH3<9 ? fontSizeH3=9:fontSizeH3;
               
                fontSizeP>20 ? fontSizeP=20:fontSizeP;
                fontSizeP<15 ? fontSizeP=15:fontSizeP;
                

                blog.each(function(idx){
                    blog.eq(idx).find('li').eq(1).css({height:blogListImgH});
                    blog.eq(idx).find('h3').css({fontSize:fontSizeH3});
                    blog.eq(idx).find('p').css({fontSize:fontSizeP});                    
                });
            }

            win.resize(function(){
                resizeFn();
            });


        },
        section12Fn: function(){
            var win = $(window);
            var h3 = $('#section12 h3');
            var h2 = $('#section12 h2');
            var container = $('.title-wrap');

            var containerW = container.innerWidth();
            var fontSizeH3 = containerW * 0.01754386;
            var fontSizeH2 = containerW * 0.035087719;
            
                setTimeout(resizeFn,100);
                function resizeFn(){
                    containerW = container.innerWidth();
                    fontSizeH3 = containerW * 0.01754386;
                    fontSizeH2 = containerW * 0.035087719;
                    if(fontSizeH3<13){fontSizeH3=13;}
                    if(fontSizeH2<25){fontSizeH2=25;}

                    h3.css({fontSize:fontSizeH3});
                    h2.css({fontSize:fontSizeH2});
                }

                win.resize(function(){
                    resizeFn();
                });


        },
        section13Fn: function(){
            var h2Number = $('#section13 h2'); //780(12.820513) 987(10.131712) 350(28.571429) 166(60.240964)
            var cnt = [0,0,0,0];  //증감 변수는 반드시 초기값 설정 해야함
            var setId = null;
            var num = [780,987,350,166];
            var s = 10;
            var mSecond = [];
            var win = $(window);   
            var sec12Top = $('#section12').offset().top;   
            var t = 0;

            for(var i=0; i<num.length; i++){
                mSecond[i] = (s/num[i])*1000;
            }
           
            //Scroll Event
            win.scroll(function(){
                if( win.scrollTop() > sec12Top){
                    if(t==0){
                        t=1
                        countFn();
                    }
                }
                else{
                    cnt = [0,0,0,0];
                    t=0;
                }
            });


            function countFn(){
                h2Number.each(function(i){
                    setId = setInterval(function(){
                        cnt[i]++;
                        if(cnt[0]>num[0]){ //첫번째 780 초과이면 카운트 종료
                            clearInterval(setId);
                            
                            h2Number.eq(0).text(num[0]); //780
                            h2Number.eq(1).text(num[1]); //987
                            h2Number.eq(2).text(num[2]); //350
                            h2Number.eq(3).text(num[3]); //166
                        }
                        else{
                            h2Number.eq(i).text(cnt[i]); //0.012820513 반복 타이머  cnt++ 730 끝/10초간 카운트 한 상태    
                        }
                    },mSecond[i]); // 1000 = 1초 / 100 = 0.1 / 10 = 0.01 / 1 = 0.001
                });
            }

        },        
        section14Fn: function(){
            var setId=0;

 
            //다시 입력 하기 위해 첫 번째 입력상자(이름) 포커스 발생하면 성공메시지 removeClass
            $('#irum').on({
                // focusin:  function(){
                focus:  function(){
                    $('.success-message').removeClass('addSuccess');//성공 메시지 
                }
            });


            //폼 AJAX 전송 버튼 클릭 이벤트 
            $('#submit').on({
                click:  function(event){  //전송 버튼 클릭 후 유효성 검사 시작
                   event.preventDefault(); //전송 버튼의 고유기능을 삭제
                    //초기화
                    $('.error-message').removeClass('addError');//에러 메시지
                    $('.success-message').removeClass('addSuccess');//성공 메시지      
                    var irumVal = $('#irum').val(); //이름 입력 내용 값
                    var mailVal = $('#mail').val(); //메일 입력 내용 값 영문 숫자 특수문자포함 한글 절대포안됨.
                    var interestedVal = $('#interested').val(); //흥미있는 내용 선택(change) 입력 값
                    var messageVal = $('#message').val(); //메시지 입력 내용 값                   
                    var cnt=0;

                    //유효성 검사 정규 표현식 변수 설정
                    // var regExpIrum = /[a-zA-Z|ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/; //이름 영문한글이 아닌 모든것 검색
                    var regExpName = /^[a-zA-Z|ㄱ-ㅎ|ㅏ-ㅣ|가-힣\s]+$/; //입력 값 1글자 이상
                    var regExpMail = /^[a-zA-Z0-9]([-_.]?[a-zA-Z0-9])*@[a-zA-Z0-9]([.]?[a-zA-Z])*.[a-zA-Z]{2,3}$/i; //이메일 영숫자포함 @ . 끝글자 2~3
                    var regExpMessage = /\w/;  //입력 값 1글자 이상



                   //1~2초동안 로딩 이미지 뜨고 사라지면 에러 메시지 또는 성공 메시지 나타남
                   $('.ajax-loader').addClass('addAjax');
                                      
                   setId = setInterval(function(){
                        cnt++;
                        if(cnt>=1){
                            clearInterval(setId);
                            $('.ajax-loader').removeClass('addAjax'); //로딩 이미지 사라지고
                            formSubmitFn(); //폼 전송 에러메시지, 성공메시지, AJAX 함수 전체
                        }
                   },1000);     

                            //유효성검사 정규 표현식(RegExp) 
                            //AJAX(비동기 전송방식) 
                            function formSubmitFn(){
                                                                
                                if( regExpName.test( $('#irum').val() ) === false || regExpMail.test( $('#mail').val() ) === false ||  regExpMessage.test( $('#message').val() ) === false ){

                                    //한글영문이 아닌거가 있다면
                                    if(   regExpName.test($('#irum').val()) === false ){
                                        $('#irum').addClass('addError');
                                    }
                                    else{
                                        $('#irum').removeClass('addError');
                                    }

                                    //메일 잘못된 값 입력되면
                                    if(  regExpMail.test($('#mail').val()) === false  ){
                                        $('#mail').addClass('addError'); 
                                    }
                                    else{
                                        $('#mail').removeClass('addError');
                                    }

                                    //메시지 잘못된 값 입력되면
                                    if(  regExpMessage.test($('#message').val()) === false  ){
                                        $('#message').addClass('addError'); 
                                    }
                                    else{
                                        $('#message').removeClass('addError');
                                    }

                                  
                                    $('.error-message').addClass('addError'); //하단 에러 메시지 박스
                                    return false; //클릭한 버튼의 전송을 취소하고 다시 입력을 받는 거런 형태의 리턴 값
                                }
                                else{
  
                                    $('#irum').removeClass('addError');
                                    $('#mail').removeClass('addError');
                                    $('#message').removeClass('addError');
                                    $('.error-message').removeClass('addError');                                    

                                    //AJAX는 서버에서만 실행
                                    $.ajax({ 
                                        url:"./response.php",
                                        type:"post",
                                        data:{ //name = 폼입력상자값
                                            irum: irumVal,
                                            mail: mailVal,
                                            interested: interestedVal,
                                            message: messageVal
                                        },
                                        success: function(data){
                                            console.log(data);
                                            
                                            $('.ajax-response').html(data);

                                            $('.success-message').addClass('addSuccess');//성공 메시지

                                            $('#irum').val('');
                                            $('#mail').val('');
                                            // $('#interested').find('option').eq(0).prop('selected',true); //select option 첫번째 목록을 속성(Property: prop)selected
                                            $('#interested option').eq(0).prop('selected',true); //select option 첫번째 목록을 속성(Property: prop)selected
                                            $('#message').val('');

                                        },
                                        error: function(){
                                            console.log( 'AJAX 오류!!!' );
                                        }
                                    }); //AJAX 

                                } //end if
                            }  //formSubmitFn()
                        
                    
                }//click Event
            }); //Buttone 



        },
        scrollEventFn: function(){
            //스크롤 이벤트(패럴럭스)
            var sec02Top = $('#section02').offset().top-600;
            var sec03Top = $('#section03').offset().top-600;
            var sec04Top = $('#section04').offset().top-600;
            var sec05Top = $('#section05').offset().top-600;
            var sec06Top = $('#section06').offset().top-600;
            var sec07Top = $('#section07').offset().top-600;
            var sec08Top = $('#section08').offset().top-600;
            var sec09Top = $('#section09').offset().top-600;
            var sec10Top = $('#section10').offset().top-600;
            var sec11Top = $('#section11').offset().top-600;
            var sec12Top = $('#section12').offset().top-600;
            var sec13Top = $('#section13').offset().top-600;
            var sec14Top = $('#section14').offset().top-600;
            var win = $(window);

                win.scroll(function(){
                    
                    //섹션2 페럴럭스
                    if( win.scrollTop() > sec02Top ){
                        $('#section02').addClass('addEvent');
                    }
                    else{
                        $('#section02').removeClass('addEvent');
                    }

                    //섹션3 페럴럭스
                    if( win.scrollTop() > sec03Top ){
                        $('#section03').addClass('addEvent');
                    }
                    else{
                        $('#section03').removeClass('addEvent');
                    }

                    //섹션4 페럴럭스
                    if( win.scrollTop() > sec04Top ){
                        $('#section04').addClass('addEvent');
                    }
                    else{
                        $('#section04').removeClass('addEvent');
                    }

                    //섹션5 페럴럭스
                    if( win.scrollTop() > sec05Top ){
                        $('#section05').addClass('addEvent');
                    }
                    else{
                        $('#section05').removeClass('addEvent');
                    }



                });


        },        
        scrollEventArrayFn: function(){
            //스크롤 이벤트(패럴럭스)
            var secTop = [];  //섹션 탑값을 배열에 저장(기억)
            var win = $(window);
            var section = $('.section');
            var n = section.length; //13개            

                //오프셋 탑값 배열처리
                for(var i=0;i<=n-1;i++){ //0 ~ 12(13)
                    secTop[i] = section.eq(i).offset().top-600; //섹션2 ~ 섹션14
                }

                //페럴럭스 스크롤 이벤트 반복처리 for
                win.scroll(function(){
                    for(var i=0;i<=n-1;i++){
                        if( win.scrollTop() > secTop[i]   ){
                            section.eq(i).addClass('addEvent'); //섹션2
                        }
                        else{
                            section.eq(i).removeClass('addEvent'); 
                        }
                    }
                });
        }        
    };

    brando.init();


})(window,document,jQuery);