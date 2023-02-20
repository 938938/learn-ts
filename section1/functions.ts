function add(n1: number, n2: number): number {
  // 반환타입 설정
  return n1 + n2;
}
// 타입을 명시적으로 설정할 이유가 굳이 없다면, 타입스크립트가 타입을 추론하게 두는게 좋음
function printResult(num: number): void {
  console.log(num);
}
// 반환하는 값이 없는 경우 : void
// void = 의도적으로 반환문이 없다는 것을 의미

let combinedValues: (a: number, b: number) => number; // 함수 타입 지정
combinedValues = add;

function addAndHandle(n1: number, n2: number, cb: (num: number) => void) {
  const result = n1 + n2;
  cb(result);
}

addAndHandle(10, 20, (result) => {
  console.log(result);
});

// 콜백 함수는 전달되는 인수가 반환 값을 기대하지 않는 경우에도 값을 반환할 수 있음


