import { get } from "http";

export class EchoModel {
  constructor(
    private _id: number,
    private _description: string,
    private _created_at: Date,
    private _is_private: boolean,
    // Picture
    private _picture_name: string | null,
    private _picture_image_path: string | null,
    private _picture_miniature_path: string | null,
    // Music
    private _music_name: string | null,
    private _music_path: string | null,
    // Text
    private _text_content: string | null,
    private _text_position: string | null,
    // User
    private _user_name: string | null,
    private _user_email: string | null,
    // Likes
    private _likeCount: number
  ) {}

  get id(): number {
    return this._id;
  }

  get description(): string {
    return this._description;
  }
  set description(value: string) {
    this._description = value;
  }

  get created_at(): Date {
    return this._created_at;
  }

  get is_private(): boolean {
    return this._is_private;
  }
  set is_private(value: boolean) {
    this._is_private = value;
  }

  // Picture
  get picture_name(): string | null {
    return this._picture_name;
  }
  get picture_image_path(): string | null {
    return this._picture_image_path;
  }
  get picture_miniature_path(): string | null {
    return this._picture_miniature_path;
  }

  // Music
  get music_name(): string | null {
    return this._music_name;
  }
  get music_path(): string | null {
    return this._music_path;
  }

  // Text
  get text_content(): string | null {
    return this._text_content;
  }
  get text_position(): string | null {
    return this._text_position;
  }

  // User
  get user_name(): string | null {
    return this._user_name;
  }
  get user_email(): string | null {
    return this._user_email;
  }

  //Likes
  get likeCount(): number {
    return this._likeCount;
  }
}
