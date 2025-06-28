export class Feedback {
    private _comment?: string;
    private _name?: string;
    private _date?: string | undefined;
    private _rating?: number | undefined;

    constructor() { }

    public get comment(): string | undefined {
        return this._comment;
    }
    public get name(): string | undefined {
        return this._name;
    }
    public get date(): string | undefined {
        return this._date;
    }
    public get rating(): number | undefined {
        return this._rating;
    }

    public setComment(value: string) {
        this._comment = value;
        return this;
    }
    public setName(value: string) {
        this._name = value;
        return this;
    }
    public setDate(value: string | undefined) {
        this._date = value;
        return this;
    }
    public setRating(value: number | undefined) {
        this._rating = value;
        return this;
    }
}