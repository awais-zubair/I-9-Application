export class Helpers {

    static createCookie(key: string, value: string, expiry: number): string {
        let now = new Date();
        now.setUTCDate(now.getUTCDate() + expiry);
        let timestamp = now.toUTCString();
        return `${key}=${value};expires=${timestamp};path=/`;
    }

    static extractCookie(cookies: string, key: string): string {
        let entries = cookies.split(";");
        for (let entry of entries) {
            let keyValue = entry.split("=");
            if (keyValue[0].trim() === key) {
                return keyValue[1].trim();
            }
        }
        return "";
    }

    static distinct<T>(values: T[]): T[] {
        return values.filter((x, i, a) => a.indexOf(x) === i);
    }

    static greaterThan(first: any, second: any): number {
        if (first && second) {
            let type = typeof first;
            switch (type) {
                case "number":
                    return first - second;
                case "string":
                    return first.toLowerCase() < second.toLowerCase() ? -1 : first.toLowerCase() > second.toLowerCase() ? 1 : 0;
                case "boolean":
                    return !first && second ? -1 : first && !second ? 1 : 0;
                default:
                    return 0;
            }
        }
        return 0;
    }

    static enumKeys<O extends object, K extends keyof O = keyof O>(obj: O): K[] {
        return Object.keys(obj).filter(k => Number.isNaN(+k)) as K[];
    }

    static stringKeys<T>(type: new() => T): string[] {
        return Object.keys(type).map(key => type[key as keyof typeof type]);
    }

    static stringToEnum<T>(enumObj: T, str: keyof T): T[keyof T] {
        return enumObj[str];
    }

    static coerce<T>(json: object[], model: T) : T{
        let key: keyof typeof model;
        for(key in model) {
            //let fred = typeof model[key];
            model[key] = json[key.toString()];
            console.log(model[key]);
        }
        console.log(model);
        return <T><unknown>json;
    }

}
