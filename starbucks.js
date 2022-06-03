


        window.addEventListener('load', () => {
            const observeElems = document.querySelectorAll('.observe-ready');
            const io = new IntersectionObserver((entries, observer) => {
                for (let i = 0; i < entries.length; i++) {
                    if (entries[i].isIntersecting) {
                        observeElems[entries[i].target.dataset.index].classList.add('active');
                        console.log(observeElems[entries[0].target.dataset.index]);
                    } else {
                        observeElems[entries[i].target.dataset.index].classList.remove('active');
                    }
                }

            });
            observeElems.forEach((item, i) => {
                item.dataset.index = i;
                io.observe(item);
            });



            let parag = document.querySelector(".paragraph");
            const io1 = new IntersectionObserver((entries, observer) => {

                for (let i = 0; i < entries.length; i++) {
                    if (entries[i].isIntersecting) {
                        for (let i = 0; i < parag.querySelectorAll('.text').length; i++) {


                            let _text = parag.querySelectorAll('.text')[i];


                            /*TweenMax기본 식!!=>TweenMax.from()(=>시작점)이나 TweenMax.t0()(=>끝점), css에서 animation줄때 쓰는 from과 to와 비슷!!*/
                            TweenMax.from(_text, 0.5, { //_text=>{..}안의 에니메이션 일어나는 대상,  0.5=> 0.5초동안 이라는 뜻!!
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

            io1.observe(parag);










            let parag2 = document.querySelector(".paragraph2");
            const io2 = new IntersectionObserver((entries, observer) => {

                for (let i = 0; i < entries.length; i++) {
                    if (entries[i].isIntersecting) {
                        for (let i = 0; i < parag2.querySelectorAll('.text2').length; i++) {


                            let _text2 = parag2.querySelectorAll('.text2')[i];


                            /*TweenMax기본 식!!=>TweenMax.from()(=>시작점)이나 TweenMax.t0()(=>끝점), css에서 animation줄때 쓰는 from과 to와 비슷!!*/
                            TweenMax.from(_text2, 0.4, { //_text=>{..}안의 에니메이션 일어나는 대상,0.4,=>0.4,초동안 이라는 뜻!!
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
            io2.observe(parag2);
            // const timerId = setTimeout(() => {
            //     let parag = document.querySelector(".paragraph");
            //     for (var i = 0; i < parag.querySelectorAll('.text').length; i++) {

            //         var _text = parag.querySelectorAll('.text')[i];

            //         /*TweenMax기본 식!!=>TweenMax.from()(=>시작점)이나 TweenMax.t0()(=>끝점), css에서 animation줄때 쓰는 from과 to와 비슷!!*/
            //         TweenMax.from(_text, 1, { //_text=>{..}안의 에니메이션 일어나는 대상, 1=>1초동안 이라는 뜻!!
            //             autoAlpha: 0,
            //             // scale:4,
            //             // rotate: Math.random()*360,
            //             delay: Math.random() * 1,
            //             ease: Power3.easeInOut //젤 많이 Power3나 Power4를 씀!!
            //         });
            //     }
            //     document.body.onmousemove = function (e) {
            //         document.documentElement.style.setProperty('--x', (e.clientX + window.scrollX) + 'px');
            //         document.documentElement.style.setProperty('--y', (e.clientY + window.scrollY) + 'px');
            //     }
            // }, 5000);



            // let parag = document.querySelector(".paragraph");
            // for (var i = 0; i < parag.querySelectorAll('.text').length; i++) {

            //     var _text = parag.querySelectorAll('.text')[i];

            //     /*TweenMax기본 식!!=>TweenMax.from()(=>시작점)이나 TweenMax.t0()(=>끝점), css에서 animation줄때 쓰는 from과 to와 비슷!!*/
            //     TweenMax.from(_text, 1, { //_text=>{..}안의 에니메이션 일어나는 대상, 1=>1초동안 이라는 뜻!!
            //         autoAlpha: 0,
            //         // scale:4,
            //         // rotate: Math.random()*360,
            //         delay: Math.random() * 1,
            //         ease: Power3.easeInOut //젤 많이 Power3나 Power4를 씀!!
            //     });
            // }
            // document.body.onmousemove = function (e) {
            //     document.documentElement.style.setProperty('--x', (e.clientX + window.scrollX) + 'px');
            //     document.documentElement.style.setProperty('--y', (e.clientY + window.scrollY) + 'px');
            // }
        });



