$(document).ready(function() {
    var allDescendant = $('#selected').find('p');
    console.log(allDescendant);

    var allDescendants = $('#selected').children('p');
    console.log(allDescendants.length);
    console.log($('div').children('*').length)
});