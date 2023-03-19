let a = 'hello';
let b: boolean = false;

// Storage가 이미 있음
interface SStorage<T> {
  [key: string]: T;
}
class LocalStorage<T> {
  private storage: SStorage<T> = {};
  set(key: string, value: T) {
    this.storage[key] = value;
  }
  remove(key: string) {
    delete this.storage[key];
  }
  get(key: string): T {
    return this.storage[key];
  }
  clear() {
    this.storage = {};
  }
}

const stringsStorage = new LocalStorage<string>();
stringsStorage.get('cat');
stringsStorage.set('hello', 'world');

const booleanStorage = new LocalStorage<boolean>();
booleanStorage.get('abc');
booleanStorage.set('hello', true);

// TypeScript에서는 같은 이름을 가진 함수를 여러 개 정의할 수 있으며 각 함수는 서로 다른 타입을 가지는 매개변수로 정의해야 합니다. 매개변수가 다르며 이름이 동일한 함수를 함수 오버로딩이라고 합니다.
