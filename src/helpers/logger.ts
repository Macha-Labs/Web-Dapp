const loggingStates: any = {
    auth: true,
    channel: true,
    lens: true,
    stream: true,
    xmtp: true
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
