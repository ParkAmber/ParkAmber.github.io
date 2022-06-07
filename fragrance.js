 var slideIndex = 1;
        showDivs(slideIndex);

        function plusDivs(n) {
            showDivs(slideIndex += n);
        }

        function showDivs(n) {
            var i;
            var x = document.getElementsByClassName("mySlides");
            if (n > x.length) { slideIndex = 1 }
            if (n < 1) { slideIndex = x.length }
            for (i = 0; i < x.length; i++) {
                x[i].style.display = "none";
            }
            x[slideIndex - 1].style.display = "block";
        }
        // const pin_a = document.querySelector('.collection1-content .pin');
        (() => {
            const sceneInfo = [
                {
                    // 2
                    type: 'sticky',
                    heightNum: 5,
                    scrollHeight: 0,
                    objs: {
                        container: document.querySelector('.second-section'),
                        // messageA: document.querySelector('#scroll-section-2 .a'),
                        // messageB: document.querySelector('#scroll-section-2 .b'),
                        // messageC: document.querySelector('#scroll-section-2 .c'),
                        pinA: document.querySelector('.pin.a'),
                        pinA_another: document.querySelector('.collection1-content .another-pin.b'),
                        pinA_another_final: document.querySelector('.collection1-content .another-pin.c'),

                        pinB: document.querySelector('.pinb'),
                        pinB_another: document.querySelector('.collection2-content .another-pin.d'),

                        pinC: document.querySelector('.collection3-content .pin'),
                        pinC_another: document.querySelector('.collection3-content .another-pin.e'),

                        pinD: document.querySelector('.pin-last'),
                        pinD_another: document.querySelector('.another-pin.f')

                    },
                    values: {
                        pinA_another_final_scaleX: [0, 1, { start: -0.4, end: -0.3 }],
                        pinA_scaleY: [0, 1, { start: -0.3, end: -0.2 }],
                        pinA_another_scaleX: [0, 1, { start: -0.2, end: -0.1 }],



                        pinB_scaleY: [0, 1, { start: 0.133, end: 0.24 }],
                        pinB_another_scaleX: [0, 1, { start: 0.001, end: 0.131 }],

                        pinC_scaleY: [0, 1, { start: 0.39, end: 0.52 }],
                        pinC_another_scaleX: [0, 1, { start: 0.25, end: 0.38 }],
                        // pinB_opacity_in: [0, 1, { start: 0.5, end: 0.7 }],
                        // pinC_opacity_in: [0, 1, { start: 0.72, end: 0.77 }],
                        // pinB_opacity_out: [1, 0, { start: 0.2, end: 0.25 }],
                        // pinC_opacity_out: [1, 0, { start: 0.85, end: 0.9 }]
                        pinD_scaleY: [0, 1, { start: 1.08, end: 1.13 }],
                        pinD_another_scaleX: [0, 1, { start: 1.13, end: 1.18 }]
                    }
                }
            ];

            let yOffset = 0; // window.pageYOffset 대신 쓸 변수
            let prevScrollHeight = 0; // 현재 스크롤 위치(yOffset)보다 이전에 위치한 스크롤 섹션들의 스크롤 높이값의 합
            let currentScene = 0; // 현재 활성화된(눈 앞에 보고있는) 씬(scroll-section)=> html에 미리 index값주고 currentScene = scroll-section.dataset.index라고 해도 됨!
            let enterNewScene = false; // 새로운 scene이 시작된 순간 true
            let totalScroll = 0;
            // let Scrollheight = sceneInfo[currentScene].scrollHeight;
            let currentYOffset = yOffset - prevScrollHeight;
            // let scrollRatio = currentYOffset / Scrollheight;
            const objs = sceneInfo[0].objs;
            const values = sceneInfo[0].values;
            /*
    각 스크롤 섹션의 높이 세팅 
    & currentScene(현재 씬) 정해주기 
    & currentScene(현재 씬)에 #show-scene-${currentScene}붙여줘서 display: block;해줌!!
                      */
            function setLayout() {
                sceneInfo[0].scrollHeight = sceneInfo[0].objs.container.offsetHeight;
                sceneInfo[0].objs.container.style.height = `${sceneInfo[0].scrollHeight}px`;

                yOffset = window.pageYOffset;
                let totalScroll = 0;
                // for (let i = 0; i < sceneInfo.length; i++) {
                //     totalScroll += sceneInfo[i].scrollHeight;
                //     yOffset = window.pageYOffset;
                //     if (totalScroll >= yOffset) {
                //         currentScene = i;
                //         break;
                //     }

                // }
                console.log(sceneInfo[0].scrollHeight);
            }

            /* start/end식!! */
            function calcValues(values, currentYOffset) {
                let rv;
                const Scrollheight = sceneInfo[0].scrollHeight;
                // let currentYOffset = yOffset - prevScrollHeight;
                const scrollRatio = currentYOffset / Scrollheight;
                if (values.length === 3) {
                    const partScrollstart = values[2].start * Scrollheight;
                    const partScrollend = values[2].end * Scrollheight;
                    const partScrollHeight = partScrollend - partScrollstart;
                    const partRatio = (currentYOffset - partScrollstart) / partScrollHeight
                    // A식: start ~ end 사이
                    if (currentYOffset >= partScrollstart && currentYOffset <= partScrollend) {
                        rv = partRatio * (values[1] - values[0]) + values[0];
                    }
                    //B식: start구간 전 
                    else if (currentYOffset < partScrollstart) {
                        rv = values[0];
                    }
                    else if (currentYOffset > partScrollend) {
                        rv = values[1];
                    }
                }
                //start/end 값 안가지고 있을때!!    

                return rv;
            }

            function playAnimation() {
                const objs = sceneInfo[0].objs;
                const values = sceneInfo[0].values;
                const currentYOffset = yOffset - prevScrollHeight;
                const Scrollheight = sceneInfo[0].scrollHeight;
                const scrollRatio = currentYOffset / Scrollheight;
                switch (currentScene) {

                    case 0:

                        // if (scrollRatio <= 0.5) {
                        //     // in
                        //     objs.canvas.style.opacity = calcValues(values.canvas_opacity_in, currentYOffset);
                        // } else {
                        //     // out
                        //     objs.canvas.style.opacity = calcValues(values.canvas_opacity_out, currentYOffset);
                        // }
                        console.log(scrollRatio);
                        console.log('3 play');
                        if (scrollRatio <= 0.01) {
                            // in
                            // objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_in, currentYOffset)}%, 0)`;
                            // objs.messageC.style.opacity = calcValues(values.messageC_opacity_in, currentYOffset);
                            // objs.pinB.style.transform = `scaleY(${calcValues(values.pinB_scaleY, currentYOffset)})`;
                            // objs.pinC.style.transformOrigin = top;
                            objs.pinA.style.transform = `scaleY(${calcValues(values.pinA_scaleY, currentYOffset)})`;
                            objs.pinA_another.style.transform = `scaleX(${calcValues(values.pinA_another_scaleX, currentYOffset)})`;
                            objs.pinA_another_final.style.transform = `scaleX(${calcValues(values.pinA_another_final_scaleX, currentYOffset)})`;
                            // objs.pinC_another.style.transform = `scaleX(${calcValues(values.pinC_another_scaleX, currentYOffset)})`;
                        }
                        if (scrollRatio <= 0.24) {
                            // in
                            // objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_in, currentYOffset)}%, 0)`;
                            // objs.messageB.style.opacity = calcValues(values.messageB_opacity_in, currentYOffset);

                            objs.pinB.style.transform = `scaleY(${calcValues(values.pinB_scaleY, currentYOffset)})`;
                            objs.pinB_another.style.transform = `scaleX(${calcValues(values.pinB_another_scaleX, currentYOffset)})`;
                        }
                        // } else {
                        //     // out
                        //     // objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_out, currentYOffset)}%, 0)`;
                        //     // objs.messageB.style.opacity = calcValues(values.messageB_opacity_out, currentYOffset);
                        //     objs.pinB.style.transform = `scaleY(${calcValues(values.pinB_scaleY, currentYOffset)})`;
                        //     objs.pinB_another.style.transform = `scaleX(${calcValues(values.pinB_another_scaleX, currentYOffset)})`;
                        // }

                        if (scrollRatio <= 0.52) {
                            // in
                            // objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_in, currentYOffset)}%, 0)`;
                            // objs.messageC.style.opacity = calcValues(values.messageC_opacity_in, currentYOffset);
                            // objs.pinB.style.transform = `scaleY(${calcValues(values.pinB_scaleY, currentYOffset)})`;
                            // objs.pinC.style.transformOrigin = top;
                            objs.pinC.style.transform = `scaleY(${calcValues(values.pinC_scaleY, currentYOffset)})`;
                            objs.pinC_another.style.transform = `scaleX(${calcValues(values.pinC_another_scaleX, currentYOffset)})`;
                        }

                        if (scrollRatio <= 1.2) {
                            // in
                            // objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_in, currentYOffset)}%, 0)`;
                            // objs.messageC.style.opacity = calcValues(values.messageC_opacity_in, currentYOffset);
                            // objs.pinB.style.transform = `scaleY(${calcValues(values.pinB_scaleY, currentYOffset)})`;
                            // objs.pinC.style.transformOrigin = top;
                            objs.pinD.style.transform = `scaleY(${calcValues(values.pinD_scaleY, currentYOffset)})`;
                            objs.pinD_another.style.transform = `scaleX(${calcValues(values.pinD_another_scaleX, currentYOffset)})`;
                        }
                        // } else {
                        //     // out
                        //     // objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_out, currentYOffset)}%, 0)`;
                        //     // objs.messageC.style.opacity = calcValues(values.messageC_opacity_out, currentYOffset);
                        //     // objs.pinB.style.transform = `scaleY(${calcValues(values.pinB_scaleY, currentYOffset)})`;
                        //     objs.pinC.style.transform = `scaleY(${calcValues(values.pinC_scaleY, currentYOffset)})`;
                        //     objs.pinC_another.style.transform = `scaleX(${calcValues(values.pinC_another_scaleX, currentYOffset)})`;
                        // }
                        break;

                }
            }

            function scrollLoop() {
                enterNewScene = false;
                prevScrollHeight = 0;
                for (let i = 0; i < 1; i++) {
                    prevScrollHeight += sceneInfo[0].scrollHeight;
                }
                // yOffset = window.pageYOffset;
                // if (yOffset >= prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
                //     enterNewScene = true;
                //     currentScene++;
                //     document.body.setAttribute('id', `show-scene-${currentScene}`);
                // } else if (yOffset < prevScrollHeight) {
                //     if (currentScene === 0) return;
                //     enterNewScene = true;
                //     currentScene--;
                //     document.body.setAttribute('id', `show-scene-${currentScene}`);
                // }
                // document.body.setAttribute('id', `show-scene-${currentScene}`);
                // if (enterNewScene) return; //enterNewScene이 true이면,거기서 식 멈춰라!!

                playAnimation();
            }

            window.addEventListener('scroll', () => {
                yOffset = window.pageYOffset;
                scrollLoop();
            });
            window.addEventListener('load', () => {
                setLayout();
                const observerElems = document.querySelectorAll('.observer-ready');
                const observerElemsanother = document.querySelectorAll('.observer-ready-another');
                const io = new IntersectionObserver((entries, observer) => {
                    for (let i = 0; i < entries.length; i++) {
                        if (entries[i].isIntersecting) {
                            //눈에 보이는 observer-ready에 observer-active클래스 붙여주기!!(->observer-ready붙어있는 객체들 부드럽게 transition일어나게 하는 클래스임!!)
                            observerElems[entries[i].target.dataset.index].classList.add('falling-active');
                            console.log(observerElems[entries[0].target.dataset.index]);
                        }
                    }
                    console.log(observerElems[entries[0].target.dataset.index]);
                    console.log(observerElemsanother);
                });

                observerElems.forEach((item, i) => {
                    item.dataset.index = i;
                    io.observe(item);
                });


                const io2 = new IntersectionObserver((entries, observer) => {
                    for (let i = 0; i < entries.length; i++) {
                        if (entries[i].isIntersecting) {
                            //눈에 보이는 observer-ready에 observer-active클래스 붙여주기!!(->observer-ready붙어있는 객체들 부드럽게 transition일어나게 하는 클래스임!!)
                            observerElemsanother[entries[i].target.dataset.index].classList.add('active');
                            console.log(observerElems[entries[0].target.dataset.index]);
                        }
                    }
                    console.log(observerElemsanother[entries[0].target.dataset.index]);

                });



                observerElemsanother.forEach((item, i) => {
                    item.dataset.index = i;
                    io2.observe(item);
                });


            });
            window.addEventListener('resize', () => {
                setLayout();
                scrollLoop();
                playAnimation();
            });
            // setCanvasImages();
            // sceneInfo[0].objs.context.drawImage(sceneInfo[0].objs.videoImages[0], 0, 0); //로드 되고나서 비디오 캔버스 그려지게!!
        })();
