function UserAuthentication(email,password,confirmpassword){
    this.email = email;
    this.passowrd = password;
    this.confirmpassword= confirmpassword;
    
    this.getuser = function(user){
        return UserAuthentication(user.email,user.password);
    }
}


function LoggedInUser(user){
    this.userid = user.uid;
}