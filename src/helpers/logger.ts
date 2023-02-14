const loggingStates: any = {
    auth: false,
    channel: false,
    lens: false,
    stream: true
};

export const logger = (state: string, func: string, message: string, others: any[]) => {
    if (loggingStates[state]) {
        console.log(
            "Logging >>>\n",
            `State: ${state}\n`,
            `Func: ${func}\n`,
            `Message: ${message}\n`,
            ...others,
            "\n-----------------------"
        );
    }
};
