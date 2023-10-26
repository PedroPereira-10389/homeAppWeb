import { QuestionTypeEnum } from "@/tools/enums/questionstype";
import { Col, Form, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { ButtonComponent } from "../button";
import { Plus } from "react-bootstrap-icons";

const QuestionType = ({ type, questionData }: { type: any, questionData: any }) => {
    const [items, setItems] = useState([{ text: 'Enter the title' }])
    const [questionUpdated, setQuestionUpdated] = useState(questionData);

    useEffect(() => {
        if (type == QuestionTypeEnum.MULTIPLE) {
            questionUpdated.option = [...items];
        }
    }, [items])

    const handleChange = (event: any) => {
        const { name, value } = event.target;
        const newData = { ...questionUpdated }

        if (newData.option) {
            const lastIndex = newData.option.length - 1;
            if (lastIndex >= 0) {
                newData.option[lastIndex][name] = value
            } else {
                const newOption = { [name]: value };
                newData.option = [...newData.option, newOption];
            }
        }
        setQuestionUpdated(newData)
    };

    const handleClick = (e: any) => {
        e.preventDefault();
        const newItem = { text: 'Enter the title' };
        setItems((prev) => { return [...prev, newItem] });
    }

    switch (type) {
        case QuestionTypeEnum.FREE:
            return (
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Control name="text" as="textarea" rows={3} placeholder="Enter the resume" onChange={handleChange} />
                </Form.Group>
            )
        case QuestionTypeEnum.MULTIPLE:
            return (
                <Row>
                    <Col>
                        {
                            items.map((i, index) => {
                                return (
                                    <Form.Check
                                        key={index}
                                        defaultChecked={true}
                                        type={'checkbox'}
                                        id={`default-checkbox-${index}`}
                                        label={<Form.Control type="text" name="text" placeholder={i.text} onChange={handleChange} />}
                                    />)
                            })
                        }
                    </Col>
                    <Col className="d-flex justify-content-end">
                        <ButtonComponent content={<Plus />} type={'primary'} action={handleClick} css={'position-absolute'}></ButtonComponent>
                    </Col>
                </Row>
            )
        case QuestionTypeEnum.CHOICE:
            return <Form.Check // prettier-ignore
                type={'radio'}
                id={`default-radio`}
                label={`default radio`}
            />
        default:
            console.log("none")
            break;
    }

}

export default QuestionType;