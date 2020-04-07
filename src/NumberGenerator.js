function randomInteger(min, max) {
  // получить случайное число от (min-0.5) до (max+0.5)
  let rand = min + Math.random() * (max - min + 1);

  return Math.round(rand);
}

function GetSimple() {
  var nums = [
    2, 3, 5, 7,
    11,
    13,
    17,
    19,
    23,
    // 29,
    // 31,
    // 37,
    // 41,
    // 43,
    // 47,
    // 53
  ];
  return nums[randomInteger(0, nums.length)];
}

function MakeValidKey(invalidKey) {
  let validKey = "";
  while (validKey.length != 32) validKey += invalidKey;

  return validKey;
}

// function Proot(To){
//   let roots = [{si:2 ,proot:1 },{si:3 ,proot:2 },{si: 5,proot:7 },
//     {si:7 ,proot: 3},{si:11 ,proot:2 },{si:13 ,proot:2 },
//     {si:17 ,proot:3 },{si:19 ,proot:2 },{si:23 ,proot:5 },
//     {si:29 ,proot:2 },{si:31 ,proot:3 },{si:37 ,proot:2 },
//     {si:41,proot:6 },{si:43 ,proot:3 },{si:47 ,proot:5 },{si:53,proot:2 }];

//     return(roots.find(item => item.si == To).proot);

// }

function Proot(To) {
  for (let i = 0; i < To; i++) if (IsPRoot(To, i)) return i;
  return 0;
}

function IsPRoot(p, a) {
  if (a == 0 || a == 1) return false;
  let last = 1;

  let set = [];
  for (let i = 0; i < p - 1; i++) {
    last = (last * a) % p;
    if (set.includes(last))
      // Если повтор
      return false;
    set.push(last);
  }
  return true;
}

module.exports.randomInteger = randomInteger;
module.exports.GetSimple = GetSimple;
module.exports.MakeValidKey = MakeValidKey;
module.exports.Proot = Proot;
