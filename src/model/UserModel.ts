export class UserModel {
  constructor(
    private _id: number,
    private _email: string,
    private _name: string,

    private _created_at: Date,
  ) {}

  get id(): number {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get email(): string {
    return this._email;
  }

  get created_at(): Date {
    return this._created_at;
  }


}