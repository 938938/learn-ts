// Code goes here!

/**
 * 클래스 기본
 *  */
class Department {
  // private id: string;
  // private name: string;
  // private : employees를 생성된 객체 내부에서만 접근 가능한 속성으로 변경
  private employees: string[] = [];

  // 생성자 함수
  constructor(private readonly id: string, public name: string) {
    // this.id = id;
    // this.name = n;
  }

  describe(this: Department) {
    console.log(`Department : ${this.id} ${this.name}`);
  }

  addEmployee(employee: string) {
    this.employees.push(employee);
  }

  printEmployeeInformation() {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}

class ITDepartment extends Department {
  constructor(id: string, public admins: string[]) {
    super(id, 'IT');
    // super : 기본 클래스의 생성자 호출.
    // 생성자에서 super을 먼저 호출한 다음 this 키워드를 사용하여 작업을 수행해야 함.
  }
}

const accounting = new ITDepartment('1', ['Accounting']);
console.log(accounting);

accounting.addEmployee('ABC');
accounting.addEmployee('BCD');

// accounting.employees[2]='CDF';
// 추가는 되지만 지정된 방법 이외의 수단은 사용하지 않는 것이 좋음.
// private 속성을 추가했을 경우 외부 접근이 허용되지 않음.

accounting.describe();
accounting.printEmployeeInformation();

// const accountingCopy = { name: 'DUMMY', describe: accounting.describe };
// accountingCopy.describe();

// 약식 초기화

// class Product {
//   title: string;
//   price: number;
//   private isListed: boolean;
//   constructor(name: string, pr: number) {
//     this.title = name;
//     this.price = pr;
//     this.isListed = true;
//   }
// }

// 해당 코드와 아래 코드는 같음

// class Product {
//   private isListed: boolean;
//   constructor(public title: string, public price: number) {
//     this.isListed = true;
//   }
// }


