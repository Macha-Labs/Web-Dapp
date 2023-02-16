const loggingStates: any = {
    auth: true,
    channel: true,
    lens: true,
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
