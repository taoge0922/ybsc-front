var user_info = {
  user:null,
  isLogined:false,
  dict:{}
}

user_info.isLogin = function(){
  return user_info.isLogined;
}

user_info.logined = function(obj){
  user_info.user = obj;
  user_info.isLogined =true;
}

export default user_info
