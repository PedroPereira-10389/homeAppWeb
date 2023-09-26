import { toast } from "react-toastify";

export function Message(text: string, status: number) {
    const type = typeMessage(status);
    return toast(text, { hideProgressBar: true, autoClose: 2000, type: type});
}

const typeMessage = (type: number) => {
    switch (type) {
        case 200:
            return 'success';
        case 500:
            return 'error';
        default:
            return 'error';
    }
}
