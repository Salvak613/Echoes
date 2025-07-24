export class LikeModel {
  constructor(
    private _id: number,
    private _user_id: number,
    private _card_id: number,
    private _likeCount?: number,
    private _isLiked?: boolean
  ) {}

  get id(): number {
    return this._id;
  }
  get user_id(): number {
    return this._user_id;
  }
  get card_id(): number {
    return this._card_id;
  }
  get likeCount(): number | undefined {
    return this._likeCount;
  }
  get isLiked(): boolean | undefined {
    return this._isLiked;
  }
}
