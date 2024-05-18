export interface ExchangeAPIResponse {
    success:   boolean;
    terms:     string;
    privacy:   string;
    timestamp: number;
    source:    string;
    quotes:    Quotes;
}

export interface Quotes {
    USDCRC: number;
}
