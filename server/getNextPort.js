const net = require("net");
const Socket = net.Socket;

const getNextPort = async (port) =>
{
    return new Promise((resolve, reject) =>
    {
        const socket = new Socket();

        const timeout = () =>
        {
            resolve(port);
            socket.destroy();
        };

        const next = () =>
        {
            socket.destroy();
            resolve(getNextPort(++port));
        };

        setTimeout(timeout, 10);
        socket.on("timeout", timeout);

        socket.on("connect", () => next());

        socket.on("error", error =>
        {
            if (error.code !== "ECONNREFUSED")
                reject(error);
            else
                resolve(port);
        });

        socket.connect(port, "0.0.0.0");
    });
};

module.exports = getNextPort