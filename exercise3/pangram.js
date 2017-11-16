process.stdin.resume();
process.stdin.setEncoding("ascii");
var input = "";
process.stdin.on("data", function (chunk) {
    input += chunk;
});
process.stdin.on("end", function () {
   var char_offset = 65;
   var char = null;
   var inputUpper = input.toUpperCase().split('');
   for(var i=0; i<26; i++){
       char = String.fromCharCode(i+char_offset);
       if(inputUpper.indexOf(char)===-1){
           console.log("not pangram");
           return;
       }
   }
   console.log("pangram");
});
