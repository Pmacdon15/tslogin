import * as bcrypt from 'bcrypt';

class PasswordHasher {
  private pepper: string;

  constructor() {
    this.pepper = process.env.PEPPER_PHRASE ?? '';
  }

  async hash(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password + this.pepper, salt);
    return hash;
  }

  async verify(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password + this.pepper, hash);
  }
}

export default PasswordHasher;