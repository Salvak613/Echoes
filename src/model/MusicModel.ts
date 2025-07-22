export class MusicModel {
  constructor(
    private _id: number,
    private _name: string,
    private _music_path: string
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

  get music_path(): string {
    return this._music_path;
  }

  set music_path(value: string) {
    this._music_path = value;
  }
}
