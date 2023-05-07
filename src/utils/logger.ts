import pino from "pino"

const Logger = pino({
    level: "info",
    formatters: {
        level: (label) => {
            return { level: label.toUpperCase() }
        },
    },
    transport: {
        target: "pino-pretty",
        options: {
            translateTime: "UTC:yyyy-mm-dd HH:MM:ss.l o",
        },
    },
})

export default Logger
