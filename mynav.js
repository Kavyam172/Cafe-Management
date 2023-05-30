$(document).ready(function(){
    $(".nav-item.dropdown").hover(function(){
        $(".dropdown-menu").show();
    },
    function(){
        $(".dropdown-menu").hide();
    });
});