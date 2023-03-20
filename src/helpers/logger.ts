const loggingStates: any = {
    auth: false,
    channel: false,
    lens: false,
    stream: false,
    xmtp: false
};

export const loggerInit = (func: any) => {
    console.log("Logging >>>\n",`Func: ${func}\n`,)
}

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
