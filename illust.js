  (() => {

            let yOffset = 0; // window.pageYOffset 대신 쓸 변수
            let prevScrollHeight = 0; // 현재 스크롤 위치(yOffset)보다 이전에 위치한 스크롤 섹션들의 스크롤 높이값의 합
            let currentScene = 0; // 현재 활성화된(눈 앞에 보고있는) 씬(scroll-section)
            let enterNewScene = false; // 새로운 scene이 시작된 순간 true
            let acc = 0.2;
            let delayedYOffset = 0;
            let rafId;
            let rafState;

            const sceneInfo = [{
                // 3
                type: 'sticky',
                heightNum: 5,
                scrollHeight: 0,
                objs: {
                    container: document.querySelector('#scroll-section-3'),
                    canvasCaption: document.querySelector('.canvas-caption'),
                    canvas: document.querySelector('.image-blend-canvas'),
                    context: document.querySelector('.image-blend-canvas').getContext('2d'),
                    imagesPath: [
                        'illust_images/illust-section-main.png',
                        // './images/blend-image-2.jpg'
                    ],
                    images: [],

                    // index2 추가 코드
                    messageA: document.querySelector('#scroll-section-3 .main-message.a')
                },
                values: {
                    rect1X: [0, 0, { start: 0, end: 0 }],
                    rect2X: [0, 0, { start: 0, end: 0 }],
                    blendHeight: [0, 0, { start: 0, end: 0 }],
                    canvas_scale: [0, 0, { start: 0, end: 0 }],
                    canvasCaption_opacity: [0, 1, { start: 0, end: 0 }],
                    canvasCaption_translateY: [20, 0, { start: 0, end: 0 }],
                    rectStartY: 0,

                    // index2 추가 코드
                    messageA_opacity_in: [0, 1, { start: 0, end: 0 }],
                    messageA_opacity_out: [1, 0, { start: 0, end: 0 }]
                }
            }
            ];
            function setCanvasImages() {
                let imgElem3;
                for (let i = 0; i < sceneInfo[0].objs.imagesPath.length; i++) {
                    imgElem3 = new Image();
                    imgElem3.src = sceneInfo[0].objs.imagesPath[i];
                    sceneInfo[0].objs.images.push(imgElem3);
                }
            }
            function setLayout() {
                // for (let i = 0; i < sceneInfo.length; i++) {
                sceneInfo[0].scrollHeight = sceneInfo[0].heightNum + window.innerHeight;;
                sceneInfo[0].objs.container.style.height = `${sceneInfo[0].scrollHeight}px`;
                // }
                const heightRatio = window.innerHeight / 1080;
                sceneInfo[0].objs.canvas.style.transform = `translate3d(-50%, -50%, 0) scale(${heightRatio})`;
            }
            function calcValues(values, currentYOffset) {
                let rv;
                // 현재 씬(스크롤섹션)에서 스크롤된 범위를 비율로 구하기
                const scrollHeight = sceneInfo[0].scrollHeight;
                const scrollRatio = currentYOffset / scrollHeight;

                if (values.length === 3) {
                    // start ~ end 사이에 애니메이션 실행
                    const partScrollStart = values[2].start * scrollHeight;
                    const partScrollEnd = values[2].end * scrollHeight;
                    const partScrollHeight = partScrollEnd - partScrollStart;

                    if (currentYOffset >= partScrollStart && currentYOffset <= partScrollEnd) {
                        rv = (currentYOffset - partScrollStart) / partScrollHeight * (values[1] - values[0]) + values[0];
                    } else if (currentYOffset < partScrollStart) {
                        rv = values[0];
                    } else if (currentYOffset > partScrollEnd) {
                        rv = values[1];
                    }
                } else {
                    rv = scrollRatio * (values[1] - values[0]) + values[0];
                }

                return rv;
            }

            function playAnimation() {
                const objs = sceneInfo[0].objs;
                const values = sceneInfo[0].values;
                const currentYOffset = yOffset - prevScrollHeight;
                const scrollHeight = sceneInfo[0].scrollHeight;
                const scrollRatio = currentYOffset / scrollHeight;
                switch (currentScene) {
                    case 0:
                        let step = 0;
                        // 가로/세로 모두 꽉 차게 하기 위해 여기서 세팅(계산 필요)
                        const widthRatio = window.innerWidth / objs.canvas.width;
                        const heightRatio = window.innerHeight / objs.canvas.height;
                        let canvasScaleRatio;

                        if (widthRatio <= heightRatio) {
                            // 캔버스보다 브라우저 창이 홀쭉한 경우
                            canvasScaleRatio = heightRatio;
                        } else {
                            // 캔버스보다 브라우저 창이 납작한 경우
                            canvasScaleRatio = widthRatio;
                        }

                        objs.canvas.style.transform = `scale(${canvasScaleRatio})`;
                        objs.context.fillStyle = 'white';
                        objs.context.drawImage(objs.images[0], 0, 0);
                        console.log(window.innerWidth, window.innerHeight);
                        console.log(widthRatio, heightRatio);
                        console.log(canvasScaleRatio);

                        // 캔버스 사이즈에 맞춰 가정한 innerWidth와 innerHeight
                        const recalculatedInnerWidth = document.body.offsetWidth / canvasScaleRatio;
                        const recalculatedInnerHeight = window.innerHeight / canvasScaleRatio;

                        if (!values.rectStartY) {
                            // values.rectStartY = objs.canvas.getBoundingClientRect().top;
                            values.rectStartY = objs.canvas.offsetTop + (objs.canvas.height - objs.canvas.height * canvasScaleRatio) / 2;
                            values.rect1X[2].start = (window.innerHeight / 2) / scrollHeight;
                            values.rect2X[2].start = (window.innerHeight / 2) / scrollHeight;
                            values.rect1X[2].end = values.rectStartY / scrollHeight;
                            values.rect2X[2].end = values.rectStartY / scrollHeight;
                        }

                        const whiteRectWidth = recalculatedInnerWidth * 0.15;
                        values.rect1X[0] = (objs.canvas.width - recalculatedInnerWidth) / 2;
                        values.rect1X[1] = values.rect1X[0] - whiteRectWidth;
                        values.rect2X[0] = values.rect1X[0] + recalculatedInnerWidth - whiteRectWidth;
                        values.rect2X[1] = values.rect2X[0] + whiteRectWidth;

                        // 좌우 흰색 박스 그리기
                        objs.context.fillRect(
                            parseInt(calcValues(values.rect1X, currentYOffset)),
                            0,
                            parseInt(whiteRectWidth),
                            objs.canvas.height
                        );
                        objs.context.fillRect(
                            parseInt(calcValues(values.rect2X, currentYOffset)),
                            0,
                            parseInt(whiteRectWidth),
                            objs.canvas.height
                        );

                        if (scrollRatio < values.rect1X[2].end) {
                            step = 1;
                            // console.log('캔버스 닿기 전');
                            objs.canvas.classList.remove('sticky');
                        } else {
                            step = 2;

                            // console.log('캔버스 닿은 후');
                            // 이미지 블렌드
                            // values.blendHeight: [ 0, 0, { start: 0, end: 0 } ]
                            values.blendHeight[0] = 0;
                            values.blendHeight[1] = objs.canvas.height;
                            values.blendHeight[2].start = values.rect1X[2].end;
                            values.blendHeight[2].end = values.blendHeight[2].start + 0.2;
                            const blendHeight = calcValues(values.blendHeight, currentYOffset);

                            objs.context.drawImage(objs.images[1],
                                0, objs.canvas.height - blendHeight, objs.canvas.width, blendHeight,
                                0, objs.canvas.height - blendHeight, objs.canvas.width, blendHeight
                            );

                            objs.canvas.classList.add('sticky');
                            objs.canvas.style.top = `${-(objs.canvas.height - objs.canvas.height * canvasScaleRatio) / 2}px`;

                            if (scrollRatio > values.blendHeight[2].end) {
                                values.canvas_scale[0] = canvasScaleRatio;
                                values.canvas_scale[1] = document.body.offsetWidth / (1.5 * objs.canvas.width);
                                values.canvas_scale[2].start = values.blendHeight[2].end;
                                values.canvas_scale[2].end = values.canvas_scale[2].start + 0.2;

                                objs.canvas.style.transform = `scale(${calcValues(values.canvas_scale, currentYOffset)})`;
                                objs.canvas.style.marginTop = 0;
                            }

                            if (scrollRatio > values.canvas_scale[2].end
                                && values.canvas_scale[2].end > 0) {
                                objs.canvas.classList.remove('sticky');
                                objs.canvas.style.marginTop = `${scrollHeight * 0.4}px`;

                                values.canvasCaption_opacity[2].start = values.canvas_scale[2].end;
                                values.canvasCaption_opacity[2].end = values.canvasCaption_opacity[2].start + 0.1;
                                values.canvasCaption_translateY[2].start = values.canvasCaption_opacity[2].start;
                                values.canvasCaption_translateY[2].end = values.canvasCaption_opacity[2].end;
                                objs.canvasCaption.style.opacity = calcValues(values.canvasCaption_opacity, currentYOffset);
                                objs.canvasCaption.style.transform = `translate3d(0, ${calcValues(values.canvasCaption_translateY, currentYOffset)}%, 0)`;
                            } else {
                                objs.canvasCaption.style.opacity = values.canvasCaption_opacity[0];
                            }
                            // objs.canvas.style.top = `${-(objs.canvas.height - objs.canvas.height * canvasScaleRatio) / 2}px`;
                            // index2 추가 코드
                            // values.messageA_opacity_in[2].start = values.rect1X[2].end;
                            // values.messageA_opacity_in[2].end = values.blendHeight[2].start + 0.1;
                            // values.messageA_opacity_out[2].start = values.messageA_opacity_in[2].end + 0.1;
                            // values.messageA_opacity_out[2].end = values.messageA_opacity_out[2].start + 0.1;

                            // if (scrollRatio < values.messageA_opacity_in[2].end + 0.05) {
                            //     objs.messageA.style.opacity = calcValues(values.messageA_opacity_in, currentYOffset);
                            // } else {
                            //     objs.messageA.style.opacity = calcValues(values.messageA_opacity_out, currentYOffset);
                            // }
                        }

                        // index2 추가 코드
                        // if (scrollRatio <= values.messageA_opacity_in[2].start) {
                        //     objs.messageA.style.opacity = values.messageA_opacity_in[0];
                        // }
                        // if (scrollRatio >= values.messageA_opacity_out[2].end) {
                        //     objs.messageA.style.opacity = values.messageA_opacity_out[1];
                        // }

                        break;
                }
            }


            function scrollLoop() {
                enterNewScene = false;
                prevScrollHeight = 0;

                for (let i = 0; i < currentScene; i++) {
                    prevScrollHeight += sceneInfo[0].scrollHeight;
                }

                yOffset = window.pageYOffset;
                if (yOffset >= prevScrollHeight + sceneInfo[0].scrollHeight) {
                    enterNewScene = true;
                    currentScene++;
                    // document.body.setAttribute('id', `show-scene-${currentScene}`);
                }
                else if (yOffset < prevScrollHeight) {
                    // if (currentScene === 0) return;
                    enterNewScene = true;
                    currentScene--;
                    // document.body.setAttribute('id', `show-scene-${currentScene}`);
                }
                // document.body.setAttribute('id', `show-scene-${currentScene}`);
                if (enterNewScene) return; //enterNewScene이 true이면,거기서 식 멈춰라!!

                playAnimation();
            }


            window.addEventListener('scroll', () => {
                yOffset = window.pageYOffset;
                scrollLoop();
            });
            window.addEventListener('load', () => {
                setLayout();

                let observerElems = document.querySelectorAll('.observer-ready');
                const io = new IntersectionObserver((entries, observer) => {
                    for (let i = 0; i < entries.length; i++) {
                        if (entries[i].isIntersecting) {
                            observerElems[entries[i].target.dataset.index].classList.add('active');
                        } else {
                            observerElems[entries[i].target.dataset.index].classList.remove('active');
                        }
                    }

                });
                observerElems.forEach((item, i) => {
                    item.dataset.index = i;
                    io.observe(item);
                });

            });
            window.addEventListener('resize', setLayout);
            setCanvasImages();
            // sceneInfo[0].objs.context.drawImage(sceneInfo[0].objs.videoImages[0], 0, 0); //로드 되고나서 비디오 캔버스 그려지게!!
            // function loop() {
            //     delayedYOffset = delayedYOffset + (yOffset - delayedYOffset) * acc;

            //     if (!enterNewScene) {
            //         if (currentScene === 0 || currentScene === 2) {
            //             const currentYOffset = delayedYOffset - prevScrollHeight;
            //             const objs = sceneInfo[currentScene].objs;
            //             const values = sceneInfo[currentScene].values;
            //             let sequence = Math.round(calcValues(values.imageSequence, currentYOffset));
            //             if (objs.videoImages[sequence]) {
            //                 objs.context.drawImage(objs.videoImages[sequence], 0, 0);
            //             }
            //         }
            //     }

        })();
