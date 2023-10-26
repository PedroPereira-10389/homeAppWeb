import Step1 from "@/pages/surveys/creationSteps/step1";
import Step2 from "@/pages/surveys/creationSteps/step2";
import { useState } from "react";
import { ButtonComponent } from "../button";
import { Container } from "react-bootstrap";
import AnimatedComponent from "./animated";
import Step3 from "@/pages/surveys/creationSteps/step3";
import { createSurvey } from "@/server/api/surveys/surveys";


const WizardForm = () => {
    const [data, setData] = useState({})
    let [activeStep, setActiveStep] = useState(0)

    const handleChange = (event: any) => {
        const { name, value } = event.target;
        setData({
            ...data,
            [name]: value,
        });
    };

    const handleClick = (event: any) => {
        event.preventDefault();
        if (activeStep >= 0 && activeStep < 3) {
            if (activeStep == 2) {
                console.log(data)
                createSurvey(data)
            }
            setActiveStep(activeStep += 1)
        }

    }

    const handleClickBack = (event: any) => {
        event.preventDefault();
        if (activeStep >= 0 && activeStep < 4) {
            setActiveStep(activeStep -= 1)
        }
    }

    const elements = [
        <Step1 data={data} handleChange={handleChange} />,
        <Step2 data={data} handleChange={handleChange} />,
        <Step3 data={data} handleChange={handleChange} />
    ];

    return (
        <Container className="p-0">
            <h1 className="mb-3"> Create new survey</h1>
            {
                <AnimatedComponent components={elements} currentIndex={activeStep} />
            }
            <div className="mt-3 w-100">
                {
                    activeStep > 0 ?
                        <ButtonComponent content={'Back'} type={'secondary'} action={handleClickBack} css={''}></ButtonComponent> : ''
                }
                <ButtonComponent content={activeStep < 2 ? 'Next' : 'Submit'} type={'primary'} action={handleClick} css={'ms-1'}></ButtonComponent>
            </div>
        </Container>
    )
}

export default WizardForm;