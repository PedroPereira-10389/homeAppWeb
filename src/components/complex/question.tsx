import { Card, Form } from "react-bootstrap";
import QuestionType from "./questiontype";
import { useEffect, useState } from "react";

const Question = ({ question, index }: { question: any, index: any }) => {
    const [questionUpdated, setQuestionUpdated] = useState(question);

    const handleChange = (event: any) => {
        const { name, value } = event.target;
        setQuestionUpdated({
            ...questionUpdated,
            [name]: value,
        });
    };

    return (
        <Card className="mb-3" id={'card-' + index}>
            <Card.Body>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>{index}. Question</Form.Label>
                    <Form.Control name="label" type="text" placeholder="Enter the title" onChange={handleChange}/>
                </Form.Group>
                <QuestionType type={questionUpdated.type.name} questionData={question} />
            </Card.Body>
        </Card>
    )
}

export default Question;