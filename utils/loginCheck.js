const loginCheck = () => {
    const token = JSON.parse(localStorage.getItem("token"));
    if(!token){
        return false;
    }
    
    return true;
}
// const status = loginCheck();
export default loginCheck;

