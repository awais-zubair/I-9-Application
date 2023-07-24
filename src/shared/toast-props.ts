export class ToastProps {
    id: string;
    title: string;
    content: string;
    destroy: (id: string) => void;
    duration?: number;

    constructor(title: string, content: string, duration?: number) {
        this.id = Math.random().toString(36).substring(2, 9);
        this.title = title;
        this.content = content;
        this.duration = duration;
    }
}