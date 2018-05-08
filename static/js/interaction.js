$(function () {
$(document).ready(function(){
    // index aniamtion
    // 기기 width check
    if($(window).width() > 1023){
        // Xblocksystems
        $('#about_us h3.section_title').addClass('animation');
        $('#about_us .about_us_img').addClass('animation');
        $('#about_us .about_us_des').addClass('animation');

        $(window).scroll(function () {
            // console.log($(this).scrollTop());

            if ($(this).scrollTop() > 200) {
                $('#about_us h3.section_title').removeClass('animation');
            }
            if ($(this).scrollTop() > 350) {
                $('#about_us .about_us_img').removeClass('animation');
            }
            if ($(this).scrollTop() > 450) {
                $('#about_us .about_us_des').removeClass('animation');
            }
        });

        // X-Chain
        $('#x-chain h3.section_title').addClass('animation');
        $('#x-chain .section_sub').addClass('animation');
        $('#x-chain .chain_table').addClass('animation');

        $(window).scroll(function () {
            if ($(this).scrollTop() > 1100) {
                $('#x-chain h3.section_title').removeClass('animation');
            }
            if ($(this).scrollTop() > 1200) {
                $('#x-chain .section_sub').removeClass('animation');
            }
            if ($(this).scrollTop() > 1300) {
                $('#x-chain .chain_table').removeClass('animation');
            }
        });

        // smartPassOn
        $('#smartPassOn h3.section_title').addClass('animation');
        $('#smartPassOn .section_sub').addClass('animation');
        $('#smartPassOn .block_wrap').addClass('animation');

        $(window).scroll(function () {
            if ($(this).scrollTop() > 1700) {
                $('#smartPassOn h3.section_title').removeClass('animation');
            }
            if ($(this).scrollTop() > 1800) {
                $('#smartPassOn .section_sub').removeClass('animation');
            }
            if ($(this).scrollTop() > 1900) {
                $('#smartPassOn .block_wrap').removeClass('animation');
            }
        });

        // solution
        $('#solution h3.section_title').addClass('animation');
        $('#solution .section_sub').addClass('animation');
        $('#solution .block_wrap').addClass('animation');

        $(window).scroll(function () {
            if ($(this).scrollTop() > 2900) {
                $('#solution h3.section_title').removeClass('animation');
            }
            if ($(this).scrollTop() > 3000) {
                $('#solution .section_sub').removeClass('animation');
            }
            if ($(this).scrollTop() > 3200) {
                $('#solution .block_wrap').removeClass('animation');
            }
        });

        // medi
        $('#medi .left').addClass('animation');
        $('#medi .right').addClass('animation');


        $(window).scroll(function () {
            if ($(this).scrollTop() > 3640) {
                $('#medi .left').removeClass('animation');
            }
            if ($(this).scrollTop() > 3740) {
                $('#medi .right').removeClass('animation');
            }

        });

        // latest_news
        $('#latest_news article').addClass('animation');

        $(window).scroll(function () {
            if ($(this).scrollTop() > 4300) {
                $('#latest_news article').removeClass('animation');
            }
        });

        // latest_news
        $('#career h3.section_title').addClass('animation');
        $('#career .section_sub').addClass('animation');

        $(window).scroll(function () {
            if ($(this).scrollTop() > 5500) {
                $('#career h3.section_title').removeClass('animation');
            }
            if ($(this).scrollTop() > 5650) {
                $('#career .section_sub').removeClass('animation');
            }

        });
    }


});
});