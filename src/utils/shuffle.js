// 数组乱序洗牌算法
export default function shuffle(arr) {
  const _arr = arr.slice();
  for (let i = 0; i < _arr.length; i++) {
    const j = Math.floor(Math.random() * (i + 1));
    [_arr[i], _arr[j]] = [_arr[j], _arr[i]];
  }
  return _arr;
} 