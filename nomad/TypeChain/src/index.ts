import { init, exit } from 'myPackage';

init({
  url: 'true',
});

exit(1);

const hello = () => 'hi';

class Block {
  constructor(private data: string) {}
  static hello() {
    return 'hi';
  }
}
