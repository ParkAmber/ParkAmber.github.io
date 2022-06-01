 window.onload = function () {
            var topBtn = document.querySelector(".topBtn");
            //top버튼 누르면 맨 앞으로 스크롤 이동시킴!!
            topBtn.addEventListener("click", function () {
                TweenMax.to(window, 1.5, {
                    scrollTo: {
                        y: 0, //=>y:'.top'
                        autoKill: true
                    },
                    ease: Power3.easeInOut
                });
            })

        }

        let observerElems;
        function setElems() {
            observerElems = document.querySelectorAll('.observer-ready');
        }
        window.addEventListener('load', () => {
            setElems();
            const io = new IntersectionObserver((entries, observer) => {
                for (let i = 0; i < entries.length; i++) {
                    if (entries[i].isIntersecting) {
                        //눈에 보이는 observer-ready에 observer-active클래스 붙여주기!!(->observer-ready붙어있는 객체들 부드럽게 transition일어나게 하는 클래스임!!)
                        observerElems[entries[i].target.dataset.index].classList.add('observer-active');
                        console.log(observerElems[entries[0].target.dataset.index]);
                    } else {
                        observerElems[entries[i].target.dataset.index].classList.remove('observer-active');
                    }
                }
            });

            observerElems.forEach((item, i) => {
                item.dataset.index = i;
                io.observe(item);
            });
        });
