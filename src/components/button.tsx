import { Button } from "react-bootstrap";

export function ButtonComponent({ content, type, action, css }: { content: any, type: any, action: any, css: any }) {
    return (
        <>
            <Button className={css} variant={type} onClick={action}>{content}</Button>
        </>
    );
}