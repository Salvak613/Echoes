export class TextModel {
  constructor(
    private _id: number,
    private _content: string,
    private _position: "top" | "mid" | "bottom"
  ) {}

  get id(): number {
    return this._id;
  }
  get content(): string {
    return this._content;
  }
  set content(value: string) {
    this._content = value;
  }
  get position(): "top" | "mid" | "bottom" {
    return this._position;
  }
  set position(value: "top" | "mid" | "bottom") {
    this._position = value;
  }
}
