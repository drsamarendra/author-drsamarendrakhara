export class ApiDetails {

    constructor() { };

    private _baseUrl: string = "";
    private _version: string = "";
    private _url: string = "";
    private _method: string = "";
    private _header: { [key: string]: string; } = {};

    public get method(): string {
        return this._method;
    }
    public get baseUrl(): string {
        return this._baseUrl;
    }
    public get version(): string {
        return this._version;
    }
    public get url(): string {
        return this._url;
    }
    public get header(): { [key: string]: string; } {
        return this._header;
    }
    public setBaseUrl(value: string) {
        this._baseUrl = value;
        return this;
    }
    public setVersion(value: string) {
        this._version = value;
        return this;
    }
    public setUrl(value: string) {
        this._url = value;
        return this;
    }
    public setMethod(value: string) {
        this._method = value;
        return this;
    }
    public setHeader(value: { [key: string]: string; }) {
        this._header = value;
        return this;
    }
}

export class HeaderDetails {
    private contentType: string = "application/json";

    constructor() { };

    public get ContentType(): string {
        return this.contentType;
    }

    public setContentType(value: string): void {
        this.contentType = value;
    }
}

export class ResponseData {
    private _status: number = 0;
    private _statusText: string = "";
    private _data: any = null;
    private _error: any = null;

    constructor() { };

    public get status(): number {
        return this._status;
    }
    public get statusText(): string {
        return this._statusText;
    }
    public get data(): any {
        return this._data;
    }
    public get error(): any {
        return this._error;
    }

    public setStatus(value: number) {
        this._status = value;
        return this;
    }
    public setStatusText(value: string) {
        this._statusText = value;
        return this;
    }
    public setData(value: any) {
        this._data = value;
        return this;
    }
    public setError(value: any) {
        this._error = value;
        return this;
    }
}