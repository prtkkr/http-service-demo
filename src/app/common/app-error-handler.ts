import { ErrorHandler } from "@angular/core";

export class AppErrorHandler extends ErrorHandler {

    handleError(error: any) {
        alert('An unexpected error occurred.');
        console.log(error);
    }
}