export class User {
  id!: string;
  name!: string;
  accessCode!: string;

  constructor() {
    if (!this.id) {
      this.id = Math.random().toString(36).substring(2, 9);
    }
  }
}