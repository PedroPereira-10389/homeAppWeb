import { createRef, useEffect, useRef, useState } from "react";
import Question from "./question";
import Draggable from 'react-draggable';

const QuestionForm = ({ questions }: { questions: any }) => {
    const nodeRef = useRef(null);
    const [elements, setElements] = useState([]);
    const parentContainerRef = createRef();

    useEffect(() => {
        setElements([...questions])
    }, [questions])

    const getElementsPositions = () => {
        const updatedCards = elements.map((el: any) => {
            const card = document.getElementById(`card-${el.elementId}`)
            if (card) {
                const rect = card.getBoundingClientRect();
                return {
                    ...el,
                    position: { x: 0, y: rect.top }
                };
            }

            return card
        });
        setElements(updatedCards)
    }

    const handleDrag = (e: any, data: any, element: any) => {
        const parentContainer = parentContainerRef.current;
        const limits = {
            left: 0,
            top: 0,
            right: parentContainer.clientWidth - data.node.clientWidth,
            bottom: parentContainer.clientHeight - data.node.clientHeight
        }
        data.x = data.x;
        const updateElements = elements.map((ec: any) => {
            if (ec.elementId == element.elementId) {
                return {
                    ...ec,
                    position: { x: data.x, y: data.y }
                }
            }
            return ec;
        });

        setElements(updateElements)
    }

    const handleDragStop = (e: any, data: any, question: any) => {
        getElementsPositions()
        console.log(elements)
        const cardIndex = elements.findIndex((c: any) => c.elementId == question.elementId)
        const cardElement = document.getElementById('card-' + question.elementId)
        if (cardIndex >= 0) {
            if (cardElement) {
                const rect = cardElement.getBoundingClientRect();

                const yPosition = rect.top + window.scrollY;
                const overlappingItems = elements.filter((c: any) =>
                    c.elementId !== question.elementId &&
                    c.position.y == yPosition
                );

                console.log(overlappingItems)
                if (overlappingItems.length > 0) {
                    const updatedCards = [...elements];

                    overlappingItems.forEach((overlappingItem) => {
                        const overlappingIndex = updatedCards.findIndex((c: any) => c.elementId == overlappingItem.elementId);
                        if (overlappingIndex >= 0) {
                            [updatedCards[cardIndex], updatedCards[overlappingIndex]] = [updatedCards[overlappingIndex], updatedCards[cardIndex]];
                        }
                    });

                    setElements(updatedCards);
                }
            }
        }
    }

    return (
        <div ref={parentContainerRef} style={{ position: 'relative', width: '100%', height: '400px' }}>
            {
                elements.map((question: any, index: any) => {
                    return (
                        <Question key={index} question={question} index={question.elementId} />
                        /*<Draggable key={index}
                            nodeRef={nodeRef}
                            axis="y"
                            bounds="parent"
                            position={question.position}
                            onDrag={(e, data) => handleDrag(e, data, question)}
                            onStop={(e, data) => handleDragStop(e, data, question)}
                        >
                            <div ref={nodeRef}>
                                <Question key={index} question={question} index={question.elementId} />
                            </div>
                        </Draggable>*/

                    )
                })
            }
        </div>
    )
}
export default QuestionForm;