var i = 0;

function onCalcul() {
    console.log("onCalcul()");
    //show();
    //getFrame(0);
    //animation1();
    animation3();
}

function getImage(n) {
    n = n + 1;
    if (n < 10) {
        console.log("E" + n);
        fetch("test" + n + ".html").then(response => {
            console.log("R" + n + ": " + response.status);
            getImage(n);
            return (response);
        })
    }
}

function getFrame(n) {
    if (n < 10) {
        fetch("frame?no=" + n).then(response => {
            if (response.status == 200) {
                iframe = document.getElementById("myimg");
                iframe.onload = function () {
                    setTimeout(function () {
                        getFrame(n + 1);
                    }, 200);
                }
                iframe.contentWindow.location.reload();
            }
        });
    }
}

function animation() {
    let currentImage = 1;
    const interval = setInterval(() => {
        document.getElementById("myimg").src = `frame?no=${currentImage}`;
        currentImage = currentImage + 1;
        if (currentImage > 120) {
            clearInterval(interval);
        }
    }, 300);
}

function animation1() {
    console.log("animation1()");
    var currentImage = 0;
    var startTime;

    function updateImage() {
        document.getElementById("myimg1").src = `frame?no=${currentImage}`;
        currentImage = currentImage + 1;
    }

    function loop(timestamp) {
        if (!startTime) startTime = timestamp;
        let progress = timestamp - startTime;
        if (progress >= 300 * currentImage) {
            updateImage();
        }
        if (currentImage <= 120) {
            window.requestAnimationFrame(loop);
        }
    }
    window.requestAnimationFrame(loop);
}

function show() {
    i = (i % 2) + 1;
    if (i == 1) {
        document.getElementById("myimg1").style.display = 'none';
        document.getElementById("myimg2").style.display = 'block';
    } else {
        document.getElementById("myimg1").style.display = 'block';
        document.getElementById("myimg2").style.display = 'none';
    }
}

function animation2() {
    console.log("animation2()");

    for (let i = 0; i <= 10; i++) {
        let im = `frame?no=${i}`;
        if ((i % 2) == 0) {
            document.getElementById("myimg2").src = im;
        } else {
            document.getElementById("myimg3").src = im;
        }
        setTimeout(() => {
            console.log(im);
            if ((i % 2) == 0) {
                console.log("---0---");
                document.getElementById("myimg2").style.display = 'block';
                document.getElementById("myimg3").style.display = 'none';
            } else {
                console.log("---1---");
                document.getElementById("myimg2").style.display = 'none';
                document.getElementById("myimg3").style.display = 'block';
            }
        }, 1000 * i);
    }
}

function animation3() {
    console.log("animation3()");

    for (let i = 0; i <= 50; i++) {
        setTimeout(() => {
            let im = `frame?no=${i}`;
            console.log(im);
            switch (i % 3) {
                case 0:
                    console.log("---0---");
                    document.getElementById("myimg1").src = im;
                    document.getElementById("myimg1").style.display = 'none';
                    document.getElementById("myimg2").style.display = 'none';
                    document.getElementById("myimg3").style.display = 'block';
                    break;
                case 1:
                    console.log("---1---");
                    document.getElementById("myimg2").src = im;
                    document.getElementById("myimg1").style.display = 'block';
                    document.getElementById("myimg2").style.display = 'none';
                    document.getElementById("myimg3").style.display = 'none';
                    break;
                default:
                    console.log("---2---");
                    document.getElementById("myimg3").src = im;
                    document.getElementById("myimg1").style.display = 'none';
                    document.getElementById("myimg2").style.display = 'block';
                    document.getElementById("myimg3").style.display = 'none';
                    break;
            }
        }, 400 * i);
    }
}

