import { ButtonComponent } from "@/components/button";
import QuestionForm from "@/components/complex/questionForm";
import { QuestionTypeEnum } from "@/tools/enums/questionstype";
import { useEffect, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { Plus, PlusCircle } from "react-bootstrap-icons";

const Step3 = (props: any) => {
    const [questions, setQuestions] = useState([]);
    const [newQuestion, setNewQuestion] = useState('');
    const [questionType, setQuestionType] = useState('');
    const { data, handleChange } = props
    const [isShowSelect, setIsShowSelect] = useState(false);
    let [count, setCount] = useState(0)

    const handleClick = (event: any) => {
        event.preventDefault();
        setIsShowSelect(true);
    }

    const handleChanges = (event: any) => {
        setQuestionType(event.target.value);
        setIsShowSelect(false)
        setCount(count += 1)
        const questionObject = { elementId: count, text: newQuestion, type: { name: event.target.value }, position: { x: 0, y: count } };
        const updatedItems = [...questions, questionObject];
        setQuestions(updatedItems);
        setNewQuestion('');
        props.data['question'] = updatedItems
    }

    return (
        <Form>
            <Row className="mb-3">
                <Col>
                    <ButtonComponent content={<div className="d-flex"><PlusCircle className="m-1"></PlusCircle> Add new question</div>} type={'primary'} action={handleClick} css={''} />
                </Col>
            </Row>
            {
                isShowSelect ? <Form.Select name="questionType" aria-label="Default select example" defaultValue={data.type} onChange={handleChanges}>
                    <option>Select a type</option>
                    {
                        (Object.keys(QuestionTypeEnum) as (keyof typeof QuestionTypeEnum)[]).map(
                            (key, index) => {
                                return <option key={index} value={QuestionTypeEnum[key]}>{QuestionTypeEnum[key]}</option>
                            }
                        )
                    }
                </Form.Select> : ''
            }
            <QuestionForm questions={questions} />
        </Form>
    )
}

export default Step3;