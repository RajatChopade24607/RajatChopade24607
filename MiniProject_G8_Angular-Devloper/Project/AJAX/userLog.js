$(document).ready(function() {
    var da = [];
    var imageSource = [];
    // $("#likes2").click(() => {
    //     $.ajax({
    //         url: "http://localhost:3000/imageUpload",
    //         method: "get",

    //         success: (response) => {
    //             for (let i = 0; i < response.length; i++) {
    //                 if (response[i].userId == 333) {
    //                     imageSource.push(response[i]);
    //                 }
    //             }
    //            // console.log("Likes:: ");
    //             for (i = 0; i < response.length; i++) {
    //                 console.log(imageSource[i].id + " " + imageSource[i].imageSrc);
    //             }
    //         },
    //     });
    // });
    //---------------------------------------------
    var localUser=JSON.parse(localStorage.getItem("UserData"));
    var myUserId=localUser.id;
    // alert(myUserId);
    $(".table").ready(function() {
        $.ajax({
            url: "http://localhost:3000/comments",
            method: "get",

            success: (response) => {
                for (let i = 0; i < response.length; i++) {
                    if (response[i].userId == myUserId) {
                        da.push(response[i]);
                    }
                }
                console.log("comments:: ");
                for (i = 0; i < response.length; i++) {
                    console.log(response[i].id + " " + response[i].userId);
                }
            },
        });
    });
    //-------------------------------------------
    $(".table").ready(function() {
        $.ajax({
            url: "http://localhost:3000/likes",
            method: "get",

            success: (response) => {
                for (let i = 0; i < response.length; i++) {
                    if (response[i].userId == myUserId) {
                        da.push(response[i]);
                    }
                }
                console.log("Likes:: ");
                for (i = 0; i < response.length; i++) {
                    console.log(response[i].id + " " + response[i].userId);
                }
            },
        });
    });
    //---------------------------------------------

    $(".table").ready(function() {
        $.ajax({
            url: "http://localhost:3000/imageUpload",
            method: "get",

            success: (response) => {
                imageSource=response;
                for (let i = 0; i < response.length; i++) {
                    if (response[i].userId == myUserId) {
                        da.push(response[i]);
                        // imageSource.push(response[i]);
                    }
                }
                console.log("image dta:: ");
                for (i = 0; i < response.length; i++) {
                    console.log(response[i].id + " " + response[i].userId);
                }

                da.sort((a, b) => {
                    (daa = new Date(a.Date)), (db = new Date(b.Date));
                    return db - daa;
                });
                console.log(da);
                var tableBody =
                '<table width="70%" class="table  table-striped"><thead class="thead-dark"><tr style="font-weight:bold;background:#16A1E7;"><th scope="col">Activity</th><th scope="col">Date</th><th scope="col">Image</th><th scope="col">Category</th><th scope="col">#tag</th><th scope="col">Comment</th></tr></thead>';
                // '<table width="70%" cellpadding="2" align="center" style="font-size:20px;text-align="center";border-collapse:collapse;" border="1"><tr style="font-weight:bold;background:#16A1E7;"><td style="color:white;">Activity</td><td style="color:white;">Date</td><td style="color:white;">Image</td><td style="color:white;">Category</td><td style="color:white;">#tag</td><td style="color:white;">Comment</td></tr>';

                $("#222").children().remove();
                da.forEach(function(d) {
                    let comment = d.comment == undefined ? "-" : d.comment;
                    let htag = d.imageHtag == undefined ? "-" : d.imageHtag;
                    let category = d.category == undefined ? "-" : d.category;
                    let image =
                        d.imageSrc == undefined //
                        ?
                        // ' <img style="height:60px;" src="' +
                        ' <img class="img-responsive" width="50vh" height="50vh" src="' +
                        imageSource[imageSource.findIndex((x) => x.id == d.imageId)]
                        .imageSrc +
                        '">' :
                        ' <img style="height:60px;" src="' + d.imageSrc + '">';
                    //imageSource
                    tableBody +=
                        "<tr><td>" +
                        d.activity +
                        "</td><td>" +
                        d.Date +
                        "</td><td>" +
                        image +
                        "</td><td>" +
                        category +
                        "</td><td>" +
                        htag +
                        "</td><td>" +
                        comment +
                        "</td></tr>";
                });
                tableBody += "<table>";

                $(tableBody).appendTo($("#222"));
            },
        });
    });
});