(function () {
    var galleries = document.querySelectorAll(".gallery-cards"),
        activeIndex = 0,
        timeout;

    if (!document.documentElement.classList || 0 === galleries.length) return; // Bail early

    galleries.forEach(function (gallery) {
        var images = gallery.querySelector(".images"),
            content = gallery.querySelector(".content"),
            imageSlides = images.querySelectorAll(".slide"),
            contentSlides = content.querySelectorAll(".slide"),
            length = imageSlides ? imageSlides.length : null;

        setInterval(function () {
            window.requestAnimationFrame(
                animateSlides.bind(this, imageSlides, contentSlides, length)
            );
        }, 4000);
    });

    function animateSlides(imageSlides, contentSlides, length) {
        imageSlides.forEach(function (slide, index) {
            var order = slide.dataset.order;
            if (order == 1) {
                slide.classList.add("leave");
                slide.dataset.order = length;
                contentSlides[index].dataset.order = length;
                slide.addEventListener(
                    "transitionend",
                    handleTransitionEnd.bind(slide, length)
                );
            } else {
                slide.dataset.order = --slide.dataset.order;
                contentSlides[index].dataset.order = --contentSlides[index].dataset
                    .order;
            }
        });
    }

    function handleTransitionEnd(length, e) {
        this.classList.remove("leave");
        this.removeEventListener("transitionend", handleTransitionEnd);
    }
})();