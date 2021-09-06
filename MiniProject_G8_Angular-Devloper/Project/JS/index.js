// $("document").ready(() => {
//     $('input[type="file"]').change(function(e) {
//         var fileName = e.target.files[0].name;
//         console.log(fileName);
//     });
// });

// window.addEventListener("load", function() {
//     document.getElementById("file-upload").onchange = function(event) {
//         var reader = new FileReader();
//         reader.readAsDataURL(event.srcElement.files[0]);
//         var me = this;
//         reader.onload = function() {
//             var fileContent = reader.result;
//             console.log(fileContent);
//         };
//     };
// });

$(document).ready(function () {
    $("#sidebar").mCustomScrollbar({
        theme: "minimal"
    });

    $('#sidebarCollapse').on('click', function () {
        $('#sidebar, #content').toggleClass('active');
        $('.collapse.in').toggleClass('in');
        $('a[aria-expanded=true]').attr('aria-expanded', 'false');
    });
});