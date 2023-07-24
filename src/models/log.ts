export class Log {
    logId: number;
    employeeId: number;
    logType: LogType;
    logDateTime: Date;
    statusText: string;
}

export class LogType {
    logTypeId: number;
    description: string;
}
