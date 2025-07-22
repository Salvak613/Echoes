export class GifModel {
  constructor(
    private _id: number,
    private _name: string,
    private _image_path: string,
    private _miniature_path: string
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

  get image_path(): string {
    return this._image_path;
  }

  set image_path(value: string) {
    this._image_path = value;
  }

  get miniature_path(): string {
    return this._miniature_path;
  }

  set miniature_path(value: string) {
    this._miniature_path = value;
  }
}
