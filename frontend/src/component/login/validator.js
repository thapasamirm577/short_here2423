export const validator = (name,value)=>{
    if(name === "name"){
        if(value<2){
            return true;
        }
        return false;
    }
    if(name==="email"){
        const atpos = value.indexOf("@");
        const dotpos = value.indexOf(".");
        const pos = dotpos - atpos;
        if(pos < 2){
            console.log("Please enter valid email");
            return true;
        }
        return false
    }

    if(name==="password"){
        if(value.length<6){
            return "Password must be of at leat 6 length";
           
        }
        const regx1 = /[0-9]/;
        const regx2 = /[A-Z]/;
        const regx3 = /[~!@#$%^&*()_+={}":'?/.<>;]/
        const matching = regx1.test(value);
        if(!matching){
            return "Password should contain number";
           
        } 
        const matching2=regx2.test(value);
        if(!matching2){
            return "Password sholud contain capital lettter";
            
        }
        const matching3=regx3.test(value);
        if(!matching3){
            return "Password sholud contain special character";
        }
        return; 
         
    }

}