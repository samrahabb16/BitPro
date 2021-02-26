import { cryptofacilitiesSocket } from "./Sokets";


// connection
export const connectionToWebSoketFunction = async () => {
    cryptofacilitiesSocket.addEventListener('open', function (event) {
        console.log('Connected to WS Server', event)
    });
}


// for book to connect or send data request
export const sendDataToSoketFunction = async (jsonObjectProps) => {
    cryptofacilitiesSocket.onopen = await function (event) {
        cryptofacilitiesSocket.send(JSON.stringify(jsonObjectProps));
    };
}

// error function handler
export const soketErrorHandlerFunction = async () => {
    cryptofacilitiesSocket.addEventListener('error', function (event) {
        console.log('WebSocket error: ', event);
    });
}
