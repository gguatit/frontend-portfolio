(function(){
   
    const fashion = {
        init(){
            this.paralrax();
            this.header();
            this.section1();
            this.section2();
            this.section3();
            this.section4();
            this.section5();
            this.section6();
            this.section7();
            this.section8();
            this.footer();
            this.modal();
        },
        paralrax(){

          // 패럴랙스(Paralrax) 구현
          const sections = document.querySelectorAll('.section');
         
          window.addEventListener('scroll', () => {

               const scrollY = window.scrollY;
               const winHeigh = window.innerHeight;

               sections.forEach((el) => {
                    const offsetTop = el.offsetTop - winHeigh * 0.9;
                    if (scrollY > offsetTop) {
                         el.classList.add('on');
                    }

                    if(scrollY < 50){ // 스크롤 탑값이 0이면 초기화                             
                         el.classList.remove('on');                              
                    }                    
               });

          });

       
        },
        header(){

                    
          let mode = null; // 현재 모드 상태 저장

          const header = document.querySelector('#header');
          const mainBtn = document.querySelectorAll('.main-btn');
          const sub = document.querySelectorAll('.sub');
          const mobileBtn = document.querySelector('.mobile-btn');
          const gnb = document.querySelector('#gnb');
          const sub5Btns = document.querySelectorAll('.sub5-btn');
          const sub5Subs = document.querySelectorAll('.sub5-sub');
          const sub5Lines = document.querySelectorAll('.sub-sub-line');

          let currentBtnNum = 0;

          // ---------------------------
          // ✅ 공통 함수
          // ---------------------------
          function resetDesktop(){
               mainBtn.forEach(btn => btn.classList.remove('on'));
               sub.forEach(s => {
                    s.classList.remove('on');
                    s.style.height = '';
               });
          }

          function resetMobile(){
               mobileBtn.classList.remove('on');
               gnb.classList.remove('on');
               sub.forEach(s => {
                    s.style.height = 0;
               });
          }

          // ---------------------------
          // ✅ 스크롤 이벤트 (1번만 등록)
          // ---------------------------
          let oldScr = 0;

          function scrollEvent(){
               let newScr = window.scrollY;

               if(newScr === 0){
                    header.classList.add('bg');
                    header.classList.remove('on');
               } else {
                    header.classList.remove('bg');

                    if(newScr > oldScr){
                         header.classList.add('on');
                    } else {
                         header.classList.remove('on');
                    }

                    if(mode === 'mobile'){
                         resetMobile();
                    }
               }

               oldScr = newScr;
          }

          window.addEventListener('scroll', scrollEvent);


          // ---------------------------
          // ✅ 데스크탑 이벤트 (mouseenter)
          // ---------------------------
          function setupDesktop(){

               mainBtn.forEach((btn, idx) => {
                    btn.onmouseenter = (e)=>{
                    resetDesktop();

                    e.currentTarget.classList.add('on');
                    sub[idx].classList.add('on');

                    currentBtnNum = idx;
                    };
               });

               gnb.onmouseleave = ()=>{
                    mainBtn[currentBtnNum].classList.remove('on');
                    sub[currentBtnNum].classList.remove('on');
               };

               // ---------------------------
               // ✅ 서브5 (3단 메뉴)
               // ---------------------------
               sub5Btns.forEach((btn, idx)=>{

                    // 마우스 올리면 열기
                    btn.onmouseenter = ()=>{
                         sub5Subs[idx].classList.add('on');
                    };

                    // 해당 라인에서 나가면 닫기
                    sub5Lines[idx].onmouseleave = ()=>{
                         sub5Subs[idx].classList.remove('on');
                    };

               });
          }

          // ---------------------------
          // ✅ 모바일 이벤트 (click)
          // ---------------------------
          function setupMobile(){

               mobileBtn.onclick = (e)=>{
                    e.preventDefault();
                    mobileBtn.classList.toggle('on');
                    gnb.classList.toggle('on');
               };

               let subHeight = Array(mainBtn.length).fill(0);
               let openState = Array(mainBtn.length).fill(false);

               mainBtn.forEach((btn, idx)=>{
                    subHeight[idx] = sub[idx].scrollHeight;

                    btn.onclick = (e)=>{
                    e.preventDefault();

                    if(openState[idx]){
                         sub[idx].style.height = 0;
                         openState[idx] = false;
                    } else {
                         sub.forEach(s => s.style.height = 0);
                         sub[idx].style.height = subHeight[idx] + 'px';

                         openState.fill(false);
                         openState[idx] = true;
                    }
                    };
               });

               const sub5Btns = document.querySelectorAll('.sub5-btn');
               const sub5Subs = document.querySelectorAll('.sub5-sub');

               let sub5Open = Array(sub5Btns.length).fill(false);

               sub5Btns.forEach((btn, idx)=>{

                    btn.onclick = (e)=>{
                    e.preventDefault();

                    if(sub5Open[idx]){
                         sub5Subs[idx].style.height = 0;
                         sub5Open[idx] = false;
                    } else {

                         // 다른 서브5 닫기
                         sub5Subs.forEach(s => s.style.height = 0);
                         sub5Open.fill(false);

                         // 현재 열기
                         sub5Subs[idx].style.height = sub5Subs[idx].scrollHeight + 'px';
                         sub5Open[idx] = true;
                    }

                    };

               });

          }

          // ---------------------------
          // ✅ 모드 전환 (핵심)
          // ---------------------------
          function setMode(){
               if(window.innerWidth > 991){
                    if(mode !== 'desktop'){
                    mode = 'desktop';
                    resetMobile();
                    setupDesktop();
                    }
               } else {
                    if(mode !== 'mobile'){
                    mode = 'mobile';
                    resetDesktop();
                    setupMobile();
                    }
               }
          }

          // 최초 실행
          setMode();
          window.addEventListener('resize', setMode);

        },

        section1(){
               // 메인슬라이드 구현 4초 간격
               // 0. cnt 변수 설정
               // 1. 메인슬라이드 함수
               // 2. 다음카운트 함수
               // 3. 셋인타발
               let cnt=0;
               let setId=0;     // 타이머 변수
               const slideWrap = document.querySelector('#section1 .slide-wrap');
               const prevBtn = document.querySelector('#section1 .prev-btn');
               const nextBtn = document.querySelector('#section1 .next-btn');

               // 터치스와이프 변수
               let touchStart = 0
               let touchEnd = 0

               // 드래앤드롭 변수
               let mouseDown = false
               let dragStart = 0
               let dragEnd = 0

               // 1-1. 마우스다운 : 터치시작 => 데스크탑(PC)
               slideWrap.addEventListener('mousedown', (e)=>{
                    
                    // clearInterval(setId);  // 타이머 일시중지
                    autoTimer(); // 4초 후에 호출실행
                    
                    touchStart = e.clientX;
                    // 드래그앤드롭 무브기능을 제어한다.
                    mouseDown = true;
                    // 슬라이드1,2,3 드래그시작좌표값
                    dragStart = e.clientX - (slideWrap.getBoundingClientRect().left + (window.innerWidth-15))
               })
               // 1-2. 터치스타트 : 터치시작 => 태블릿, 모바일(Mobile)
               slideWrap.addEventListener('touchstart', (e)=>{                    
                    autoTimer(); // 4초 후에 호출실행                    
                    touchStart = e.changedTouches[0].clientX; // 모바일
                    // 드래그앤드롭 무브기능을 제어한다.
                    mouseDown = true;
                    // 슬라이드1,2,3 드래그시작좌표값
                    dragStart = e.changedTouches[0].clientX - (slideWrap.getBoundingClientRect().left + (window.innerWidth-15))
               })

               // 2-1 마우스업 : 터치끝 => 데스크탑(PC)               
               slideWrap.addEventListener('mouseup', (e)=>{
                    touchEnd = e.clientX;
                    if(touchStart-touchEnd > (window.innerWidth-15)/2  ){ 
                         nextCount()
                    }
                    else{
                         mainSlide();
                    }

                    if(touchStart-touchEnd < -(window.innerWidth-15)/2 ){
                          prevCount()
                    }                    
                    else{
                         mainSlide();
                    }

                    mouseDown = false;  // 드래그 끝내야 한다.
                   
               })
               // 2-1 터치앤드 : 터치끝 => 태블릿, 모바일
               slideWrap.addEventListener('touchend', (e)=>{
                    touchEnd = e.changedTouches[0].clientX; // 모바일;
                    if(touchStart-touchEnd > (window.innerWidth-15)/2  ){ 
                         nextCount()
                    }
                    else{
                         mainSlide();
                    }

                    if(touchStart-touchEnd < -(window.innerWidth-15)/2 ){
                          prevCount()
                    }                    
                    else{
                         mainSlide();
                    }

                    mouseDown = false;  // 드래그 끝내야 한다.
                   
               })
               
               // 예외상황
               // 2-2 마우스업 : 터치끝 => 데스크탑(PC)    
               // 마우스 slideWrap 영역 범위를 벗어나면 도큐먼트에서 이벤트 발생 한다.
               // 예외상태 해결 문선전체영역으로 판단
               document.addEventListener('mouseup', (e)=>{
                    if(mouseDown===false) return; // 마우업이 이벤트 발생되면 취소

                    touchEnd = e.clientX;
                    if(touchStart-touchEnd > (window.innerWidth-15)/2  ){ 
                         nextCount()
                    }
                    else{
                         mainSlide();
                    }

                    if(touchStart-touchEnd < -(window.innerWidth-15)/2 ){
                          prevCount()
                    }                    
                    else{
                         mainSlide();
                    }

                    mouseDown = false;  // 드래그 끝내야 한다.
               })

               // 3-1. 마우스무브: 드래그 앤 드롭
               slideWrap.addEventListener('mousemove', (e)=>{
                    if(mouseDown===false) return;  
                    dragEnd = e.clientX;             
                    slideWrap.style.left = `${dragEnd - dragStart}px` 
               })
               // 3-2. 터치무브: 드래그 앤 드롭
               slideWrap.addEventListener('touchmove', (e)=>{
                    if(mouseDown===false) return;  
                    dragEnd = e.changedTouches[0].clientX; // 모바일;             
                    slideWrap.style.left = `${dragEnd - dragStart}px` 
               })


               // 메인슬라이드 함수
               function mainSlide(){
                    slideWrap.style.transition = 'left 0.3s ease-in-out';
                    slideWrap.style.left = `${-100 * cnt}%`;  // 0 1 2


                    slideWrap.addEventListener('transitionend', ()=>{
                         if(cnt>=3)cnt=0;                         
                         if(cnt <0)cnt=2;
                         slideWrap.style.transition = 'left 0s';
                         slideWrap.style.left = `${-100 * cnt}%`;                         
                         prevCountNumber((cnt+1)-1); // 이전 카운트 번호  1
                                                     // 현재 카운트 번호  2
                         nextCountNumber((cnt+1)+1); // 다음 카운트 번호  3

                         // console.log( slideWrap.childNodes )  // forEach() 사용
                         // console.log( slideWrap.children )    // for of 사용

                         // slideWrap.childNodes.forEach((item, idx)=>{
                         //      if(idx % 2 !== 0){  // 1 3 5 7 9  홀수만 출력
                         //           // console.log( idx, item )
                         //      }
                         // })

                         // for(const item of slideWrap.children){
                         //      console.log( item )
                         // }
                        
                         for(const item of slideWrap.children){
                              // console.log( cnt ) // 1 2 3 1 2 3
                              // ['slide', 'slide1']
                              // ['slide', 'slide2']
                              // ['slide', 'slide3']
                              if(item.className.split(' ')[1]==='slide1' && cnt===0){                             
                                   for(const item2 of slideWrap.children){    
                                        item2.classList.remove('on');
                                   }
                                   item.classList.add('on');                              
                              }
                              else if(item.className.split(' ')[1]==='slide2' && cnt===1){
                                   for(const item2 of slideWrap.children){    
                                        item2.classList.remove('on');
                                   }
                                   item.classList.add('on');
                              }
                              else if(item.className.split(' ')[1]==='slide3' && cnt===2){
                                   for(const item2 of slideWrap.children){    
                                        item2.classList.remove('on');
                                   }
                                   item.classList.add('on');
                              }
                         }


                    })
               }

               // 다음슬라이드 카운트함수
               function nextCount(){
                    cnt++;
                    mainSlide();
               }

               // 이전슬라이드 카운트함수
               function prevCount(){
                    cnt--;
                    mainSlide();
               }
               
               // 자동타이머함수 호출 실행한다.
               function autoTimer(){
                    clearInterval(setId);
                    setId = setInterval(nextCount, 4000);  // 4초 후에 실행
               }
               autoTimer();



               // 이전슬라이드카운트 번호 함수
               function prevCountNumber(n){
                    // console.log('이전 슬라이드 카운트 번호', n===0 ? 3 : n );
                    // 카운트 번호 태그요소에 출력하기
                    prevBtn.textContent = `0${n===0 ? 3 : n}`;
               }

               // 다음슬라이드카운트 번호 함수
               function nextCountNumber(n){
                    // console.log('다음 슬라이드 카운트 번호', n===4 ? 1 : n );  // 1 2 3 
                    // 카운트 번호 태그요소에 출력하기
                    nextBtn.textContent = `0${n===4 ? 1 : n}`;
               }

               // 이전슬라이드버튼 클릭 이벤트 리스너 등록하고 구현하기
               prevBtn.addEventListener('click', (e)=>{
                    e.preventDefault();
                    autoTimer();
                    // 이전카운트함수호출
                    prevCount();
               })

               // 다음슬라이드버튼 클릭 이벤트 리스너 등록하고 구현하기
               nextBtn.addEventListener('click', (e)=>{
                    e.preventDefault();
                    autoTimer();
                    // 다음카운트함수호출
                    nextCount();
               })


        },
        section2(){
            
        },
        section3(){
            
        },
        section4(){
        },
        section5(){
        },
        section6(){

          const seconds = document.querySelector('.seconds');
          const minutes = document.querySelector('.minutes');
          const hours   = document.querySelector('.hours');
          const days    = document.querySelector('.days');

          // 시작 날짜 (안전한 방식)
          let timeStart = new Date(2026, 4-1, 5, 0, 0, 0);

          // 300일 추가
          const sale = 300;
          timeStart.setDate(timeStart.getDate() + sale);

         
          function updateTimer() {
               let timeLeft = timeStart - new Date();

               if (timeLeft <= 0) {
                    timeLeft = 0;
                    clearInterval(timer); // ⭐ 멈춤
               }

               let s = Math.floor(timeLeft / 1000) % 60;
               let m = Math.floor(timeLeft / (1000 * 60)) % 60;
               let h = Math.floor(timeLeft / (1000 * 60 * 60)) % 24;
               let d = Math.floor(timeLeft / (1000 * 60 * 60 * 24));

               seconds.textContent = String(s).padStart(2, '0');
               minutes.textContent = String(m).padStart(2, '0');
               hours.textContent   = String(h).padStart(2, '0');
               days.textContent    = String(d).padStart(3, '0');
          }


          function startTimer() {
               updateTimer();
               setTimeout(startTimer, 1000 - (Date.now() % 1000));
          }

          startTimer();

        },
        section7(){
        },
        section8(){
               // 메인슬라이드 구현
               let cnt=0;
               let setId=0;
               const slideWrap = document.querySelector('#section8 .slide-wrap');  
               const img = document.querySelectorAll('#section8 .slide-wrap .img');  
               
               const slide = document.querySelectorAll('#section8 .slide');               
               const slideWidth = slide[0].getBoundingClientRect().width;
               const gap = parseFloat(getComputedStyle(slideWrap).gap);
               

               // 모바일전용 touchstart 손가락 터치 시작
               // 모바일전용 touchend   손가락 터치 끝
               // 모바일전용 touchmove  손가락 터치 무브(이동)
               // 터치할 때 이미지에 이벤트를 제거 => 드래그 앤 드롭에서 발생되는 방해 이벤트 제거
               img.forEach((item)=>{
                    item.addEventListener('dragstart', function(e){ // 데스탑 터치스타트 이벤트
                         e.preventDefault();
                    })
               })


               function mainSlide(){    
                    const moveWidth = slideWidth + gap;
                    if(cnt>7){
                         cnt = 0;                    
                    }
                    slideWrap.style.transition = 'left 0.3s ease-in-out';
                    slideWrap.style.left = `${-moveWidth * cnt }px`;
               }
               function nextCout(){
                    cnt++;
                    mainSlide();
               }
               function autoTimer(){
                    clearInterval(setId);
                    setId = setInterval(nextCout, 4000)
               }
               // autoTimer();



               // 마우스 드래그 앤 드롭(Drag & Drop) 구현
               // 1. 마우스 다운 이벤트 리스너 등록
               // 2. 마우스 무브 이벤트 리스너 등록
               // 3. 마우스 업   이벤트 리스너 등록
               let mouseDown = false;
               let dragStart = null;
               let dragEnd   = null;

              
               // 1. 마우스 다운 이벤트 리스너 등록  touchstart
               slideWrap.addEventListener('mousedown', (event)=>{
                    mouseDown = true;
                    dragStart = event.clientX - parseFloat(getComputedStyle(slideWrap).left);
               })
               // 1. 터치스타트 이벤트 리스너 등록  touchstart
               slideWrap.addEventListener('touchstart', (event)=>{
                    mouseDown = true;
                    dragStart = event.changedTouches[0].clientX  - parseFloat(getComputedStyle(slideWrap).left);
               })

               // 2. 마우스 무브 이벤트 리스너 등록 => 마우스 다운 이면 동작  touchmove
               slideWrap.addEventListener('mousemove', (event)=>{
                    if(!mouseDown) return;
                    dragEnd = event.clientX;
                    slideWrap.style.transition = 'left 0s ease-in-out';
                    slideWrap.style.left = `${dragEnd - dragStart}px`;
               })
               // 2. 터치 무브 이벤트 리스너 등록 => 마우스 다운 이면 동작  touchmove
               slideWrap.addEventListener('touchmove', (event)=>{
                    if(!mouseDown) return;
                    dragEnd = event.changedTouches[0].clientX;
                    slideWrap.style.transition = 'left 0s ease-in-out';
                    slideWrap.style.left = `${dragEnd - dragStart}px`;
               })

               // 3. 마우스 업   이벤트 리스너 등록 터치끝 touchend
               slideWrap.addEventListener('mouseup',   (event)=>{
                   mouseDown = false;   

                   if(dragEnd - dragStart < 0){  // 다음슬라이드                         
                         cnt = Math.round(Math.abs(dragEnd - dragStart) / slideWidth); //absolute 앱솔루트 절대값
                         if(cnt>7){
                              cnt=7;
                         }
                   }        
                         
                   if(dragEnd - dragStart > 0){  // 이전슬라이드 
                         cnt = Math.round(Math.abs(dragEnd - dragStart) / slideWidth); //absolute 앱솔루트 절대값                         
                         if(cnt>0){
                              cnt=0;
                         }
                   } 
                   
                   mainSlide(); // 메인슬라이드 함수 호출  
               })
               // 3. 터치앤드   이벤트 리스너 등록 터치끝 touchend
               slideWrap.addEventListener('touchend',   (event)=>{
                   mouseDown = false;   

                   if(dragEnd - dragStart < 0){  // 다음슬라이드                         
                         cnt = Math.round(Math.abs(dragEnd - dragStart) / slideWidth); //absolute 앱솔루트 절대값
                         if(cnt>7){
                              cnt=7;
                         }
                   }        
                         
                   if(dragEnd - dragStart > 0){  // 이전슬라이드 
                         cnt = Math.round(Math.abs(dragEnd - dragStart) / slideWidth); //absolute 앱솔루트 절대값                         
                         if(cnt>0){
                              cnt=0;
                         }
                   } 
                   
                   mainSlide(); // 메인슬라이드 함수 호출  
               })
               // 도큐먼트 예외처리
               // 3. 마우스 업   이벤트 리스너 등록
               document.addEventListener('mouseup',   (event)=>{
                   if(!mouseDown) return;
                   mouseDown = false;   

                   if(dragEnd - dragStart < 0){
                         console.log( '다음슬라이드 ');
                         cnt = Math.round(Math.abs(dragEnd - dragStart) / slideWidth); //absolute 앱솔루트 절대값
                         if(cnt>7){
                              cnt=7;
                         }
                   }        
                         
                   if(dragEnd - dragStart > 0){
                         cnt = Math.round(Math.abs(dragEnd - dragStart) / slideWidth); //absolute 앱솔루트 절대값                         
                         if(cnt>0){
                              cnt=0;
                         }
                   } 
                   
                   mainSlide(); // 메인슬라이드 함수 호출  
               })



        },
        footer(){
        },
        modal(){
        },
    }
    fashion.init();

})();