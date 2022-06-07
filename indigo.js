 let shelfElem = document.querySelector('.book-shelf');
        window.addEventListener('load', () => {
            window.addEventListener('mousemove', e => {
                // console.log(e.clientX, e.clientY);
                // console.log(e.clientY);
                // console.log(e.clientY / window.innerHeight);
                shelfElem.style.transform = `rotateX(${5 * e.clientY / window.innerHeight}deg)`;
                //=>e.clientY / window.innerHeight해서 0~1범위로 만들어준다!!
            });
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

        });
