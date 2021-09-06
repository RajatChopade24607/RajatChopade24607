$(document).ready(function() {
    $("#login2").click(() => {
        alert("get request");
        var email=$('#lo_email').val();
        var password=$('#lo_password').val();
        console.log(email);
        console.log(password);
        $.ajax({
            url: "http://localhost:3000/userData",
            method: "GET",
            //data: userDetail,
            success: (response) => {
                console.log(response);
                // console.log(response.body);
                let flag=false;
                for(var i=0;i<response.length;i++){
                    if(email==response[i].email && password==response[i].password ){ // password==response[i].password
                      flag=true;
                        localStorage.setItem('UserData',JSON.stringify(response[i]));
                        window.location.href="imagExplorerLogincopy.html"
                    }
                    
                }
                if(!flag)
                {
                    alert("Invalid user or password");
                }
                
            },
        });
    });
    //---------------------------

    $("#login1").click(() => {
        alert("post request");
        var name=$('#si_name').val();
        var email=$('#si_email').val();
        var password=$('#si_password').val();
        console.log(name);
        console.log(email);
        console.log(password);
        userDetail = 
            {
                name: name,
                email: email,
                password: password
                
              } 
        
        
        ;
        $.ajax({
            url: "http://localhost:3000/userData",
            method: "POST",
            data: userDetail,
            success: (response) => {
                console.log(response);
                alert("post");
                location.reload(false);
                // console.log(response.body);
            },
        });
    });

    //-------------------

    // var email = document.getElementById("lo_email").value;
    // var password = document.getElementById("lo_password").value;

    // // console.log(email);
    // var data = JSON.parse(localStorage.getItem("UserData"));
    // let bool = false;
    // // console.log(data);
    // // console.log(data[0]);
    // for (let index = 0; index < data.length; index++) {
    //     const element = data[index];
    //     if (email == element.email && password == element.password) {
    //         bool = true;

    //         // window.location.href="home";
    //         location.href = "home.html";
    //     }

    //     // console.log(element.email);
    // }
    // if (!bool) {
    //     window.alert("Invalid  email or password");
    // }
    // console.log(data.email);
    // if(email==emaillocal && password==passlocal){
    //     window.location.href="home.html";
    // }else{
    //     window.alert("Invalid  email or password");
    // }
});