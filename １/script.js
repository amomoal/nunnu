$(document).ready(function() {
    const $slider = $('.slides'); // スライダー全体
    const $slides = $('.slides div'); // 各スライド
    const totalSlides = $slides.length; // スライドの数
    let currentIndex = 0; // 現在のスライド位置

    // スライドを移動する関数
    function moveToSlide(index) {
        $slider.css('transform', `translateX(${-100 * index}%)`);
    }

    // 次のスライド
    $('.next').on('click', function() {
        currentIndex = (currentIndex + 1) % totalSlides; // 次のスライドに移動
        moveToSlide(currentIndex);
    });

    // 前のスライド
    $('.prev').on('click', function() {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides; // 前のスライドに移動
        moveToSlide(currentIndex);
    });

    // 自動スライド
    setInterval(function() {
        currentIndex = (currentIndex + 1) % totalSlides; // 次のスライドに自動移動
        moveToSlide(currentIndex);
    }, 5000); // 5秒ごと
});
