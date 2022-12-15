import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Option from './Option'
import Footer from './Footer'
import axios from 'axios'
import './style.css'
import Navbar from './Navbar'
import { useForm } from 'react-hook-form';
import RichTextEditor from './RichTextEditor'


let optionsArray = []
let questionObj = {}
let optionsData = []

function AddQuestion() {
    const [subjects, setSubjects] = useState()
    const [topic, setTopic] = useState()
    const [dataOptions, setDataOptions] = useState([{
        option: '',
        isCorrect: false,
        richTextEditor: false
    }])
    const [optionList, setOptionList] = useState(false);
    const [optionType, setOptionType] = useState('')
    const [richTextEditor, setRichTextEditor] = useState(false);

    let navigate = useNavigate()
    const selectedSubject = useRef()
    const selectedTopic = useRef()
    const questionType = useRef()
    const difficultyLevel = useRef('Medium')
    const questionText = useRef('')
    const rightMarks = useRef(1)
    const wrongMarks = useRef(0)

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    let url = ''
    let authorizationKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWMyZTZiOWU2ZDdkNzdjOGU0ODY4OWUiLCJfYWN0aXZlT3JnIjoiNjE5Y2U0YThlNTg2ODUxNDYxMGM4ZGE3IiwiaWF0IjoxNjQ0NDY3NTQzLCJleHAiOjE2NDQ1MTA3NDN9.TalUlhe4lQPbq3KRpCj13CIKaNGG2KAL-9VlLVd917Q"   

    useEffect(() => {
        axios.get('http://admin.liveexamcenter.in/api/subjects?term=', { headers: { Authorization: authorizationKey } })
            .then(response => {
                setSubjects(response.data.result)
            })
            .catch((error) => {
                console.log('error ' + error);
            });

        let i = 0
        while (i < 4) {
            optionsArray.push(<Option key={new Date().getTime() + i + 1} id={new Date().getTime() + i + 1} remove={removeOption} addOption={storeOptionsData} editOption={optionsCheckedState} />)
            i++;
        }
    }, [])


    const subjectHandler = (e) => {

        console.log(e.target.value);
        url = 'http://admin.liveexamcenter.in/api/topics/subject/' + e.target.value
        console.log(url);
        axios.get(url, { headers: { Authorization: authorizationKey } })
            .then(response => {
                setTopic(response.data)
                console.log(response.data);
            })
            .catch((error) => {
                console.log('error ' + error);
            });
    }

    const removeOption = (id) => {
        if (optionsArray.length > 2) {
            let temp = [...optionsArray]
            optionsArray = temp.filter((option) => option.key != id)
            setOptionList((previous) => !previous)
        }
        setDataOptions(optionsArray)
    }

    const addNewOption = () => {
        optionsArray.push(<Option key={new Date().getTime()} id={new Date().getTime()} remove={removeOption} addOption={storeOptionsData} />)
        setOptionList((previous) => !previous)
        setDataOptions(optionsArray)
    }

    const addQuestion = async () => {
        questionObj = {
            type: questionType.current.value,
            diffLevel: difficultyLevel.current.value,
            subject: selectedSubject.current.value,
            topic: selectedTopic.current.value,
            questionText: questionText.current.value,
            rightMarks: parseInt(rightMarks.current.value),
            wrongMarks: parseInt(wrongMarks.current.value),
            options: dataOptions
        }
        // console.log(questionObj);

        let postUrl = 'http://admin.liveexamcenter.in/api/questions'
        await axios.post(postUrl, questionObj, { headers: { Authorization: authorizationKey } })
        navigate('/home')
    }

    const storeOptionsData = (data, index) => {
        // alert('check')

        optionsData[index] = {
            option: data,
            isCorrect: false,
            richTextEditor: false
        }
        setDataOptions(optionsData)
    }

    const optionsCheckedState = (checkedState, location) => {

        // console.log(checkedState);  
        // console.log(location);
        // console.log(questionType.current.value);

        let tempArray;
        if (questionType.current.value == 'MULTIPLE RESPONSE') {
            tempArray = [...optionsData]
            tempArray[location].isCorrect = checkedState
            setDataOptions(tempArray)
        }
        else {
            tempArray = [...optionsData]
            tempArray.map((option, index) =>
                [...optionsData, option.isCorrect = false]
            )
            // setDataOptions(tempArray)
            // tempArray = [...optionsData]
            tempArray[location].isCorrect = checkedState
            // console.log(tempArray);

            setDataOptions(tempArray)
        }
    }

    const validate1 = (data) => {
        console.log(data);
    }

    // const richTextQuestion = () => {
    //     let temp = richTextEditor!
    //     setRichTextEditor(temp)
    // }



    return (
        <>
            <Navbar />
            <div className="container mt-4">
                <div className="card">
                    <div className="card-header text-uppercase d-flex justify-content-between">
                        <h4 className="card-title mt-3">Add Question</h4>
                    </div>
                    <form onSubmit={handleSubmit(validate1)}>
                    <div className="card-body">
                            <div className="row">
                                <div className="col-6 mb-3">
                                    <label className="form-label mr-2">Select Subject</label>
                                    <select className="form-select disable w-80 h-100"
                                        onChange={(e) => subjectHandler(e)}
                                        ref={selectedSubject}
                                    >
                                        <option className=" text-muted" disabled>Choose Subject:</option>
                                        {subjects ? subjects.map((subject) => (
                                            <option key={subject._id} value={subject._id} >{subject.name}</option>
                                        )) : null}
                                    </select>
                                    {errors.subject && <small className="text-danger">Subject is Required</small>}
                                </div>

                                <div className="col-6 mb-3">
                                    <label className="form-label mr-2">Select Topic</label>
                                    <select className="form-select w-90 h-100"
                                        ref={selectedTopic}
                                        name="A"
                                        {...register("a", { required: topic ? false : true },
                                            { validate: (value) => value !== '' }

                                        )
                                        }

                                    >
                                        <option className="disable text-muted" disabled>Topics:</option>
                                        {topic ? topic.map((topic) => (
                                            <option key={topic._id} value={topic._id} >{topic.name}</option>
                                        )) : null}
                                    </select>
                                    {errors.topic && <small className="text-danger">Topic is Required</small>}
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-3 mb-3">
                                    <label className="form-label">Question Type</label>
                                    <select className="form-select w-80 h-50" onChange={(e) => setOptionType(e.target.value)} ref={questionType}  {...register("questionType", { required: "Question type Required" })}>
                                        <option value="MULTIPLE CHOICE">Multiple Choice</option>
                                        <option value="MULTIPLE RESPONSE">Multiple Response</option>
                                        <option value="FILL IN BLANKS">Fill In The Blanks</option>
                                    </select>
                                    {errors.questionType && <small className="text-danger">Question type Required</small>}
                                </div>
                                <div className="col-3 mb-3">
                                    <label className="form-label mr-2">Difficulty Level</label>
                                    <br></br>
                                    <select className="form-select w-70 h-50" ref={difficultyLevel}  {...register("diffLevel", { required: "Difficulty level Required" })}>
                                        <option value="Easy">Easy</option>
                                        <option value="Medium">Medium</option>
                                        <option value="Hard">Hard</option>
                                    </select>
                                    {errors.diffLevel && <small className="text-danger">Difficulty level Required</small>}
                                </div>
                                <div className="col-3 mb-3">
                                    <label className="form-label">Right Mark</label>
                                    <input type="text" className="form-control" ref={rightMarks}  {...register("rightMarks", { required: "Right marks Required" })}></input>
                                    {errors.rightMarks && <small className="text-danger">Right marks Required</small>}

                                </div>
                                <div className="col-3 mb-3">
                                    <label className="form-label">Wrong Mark</label>
                                    <input type="text" className="form-control" ref={wrongMarks}  {...register("wrongMarks", { required: "Wrong marks Required" })}></input>
                                    {errors.wrongMarks && <small className="text-danger">Wrong marks Required</small>}
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-12 mb-3">
                                    <label className="form-label">Question</label>
                                    {richTextEditor ?
                                    <div className="form-floating">
                                        <RichTextEditor
                                            data = {questionText.current?questionText.current:null}
                                        />
                                        {/* <textarea className="form-control" placeholder="Question" style={{ height: "100px" }} ref={questionText}  {...register("question", { required: "Question Required" })}></textarea> */}
                                        {errors.question && <small className="text-danger">Question Required</small>}
                                        <div className="form-text point" onClick={() => setRichTextEditor((prev)=>!prev)}>{richTextEditor?"Disable ":"Enable "}Rich Text Editor</div>
                                    </div>
                                    :
                                    <div className="form-floating">
                                        <textarea className="form-control" placeholder="Question" style={{ height: "100px" }} ref={questionText}  {...register("question", { required: "Question Required" })}></textarea>
                                        {errors.question && <small className="text-danger">Question Required</small>}
                                        <div className="form-text point" onClick={() => setRichTextEditor((prev)=>!prev)}>{richTextEditor?"Disable ":"Enable "}Rich Text Editor</div>
                                    </div>}
                                </div>
                            </div>


                            {/* Options Parts */}
                            <div className="row ml-2">
                                <label className="form-label">Options</label>
                                {optionsArray.map((option, index) => (React.cloneElement(option, { index: index, qtype: optionType })))}
                            </div>
                            <div>
                                <button
                                    type="button"
                                    className="btn text-primary"
                                    onClick={addNewOption}
                                >
                                    + Add Option
                                </button>
                            </div>
                        
                    </div>
                    <div className="card-header gap-2">
                        <div className="my-2">
                            <button type="submit" className="btn btn-primary mx-2"
                            // onClick={addQuestion}
                            >Save Question</button>
                            <button type="button" className="btn mx-2"> Cancel </button>
                        </div>
                    </div>
                </form>
                </div>
                
                <Footer />
            </div>
        </>
    )
}

export default AddQuestion