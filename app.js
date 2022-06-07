  const data = [
            {
                values: {
                    colors: ['#FFFCF3', '#FFFAE1', '#FFEEA5', '#FFE472', '#FFD833']
                }

            },
            {
                values: {
                    colors: ['#FEF8F6', '#FFEAE0', '#FCD0BA', '#FDB292', '#F88F63']
                }
            },
            {
                values: {
                    colors: ['#FBF2FD', '#F6D8FC', '#E6A1F8', '#CA6DE3', '#B918E4']
                }
            },
            {
                values: {
                    colors: ['#FFFFFF', '#F8F8FA', '#EDEDED', '#DBDAD8', '#999999', '#767676', '#000000']
                }
            }
            // values: {},
            // values: {},
            // values: {}
        ];
        let numberOfPanels = 5;
        let panelSize = 1100;

        let unitRadian = 2 * Math.PI / numberOfPanels;
        let unitDegree = 360 / numberOfPanels;

        let panelsElem;
        let panelListElem;
        let panelItemElems;
        let observerElems;
        let currentIndex;

        let currentPanel;
        let projectListElem;
        let colorsElem;
        let colorsOrangeElem;
        let colorsPurpleElem
        let observerAnotherElems;
        let observerColorElems;
        let observerColorElemsOrange;
        let observerColorElemsPurple;
        let colorsBgElem;
        let observerColorElemsBg;

        function setElems() {
            // loaderElem = document.querySelector('.loader-wrapper');
            panelsElem = document.querySelector('.panels');
            panelListElem = document.querySelector('.panel-list');
            panelItemElems = document.querySelectorAll('.panel-item');
            observerElems = document.querySelectorAll('.observer-ready');
            // projectListElem = document.querySelector('.project-list');

            colorsElem = document.querySelectorAll('.color-item');
            colorsOrangeElem = document.querySelectorAll('.color-item-orange');
            colorsPurpleElem = document.querySelectorAll('.color-item-purple');
            colorsBgElem = document.querySelectorAll('.color-item-bg');



            observerAnotherElems = document.querySelectorAll('.observer-ready2');
            observerColorElems = document.querySelectorAll('.observer-ready3');
            observerColorElemsOrange = document.querySelectorAll('.observer-ready4');
            observerColorElemsPurple = document.querySelectorAll('.observer-ready5');
            observerColorElemsBg = document.querySelectorAll('.observer-ready6');
        }
        function setColorItems() {
            for (let i = 0; i < colorsElem.length; i++) {
                colorsElem[i].style.backgroundColor = data[0].values.colors[i];
                colorsOrangeElem[i].style.backgroundColor = data[1].values.colors[i];
                colorsPurpleElem[i].style.backgroundColor = data[2].values.colors[i];
                // colorsBgElem[i].style.backgroundColor = data[3].values.colors[i];
                // colorsElem[i].style.left = `${80 * i}px`;
            }
            for (let i = 0; i < colorsBgElem.length; i++) {
                colorsBgElem[i].style.backgroundColor = data[3].values.colors[i];
            }
        }
        function setPanelItems() {
            const dist = (panelSize / 2) / Math.tan(unitRadian / 2) + (panelSize * -0.01);
            for (let i = 0; i < panelItemElems.length; i++) {
                panelItemElems[i].style.transform = `rotateY(${unitDegree * i}deg) translateZ(${-dist}px)`;
                // panelItemElems[i].style.backgroundColor = data[i].color;
            }
        }

        function inactiveOpacity() {
            if (currentPanel) {
                currentPanel.classList.remove('active');
            }
        }

        function activeOpacity() {
            inactiveOpacity();
            currentPanel = panelItemElems[currentIndex];
            currentPanel.classList.add('active');
        }
        function rotatePanel() {
            panelListElem.style.transform = `translateZ(${165 * numberOfPanels}px) rotateY(${-unitDegree * currentIndex}deg)`;
            activeOpacity();
        }

        window.addEventListener('load', () => {
            setElems();
            setPanelItems();
            setColorItems();
            // bouncing-ball & floating animation 효과
            const io2 = new IntersectionObserver((entries, observer) => {
                for (let i = 0; i < entries.length; i++) {
                    if (entries[i].isIntersecting) {
                        entries[i].target.classList.add('activeanimation');
                    }
                    else {
                        entries[i].target.classList.remove('activeanimation');
                    }
                }
            });
            observerAnotherElems.forEach((item, i) => {
                io2.observe(item);
            });

            // color-yellow 효과
            const io3 = new IntersectionObserver((entries, observer) => {
                for (let i = 0; i < entries.length; i++) {
                    if (entries[i].isIntersecting) {
                        // entries[i].target.classList.add('active');
                        // panelListElem.style.transform = `translateZ(0) rotateY(0deg)`;
                        entries[i].target.style.transform = `translateX(${5.9 * i}vw)`;
                        // entries[i].target.classList.remove('color-item-none');

                    }
                    else {
                        entries[i].target.style.transform = `translateX(0px)`;
                    }
                }
            });
            observerColorElems.forEach((item, i) => {
                io3.observe(item);
            });

            // color-orange 효과
            const io4 = new IntersectionObserver((entries, observer) => {
                for (let i = 0; i < entries.length; i++) {
                    if (entries[i].isIntersecting) {
                        entries[i].target.style.transform = `translateX(${5.9 * i}vw)`;
                    }
                    else {
                        entries[i].target.style.transform = `translateX(0px)`;
                    }
                }
            });
            observerColorElemsOrange.forEach((item, i) => {
                io4.observe(item);
            });

            // color-purple 효과
            const io5 = new IntersectionObserver((entries, observer) => {
                for (let i = 0; i < entries.length; i++) {
                    if (entries[i].isIntersecting) {
                        entries[i].target.style.transform = `translateX(${5.9 * i}vw)`;
                    }
                    else {
                        entries[i].target.style.transform = `translateX(0px)`;
                    }
                }
            });
            observerColorElemsPurple.forEach((item, i) => {
                io5.observe(item);
            });

            // color-bg 효과
            const io6 = new IntersectionObserver((entries, observer) => {
                for (let i = 0; i < entries.length; i++) {
                    if (entries[i].isIntersecting) {
                        entries[i].target.style.transform = `translateX(${5.9 * i}vw)`;
                    }
                }
            });
            observerColorElemsBg.forEach((item, i) => {
                io6.observe(item);
            });

            // text 효과
            let parag = document.querySelector(".paragraph");
            const io7 = new IntersectionObserver((entries, observer) => {

                for (let i = 0; i < entries.length; i++) {
                    if (entries[i].isIntersecting) {
                        for (let i = 0; i < parag.querySelectorAll('.text').length; i++) {


                            let _text = parag.querySelectorAll('.text')[i];

                            let _text2 = parag.querySelectorAll('.text2')[i];

                            /*TweenMax기본 식!!=>TweenMax.from()(=>시작점)이나 TweenMax.t0()(=>끝점), css에서 animation줄때 쓰는 from과 to와 비슷!!*/
                            TweenMax.from(_text, 0.5, { //_text=>{..}안의 에니메이션 일어나는 대상,  0.5=> 0.5초동안 이라는 뜻!!
                                autoAlpha: 0,
                                // scale:4,
                                // rotate: Math.random()*360,
                                delay: Math.random() * 1,
                                ease: Power3.easeInOut //젤 많이 Power3나 Power4를 씀!!
                            });
                            TweenMax.from(_text2, 0.5, { //_text=>{..}안의 에니메이션 일어나는 대상,  0.5=> 0.5초동안 이라는 뜻!!
                                autoAlpha: 0,
                                // scale:4,
                                // rotate: Math.random()*360,
                                delay: Math.random() * 1,
                                ease: Power3.easeInOut //젤 많이 Power3나 Power4를 씀!!
                            });

                        }
                        document.body.onmousemove = function (e) {
                            document.documentElement.style.setProperty('--x', (e.clientX + window.scrollX) + 'px');
                            document.documentElement.style.setProperty('--y', (e.clientY + window.scrollY) + 'px');
                        }
                    }
                }
            });
            io7.observe(parag);

            const io = new IntersectionObserver((entries, observer) => {
                // 눈에 보이기 시작한 객체 isIntersecting : true
                // 완전히 눈에서 사라진 객체 isIntersecting : false

                for (let i = 0; i < entries.length; i++) {
                    if (entries[i].isIntersecting) {
                        // isIntersecting이 true라면

                        // 첫번째 프로젝트 처리
                        if (entries[i].target.classList.contains('content-observer-start')) {
                            currentIndex = 0;
                            rotatePanel();
                            continue;
                        }

                        // entries[i].target이 data-project-index값을 가진 요소일 때만 처리
                        const projectIndex = entries[i].target.dataset.projectIndex * 1;
                        if (projectIndex >= 0) {
                            if (scrollDirection === 'up') {
                                currentIndex = projectIndex + 1;
                            } else {
                                currentIndex = projectIndex;
                            }
                            if (currentIndex < numberOfPanels) {
                                rotatePanel();
                            }
                        }

                        // 맨 위로 올라갔을 때
                        if (
                            scrollDirection === 'up' &&
                            entries[i].target.classList.contains('header-content')
                        ) {
                            panelListElem.style.transform = `translateZ(0) rotateY(0deg)`;
                            inactivatePanel();
                        }

                        // 마지막 프로젝트를 지났을 때
                        if (
                            scrollDirection === 'down' &&
                            entries[i].target.classList.contains('content-observer-end')
                        ) {
                            panelsElem.classList.add('static-position');
                        }

                        // 마지막 프로젝트에서 올라갈 때
                        if (
                            scrollDirection === 'up' &&
                            currentIndex === numberOfPanels - 1
                        ) {
                            panelsElem.classList.remove('static-position');
                        }
                    }
                }

                console.log(scrollDirection);
                console.log(currentPanel);
                console.log(currentIndex);
            });
            observerElems.forEach((item, i) => {
                // console.log(item);
                // console.log(i);
                io.observe(item);
            });
            let prevPageYOffset; // 이전 스크롤 위치
            let scrollDirection;
            window.addEventListener('scroll', () => {
                // for (let i = 0; i < panelItemElems.length; i++) {
                //     // panelItemElems[i].style.transform = `rotateY(${unitDegree * i}deg) translateZ(${-dist}px)`;
                //     // const zMove = scrollPer * 980 - 490;
                //     // houseElem.style.transform = 'translateZ(' + zMove + 'vw)';
                //     const scrollPer = pageYOffset / 2000;
                //     const zMove = scrollPer * 980 - 490;
                //     panelItemElems[i].style.transform = 'translateZ(' + zMove + 'vw)';
                // }

                if (prevPageYOffset > window.pageYOffset) {
                    scrollDirection = 'up';
                } else {
                    scrollDirection = 'down';
                }
                prevPageYOffset = window.pageYOffset;

                console.log(prevPageYOffset, window.pageYOffset);
                console.log(scrollDirection);
            });

        });

        (function () {
            init();

            var g_containerInViewport;
            function init() {
                setStickyContainersSize();
                bindEvents();
            }

            function bindEvents() {
                window.addEventListener("wheel", wheelHandler);
            }

            function setStickyContainersSize() {
                document.querySelectorAll('.sticky-container').forEach(function (container) {
                    const stikyContainerHeight = container.querySelector('main').scrollWidth;
                    container.setAttribute('style', 'height: ' + stikyContainerHeight + 'px');
                });
            }

            function isElementInViewport(el) {
                const rect = el.getBoundingClientRect();
                return rect.top <= 0 && rect.bottom > document.documentElement.clientHeight;
            }

            function wheelHandler(evt) {

                const containerInViewPort = Array.from(document.querySelectorAll('.sticky-container')).filter(function (container) {
                    return isElementInViewport(container);
                })[0];

                if (!containerInViewPort) {
                    return;
                }

                var isPlaceHolderBelowTop = containerInViewPort.offsetTop < document.documentElement.scrollTop;
                var isPlaceHolderBelowBottom = containerInViewPort.offsetTop + containerInViewPort.offsetHeight > document.documentElement.scrollTop;
                let g_canScrollHorizontally = isPlaceHolderBelowTop && isPlaceHolderBelowBottom;

                if (g_canScrollHorizontally) {
                    containerInViewPort.querySelector('main').scrollLeft += evt.deltaY;
                }
            }

            // let panelsElem = document.querySelector('.panels');
            // let text;
            // if (window.matchMedia("(max-width: 1024px)").matches) {



            //     window.addEventListener('scroll', () => {
            //         // for (let i = 0; i < panelItemElems.length; i++) {
            //         //     // panelItemElems[i].style.transform = `rotateY(${unitDegree * i}deg) translateZ(${-dist}px)`;
            //         //     // const zMove = scrollPer * 980 - 490;
            //         //     // houseElem.style.transform = 'translateZ(' + zMove + 'vw)';
            //         //     const scrollPer = pageYOffset / 2000;
            //         //     const zMove = scrollPer * 980 - 490;
            //         //     panelItemElems[i].style.transform = 'translateZ(' + zMove + 'vw)';
            //         // }
            //         let prevPageYOffset; // 이전 스크롤 위치
            //         let scrollDirection;
            //         if (prevPageYOffset > window.pageYOffset) {
            //             scrollDirection = 'up';
            //         } else {
            //             scrollDirection = 'down';
            //         }
            //         prevPageYOffset = window.pageYOffset;
            //         console.log(scrollDirection);
            //         console.log(prevPageYOffset, window.pageYOffset);
            //         if (scrollDirection === 'down') {
            //             panelsElem.style.top = "50vw";
            //         } else {
            //             panelsElem.style.marginTop = "10vw";
            //         }
            //     });

            // }
            // } else {
            //     text = "The screen is at least 700 pixels wide.";
            // }
            // document.getElementById("demo").innerHTML = text;
            // let text;
            // if (window.matchMedia("(max-width: 1024px)").matches) {
            //     text = "The screen is less or equal to, 700 pixels wide.";
            // } else {
            //     text = "The screen is at least 700 pixels wide.";
            // }
            // document.getElementById("demo").innerHTML = text;
        })();

        // var mql = window.matchMedia('(max-width: 1024px)');

        // mql.onchange = (e) => {
        //     if (e.matches) {
        //         /* the viewport is 600 pixels wide or less */
        //         console.log('This is a narrow screen — less than 600px wide.')
        //     } else {
        //         /* the viewport is more than 600 pixels wide */
        //         console.log('This is a wide screen — more than 600px wide.')
        //     }
        // }
