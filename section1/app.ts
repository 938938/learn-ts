// 알 수 없는 타입

let userInput: unknown;
// 사용자가 무엇을 입력할지 알 수 없음
// 에러 없이 어떤 값이든 정의할 수 있음
let userName: string;
userInput = 5;
userInput = 'Max';
userName = userInput; // 오류 발생. unknown은 string이 아니기 때문에
// userInput을 any타입으로 지정하면 오류가 발생하지 않음. 타입 확인을 수행하지 않게 하기 때문.

if (typeof userInput === 'string') {
  userName = userInput; // 타입 확인을 진행했기 때문에 오류 발생 하지 않음
}

// 절대 타입
// 아무것도 반환하지 않음을 확실하게 표시
function generateError(message: string, code: number): never {
  throw { message: message, errorCode: code };
}

generateError('Error!!', 500);
