function randomInteger(min, max) {
  // получить случайное число от (min-0.5) до (max+0.5)
  let rand = min + Math.random() * (max - min + 1);

  return Math.round(rand);
}

function GetSimple(){ 
    var nums = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199];
    return nums[randomInteger(0,nums.length)];
}

function MakeValidKey(invalidKey){
   let validKey ="";
    while(validKey.length != 32)
        validKey += invalidKey;

    return validKey;
}

module.exports.randomInteger = randomInteger;
module.exports.GetSimple = GetSimple;
module.exports.MakeValidKey = MakeValidKey;
