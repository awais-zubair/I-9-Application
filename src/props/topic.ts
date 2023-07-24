export interface ITopics {
    topics: Topic[];
}

export class Topic {
    key: number;
    label: string;
    route: string;

    constructor(key: number, label: string, route: string) {
        this.key = key;
        this.label = label;
        this.route = route;
    }
}
