$("document").ready(() => {
    var imageId = 0;
	
    var likeId = 0;
    var commentId = 0;
    var dataUser = JSON.parse(localStorage.getItem("UserData"));
    var userName = dataUser.name;
    console.log(userName);
    var userId =dataUser.id;
    $("#helloUser").append("<h5> " + userName + "Welcome to CodeBuddies </h5>");

    //---------------------------------------------------------------

    $("#button2").click(() => {
        var filename = $("input[type=file]").val().split("\\").pop();
        console.log("file::" + filename);
        var htag = $("#hhTag").val();
        console.log("Htag::" + htag);
        var category = $("#category").find(":selected").text();
        console.log("Category::" + category);
        var myKeyVals = {
            activity: "Image Upload ",
            userId: userId,
            imageHtag: htag,
            imageSrc: filename,
            category: category,
            Date: new Date().toLocaleString(),
        };
        $.ajax({
            url: "http://localhost:3000/imageUpload",
            method: "post",
            data: myKeyVals,
            success: (response) => {
                console.log(response);
                alert("Image uploaded Successfully");
            },
        });
    });
    //--------------------------get Images------------------------------
    $(window).on("load", showImages());

    var imId = [];
    var imageLikes = [];
    $("#button1").click(() => {
        showImages();
    });

    function showImages() {
        //$("#button1").click(() => {
        // $("#imageAdd").ready(function() {
        $.ajax({
            url: "http://localhost:3000/imageUpload",
            method: "GET",
            success: (response) => {
                $("#imageAdd").children().remove();
                // <span><a class="fa fa-thumbs-up" ></a></span>
                for (let i = 0; i < response.length; i++) {
                    imId.push(response[i].id);
                    $(
                        ' <div id="img" class="imageborder">  <img id="myimage" src="' +
                        response[i].imageSrc +
                        '" width="auto" height="300">  <div>  <button type="button"  class="fa fa-download" style="background-color: DodgerBlue; border: 1px solid;color: white; padding: 15px 30px; cursor: pointer; font-size: 15px; > <a id="downloadImage"  "href="' +
                        response[i].imageSrc +
                        '" download> Download Image</a> </button>    </div>    <span><div style="text-decoration: none;" class="fa fa-thumbs-up"></div><span id="likes' +
                        response[i].id +
                        '"></span></span>    <div id="hashTag">Hashtag:' +
                        response[i].imageHtag +
                        '</div> <textarea style="border:2px solid black; border-radius:5px; " placeholder="comment here" cols="28" rows="2" id="message" name="message"></textarea>   <button class="fa fa-comments-o teal-color" style="font-size:25px; border-radius:5px" type="button" id="button44">Comment</button> <p id="imageId" style="visibility: hidden;">' +
                        response[i].id +
                        '</p>   <div  class="scroll1" id="comments' +
                        response[i].id +
                        '">comments::</div> </div>'
                    ).appendTo($("#imageAdd"));
                }
                console.log(response);
                console.log(imId);
                comments();
                likeCounte();
            },
            error: () => {
                console.log("problem");
            },
            complete: () => {
                console.log("complete");
            },
        });
    } //);

    //------------------------Comment -------------------
    $("#imageAdd").on("click", "button", function(e) {
        // alert("hi");
        e.preventDefault();
        e.stopPropagation();
        var comment = $(this).siblings("textarea").val();
        var imId = $(this).siblings("p#imageId").text();
        console.log(comment);
        console.log(imId);

        // var userId = 333;

        var mycomment = {
            activity: "Comment",
            comment: comment,
            imageId: imId,
            userId: userId,
            Date: new Date().toLocaleString(),
        };

        $.ajax({
            url: "http://localhost:3000/comments",
            method: "post",
            data: mycomment,
            success: (response) => {
                console.log(response);
                comments();
            },
        });
        return false;
    });

    //-------------------------like-------------------
    $("#imageAdd").on("click", "span", function() {
        var imId = $(this).siblings("p#imageId").text();
        // var userId = 333;

        var mycomment = {
            activity: "Like",
            imageId: imId,
            userId: userId,
            Date: new Date().toLocaleString(),
        };

        $.ajax({
            url: "http://localhost:3000/likes",
            method: "post",
            data: mycomment,
            success: (response) => {
                console.log(response);
                likeCounte();
            },
        });
    });
    //------------------------get user id and name-----------------
    var userName = [];
    getUserName = () => {
        $.ajax({
            url: "http://localhost:3000/userData",
            method: "get",
            success: (response) => {
                userName = response;
                console.log(userName);
            },
        });
    };
    //----------------------------------------------------
    //----------------------------like count-----------
    likeCounte = () => {
        getImageId();
        $.ajax({
            url: "http://localhost:3000/likes",
            method: "get",
            success: (response) => {
                for (let i = 0; i < response.length; i++) {
                    for (let j = 0; j < imageLikes.length; j++) {
                        if (imageLikes[j].imageId == response[i].imageId) {
                            imageLikes[j].totalLikes += 1;
                        }
                    }
                }
                for (let i = 0; i < imageLikes.length; i++) {
                    $("#likes" + imageLikes[i].imageId + "")
                        .children()
                        .remove();
                }
                for (let i = 0; i < imageLikes.length; i++) {
                    $("#likes" + imageLikes[i].imageId + "").append(
                        "<span>&nbsp;&nbsp;&nbsp;" + imageLikes[i].totalLikes + "</span>"
                    );
                }
            },
        });
    };
    //------------------test function--------------------------------------------------
    getImageId = () => {
        imageLikes.length = 0;
        $.ajax({
            url: "http://localhost:3000/imageUpload",
            method: "get",
            success: (response) => {
                for (let i = 0; i < response.length; i++) {
                    var iId = { imageId: response[i].id, totalLikes: 0 };
                    imageLikes.push(iId);
                }
                console.log(imageLikes);
            },
        });
    };

    //---------------------Comments retrieve images----------------------------------------
    comments = () => {
        getUserName();
        $.ajax({
            url: "http://localhost:3000/comments",
            method: "GET",
            success: (response) => {
                var da = [];

                for (let j = 0; j < imId.length; j++) {
                    $("#comments" + imId[j] + "")
                        .children()
                        .remove();
                    for (let i = 0; i < response.length; i++) {
                        if (response[i].imageId == imId[j]) {
                            $("#comments" + imId[j] + "").append(
                                '<p class="commenter' +
                                response[i].userId +
                                '" >  ' +
                                "<p> " +
                                response[i].comment +
                                "</p>"
                            );

                            console.log(response[i].comment);
                        }
                    }
                }
                //------------commenters name
                for (let i = 0; i < userName.length; i++) {
                    $(".commenter" + userName[i].id + "").each(function() {
                        $(this).append(
                            "<p style='color:blue'> " + userName[i].name + "</p>"
                        );
                    });
                }

                console.log(response);
            },
            error: () => {
                console.log("problem");
            },

            complete: () => {
                console.log("complete");
            },
        });
    };
    //---------------------Search By Category---------------------------------------
    $("#buttonSearch").click(() => {
        var criteria = $("#criteria").val();
        $.ajax({
            url: "http://localhost:3000/imageUpload",
            method: "GET",
            success: (response) => {
                var images = [];
                for (i = 0; i < response.length; i++) {
                    if (
                        response[i].category.toUpperCase() == criteria.toUpperCase() ||
                        response[i].imageHtag.toUpperCase() == criteria.toUpperCase()
                    ) {
                        console.log("Image Category::" + response[i].category);
                        images.push(response[i]);
                    }
                }
                console.log("array::" + images);
                console.log(images);
                $("#imageAdd").children().remove();
                for (let i = 0; i < images.length; i++) {
                    imId.push(images[i].id);

                    $(
                        ' <div id="img"   style="border:2px solid black; border-radius:5px;" class="imageborder">  <img id="myimage" src="' +
                        images[i].imageSrc +
                        '" width="auto" height="300">  <div>  <button type="button"  class="fa fa-download" style="background-color: DodgerBlue; border: 1px solid;color: white; padding: 15px 30px; cursor: pointer; font-size: 15px; > <a id="downloadImage"  "href="' +
                        images[i].imageSrc +
                        '" download> Download Image</a> </button>    </div>    <span><div style="text-decoration: none;" class="fa fa-thumbs-up"></div><span id="likes' +
                        images[i].id +
                        '"></span></span>    <div id="hashTag">Hashtag:' +
                        images[i].imageHtag +
                        '</div> <textarea style="border:2px solid black; border-radius:5px; " placeholder="comment here" cols="28" rows="2" id="message" name="message"></textarea>   <button class="fa fa-comments-o teal-color" style="font-size:25px; border-radius:5px" type="button" id="button44">Comment</button> <p id="imageId" style="visibility: hidden;">' +
                        images[i].id +
                        '</p>   <div  class="scroll1" id="comments' +
                        images[i].id +
                        '">comments::</div> </div>'
                    ).appendTo($("#imageAdd"));
                }

                console.log(response);
                console.log(imId);
                comments();
                likeCounte();
            },
            error: () => {
                console.log("problem");
            },

            complete: () => {
                console.log("complete");
            },
        });
    });
    //-------------------------------------------------------------
});