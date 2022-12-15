import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import { Row } from 'react-bootstrap'
import { Col } from 'react-bootstrap'
import { currencies } from 'currencies.json' 
import HttpServices from '../../Services/HttpServices'
import StorageServices from '../../Services/StorageServices';
let userData = ""
let contactFieldData = ""

function AddDeal() {
    const [pipelines, setPipelines] = useState()
    const [contacts, setContacts] = useState([])
    const [contactPerson, setContactPerson] = useState('')
    const [organization, setOrganization] = useState('')
    const [organizationInput, setOrganizationInput] = useState('')
    const [dealName, setDealName] = useState('')
    const [dealValue, setDealValue] = useState('0.00')
    const [dealCurrency, setDealCurrency] = useState('')
    const [dealInputField, setDealInputField] = useState('')
    const [pipes, setPipes] = useState([])
    const [pipelineStagesNumber, setPipelineStagesNumber] = useState(5)
    const [customFields, setCustomFields] = useState()
    const [fields, setFields] = useState('')
    const [showContacts, setShowContacts] = useState(true)
    const [showOrganization, setShowOrganization] = useState(true)
    const [pipelineId, setPipelineId] = useState('shfdj')
    const [currentStage, setCurrentStage] = useState(0)
    const [closeDate, setCloseDate] = useState()
    const [visibility, setVisibility] = useState("private")
    const [customData, setCustomData] = useState([])
    const [currencyCode, setCurrencyCode] = useState("USD")
    const [organizationFound, setOrganizationFound] = useState(null)
    const [peopleFound, setPeopleFound] = useState(false)
    const [personValidation, setPersonValidation] = useState(false)
    const [peopleId, setPeopleId] = useState('')
    //const [newContact, setNewContact] = useState(false)
    //const [newOrganization, setNewOrganization] = useState(false)
    //const [currencySymbol, setCurrencySymbol] = useState()
    const defaultCurrencyValue = "0.00"
    let companyId = ''
    let owner = ''

    const updateStage = (e, temp) => {
        let position = e.target.id
        // console.log(position);
        setCurrentStage(parseInt(position) + 1)
        // console.log(pipelineStagesNumber);
        // console.log(temp);

        let i = 0
        let pipelineStages = []

        if (typeof temp == 'undefined') {
            temp = 5
            console.log("temp set");
        }


        while (i < temp) {
            if (i == 0) {
                pipelineStages.push(<div id={i} onClick={(e) => updateStage(e, temp)} className="col border border-dark p-2 bg-success"></div>)
            }
            else if (i <= position) {
                pipelineStages.push(<div id={i} onClick={(e) => updateStage(e, temp)} className="col border border-dark p-2 bg-success"></div>)
            }
            else {
                pipelineStages.push(<div id={i} onClick={(e) => updateStage(e, temp)} className="col border border-dark p-2"></div>)
            }
            i++;
        }
        setPipes(pipelineStages)
    }

    const getPipelines = async () => {
        // userData = StorageService.get("userInfo")
        // console.log(userData);

        const url = '/secure/pipelines/620b6ddb28d58c704dba4944'
        const customFieldUrl = '/secure/getCustomFieldsByBelongTo/?belongTo=Deal'
        let temp = await HttpServices.get(url)
        userData = StorageServices.get("userInfo")
        let customFieldsData = []
        setPipelines(temp)

        let temp2 = await HttpServices.get(customFieldUrl)
        setCustomFields(temp2.docs)

        let i = 0
        let pipelineStages = []
        let renderFields = []

        for (let i = 0; i < temp2.docs.length; i++) {
            if (temp2.docs[i].showInDialog == true) {
                customFieldsData.push({ fieldId: temp2.docs[i]._id, value: "" })
            }
        }

        setCustomData(customFieldsData)

        while (i < pipelineStagesNumber) {
            if (i == 0) {
                pipelineStages.push(<div id={i} onClick={(e) => updateStage(e)} className="col border border-dark p-2 bg-success"></div>)
            }
            else {
                pipelineStages.push(<div id={i} onClick={(e) => updateStage(e)} className="col border border-dark p-2"></div>)
            }
            i++;
        }
        setPipes(pipelineStages)
        console.log("comming1");
        console.log(customFields);
    }

    const renderPipelines = (e) => {
        let i = 0
        let temp = e.target.value
        let pipelineStages = []

        setPipelineStagesNumber(temp)


        while (i < temp) {
            if (i == 0) {
                pipelineStages.push(<div id={i} onClick={(e) => updateStage(e, temp)} className="col border border-dark p-2 bg-success"></div>)
            }
            else {
                pipelineStages.push(<div id={i} onClick={(e) => updateStage(e, temp)} className="col border border-dark p-2"></div>)
            }
            i++;
        }
        setPipes(pipelineStages)
    }
    // console.log(customFields);



    const setContact = async (e) => {
        // let contact = e.target.value
        // console.log(e.target.value);
        setContactPerson(e.target.value)
        const url = `/secure/getPeopleInfo/620b6ddb28d58c704dba4944?name=${e.target.value}`
        // console.log(url);
        let temp = await HttpServices.get(url)
        if (e.target.value == "") {
            setContacts([])
        } else {
            setContacts(temp.docs)
        }

        // if(temp.docs)setNewContact(true)
        // else setNewContact(false)

        // if(contacts!==''){
        // if (contacts.length == 0) {

        //     setNewContact(true)
        // }


        // else {
        //     contacts.filter((person) => {
        //         //     {console.log(person.name.toLowerCase())}
        //         //     {console.log(contactPerson.toLowerCase())}
        //         if ((person.name.toLowerCase()).includes(contactPerson.toLowerCase())) {
        //             setNewContact(false)
        //         }
        //         else{
        //             setNewContact(true)
        //         }
        //     })

        // }
        // })
        // }
    }
    // console.log(contacts);



    const organizationList = async (e) => {
        setOrganizationInput(e.target.value)
        const url = `/secure/getOrganizationInfo/620b6ddb28d58c704dba4944?org=${e.target.value}`
        // console.log(url);
        let temp = await HttpServices.get(url)

        if (e.target.value == '') {
            setOrganization([])
        } else {
            setOrganization(temp.docs)
        }
        // if (organization !== null) {
        //     if (organization.length === 0) {
        //         setNewOrganization(true)
        //     }
        //     else {
        //         setNewOrganization(false)
        //     }
        // })
        // }
    }

    const dealTitle = () => {
        let temp = '';
        if (organizationInput !== '') {
            temp = `${organizationInput} deal`
        }
        else {
            temp = ''
        }
        setDealName(temp)
        setShowOrganization(false)
    }

    const setContactField = async(e) => {
        let temp = `/secure/getPeopleInfo/620b6ddb28d58c704dba4944?name=${e.target.outerText}`
        contactFieldData = await HttpServices.get(temp)
        console.log(contactFieldData.docs[0]._id);
        let temp1=contactFieldData.docs[0].organizationIds[0]._id
        console.log(temp1.length);
        // console.log(e.target.outerText)
        setContactPerson(e.target.outerText)
        setPersonValidation(false)
        setOrganizationInput(contactFieldData.docs[0].organizationIds[0].name)
        setPeopleId(contactFieldData.docs[0]._id)
        setTimeout(setShowContacts(false), 1500)
    }
    // console.log(organizationInput)

    const setOrganizationField = (e) => {
        console.log(e.target.outerText);
        setOrganizationInput(e.target.outerText)
        setTimeout(setShowOrganization(false), 1500)
    }
    //     const dealValueEdit = (e) => {

    //         // let temp1=value.substr(index)
    //        let t=value.slice(index, value.length - 1)
    //         console.log(t);

    //         setDealValue(e.target.value)
    //         // let temp=`${dealCurrency}${e.target.value}`
    //         // console.log(temp);
    //         // setDealInputField(e.target.value)
    //     }
    //    const dealAmount = (e) => {
    //         setDealCurrency(e.target.value)
    //        let temp=''
    //     //    let value=dealValue.match(/(\d+)/)
    //         if(dealValue==''){
    //             temp="0.00"
    //         }
    //         else if(dealValue=='' && e.target.value!=''){
    //             temp=`${dealCurrency}0.00`
    //         }
    //         else{
    //             temp=`${e.target.value}${dealValue}`
    //         }
    //         setDealInputField(temp)
    //         // setDealValue('')
    //         // setDealCurrency('')

    //         console.log("infunction:"+dealValue);
    //         console.log("infunction:"+dealCurrency);
    //         // console.log(e.target.value);
    //         // let temp = dealValue?`${dealValue}${e.target.value}`:""
    //         // setDealValue(e.target.value)
    //     }

    const handleCustomdata = (e) => {
        // switch(customFields)
        let fieldId = e.target.id
        let fieldType = e.target.type
        console.log(fieldType)
        switch (fieldType) {
            case 'text':
                setCustomData(
                    customData.map((field) =>
                        field.fieldId == fieldId
                            ? { ...field, value: e.target.value }
                            : field
                    ))
                break;
            case 'textarea':
                setCustomData(
                    customData.map((field) =>
                        field.fieldId == fieldId
                            ? { ...field, value: e.target.value }
                            : field
                    ))
                break;
            case 'date':
                setCustomData(
                    customData.map((field) =>
                        field.fieldId == fieldId
                            ? { ...field, value: `${e.target.value}T18:30:00.000Z` }
                            : field
                    ))
                break;
            case 'select-one':
                setCustomData(
                    customData.map((field) =>
                        field.fieldId == fieldId
                            ? {...field, value: e.target.value}
                            : field
                    ))
                break;
            case 'radio':
                setCustomData(
                    customData.map((field) =>
                        field.fieldId == fieldId
                            ? { ...field, value: e.target.value }
                            : field
                    ))
                break;
        }
        // console.log(customFields);
    }

    const cancelButton = () => {
        setVisibility("private")
        setCurrencyCode("")
        setCustomData("")
        setDealName("")
        setDealValue("0.00")
        setDealInputField("0.00")
        setCloseDate("")
        setOrganizationInput("")
        setContactPerson("")
    }

    const addNewDeal = async () => {
        if(contactPerson){
            let i = 0
        let pipelineStages = []
        companyId = userData.companyId
        owner = userData._id
        // console.log(contactPerson);
        // console.log(organizationInput);
        // console.log(dealName);
        // console.log(dealValue);
        // console.log(pipelineId);
        // console.log(pipelines);
        // console.log(currentStage);
        // console.log(closeDate);
        // console.log(visibility);
        // console.log(customData)
        // console.log(companyId)
        // console.log(currencyCode);

        let postDeal = {
            companyId: companyId,
            currency: currencyCode,
            customData: customData,
            dealTitle: dealName,
            dealValue: dealValue,
            expectedCloseDate: closeDate.toISOString(),
            followers: [userData._id],
            organization: organizationInput,
            organizationFound: true,
            organizationId: contactFieldData.docs[0].organizationIds[0]._id,
            owner: owner,
            peopleFound: peopleFound,
            peopleId: peopleId,
            person: contactPerson,
            pipelineId: pipelineId,
            stageNo: currentStage,
            visible: visibility
        }
        
        console.log(postDeal)

        await HttpServices.post('secure/deal', postDeal)

        setVisibility("private")
        setCurrencyCode("")
        setCustomData("")
        setDealName("")
        setDealValue("0.00")
        setDealInputField("0.00")
        setCloseDate("")
        setOrganizationInput("")
        setContactPerson("")
        setOrganizationFound(false)
        setPeopleFound(false)

        while (i < pipelineStagesNumber) {
            if (i == 0) {
                pipelineStages.push(<div id={i} onClick={(e) => updateStage(e)} className="col border border-dark p-2 bg-success"></div>)
            }
            else {
                pipelineStages.push(<div id={i} onClick={(e) => updateStage(e)} className="col border border-dark p-2"></div>)
            }
            i++;
        }
        setPipes(pipelineStages)
        }
        else{
            setPersonValidation(true)
        }
        
    }

    // console.log(pipelines);
    // console.log(organization);
    // console.log(organizationInput);
    // console.log(contactPerson);
    // console.log(userData);

    return (
        <div>
            <button type="button" className="btn btn-success" onClick={getPipelines} data-bs-toggle="modal" data-bs-target="#exampleModal1">
                Add Deal
            </button>
            {/* {console.log(currencies)} */}
            <div className="modal fade" id="exampleModal1" tabIndex="-1" aria-labelledby="exampleModalLabel1" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel1">Add Deal</h5>
                        </div>
                        <div className="modal-body">
                            <form>
                                {/* {console.log(contacts.length)} */}
                                {/* {console.log(newContact)} */}
                                <Row className="mt-3 ms-2" >
                                    <Col sm={3} className="text-start">Contact Person name</Col>
                                    {/* {newContact ? <Col className="text-start sm-1">New</Col> : ''} */}
                                    {!contacts.length && contactPerson && <Col sm={9} className="text-start text-primary">New</Col>}
                                </Row>
                                <Row className="ms-2 me-5 w-80 ">
                                    <input value={contactPerson} type="text" placeholder="Person" onChange={(e) => setContact(e)} onFocus={() => setShowContacts(true)} 
                                    // onBlur={() => setTimeout(setShowContacts(false), 1500)}
                                    ></input>
                                    {personValidation && <small className='text-danger'>This field cannot be empty</small>}
                                    {/* <i className="bi bi-person-fill"></i> */}
                                    {/* <div class="input-group mb-3">
                                        <span class="input-group-text" id="basic-addon1" style={{backgroundColor:'transparent'}}><i className="bi bi-person-fill"></i></span>
                                        <input type="text" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1"/>
                                    </div> */}
                                    {/* {console.log(contacts.length)} */}
                                    {/* {console.log(contactPerson)} */}
                                    {/* {console.log(showContacts)} */}
                                </Row>
                                <Row>
                                    {showContacts == true ?
                                        <ul style={{ position: "absolute", backgroundColor: "white", zIndex: "999", width: "10rem", marginLeft: "15px" }} type="none">
                                            {contacts ? contacts.map((person) =>
                                                <li className="dropdown-item" value={person.name} onClick={(e) => {setContactField(e);setOrganizationFound(true);setPeopleFound(true)}}> {person.name}</li>
                                            ) : ''}
                                        </ul>
                                        : ''}
                                </Row>
                                {/* {console.log("hagfajk")} */}
                                {!contacts.length && contactPerson && <Col className="text-start">{contactPerson} will be added as a new contact</Col>}
                                <Row className="mt-3 ms-2">
                                    <Col sm={3} className="text-start sm-1">Organization name</Col>
                                    {/* {console.log(organizationFound)} */}
                                    {
                                    // organizationFound==false && 
                                    !organization.length && organizationInput && <Col sm={9} className="text-start text-primary">New</Col>
                                    // :null
                                    }
                                </Row>
                                <Row className="ms-2 me-5 w-80">
                                    <input type="text" placeholder="Organization" value={organizationInput} onChange={(e) => organizationList(e)} onFocus={() => setShowOrganization(true)} 
                                    //  onBlur={setTimeout(dealTitle(),1500)}
                                    ></input>
                                </Row>
                                <Row>
                                    {showOrganization == true ?
                                        <ul style={{ position: "absolute", backgroundColor: "white", zIndex: "999", width: "10rem", marginLeft: "15px" }} type="none">
                                            {organization ? organization.map((current) =>
                                                <li className="dropdown-item" value={current.name} onClick={(e) => setOrganizationField(e)}> {current.name}</li>
                                            ) : ''}
                                        </ul> : ''}
                                </Row>
                                {!organization.length && organizationInput && <Col className="text-start">{organizationInput} will be added as a new organization</Col>}
                                <Row className="mt-3 ms-2">
                                    Deal title
                                </Row>
                                <Row className="ms-2 me-5 w-80">
                                    <input type="text" defaultValue={dealName} onFocus={() => setDealName(`${organizationInput} deal`)}></input>
                                </Row>
                                {/* {console.log(dealInputField)} */}
                                {/* {console.log(dealCurrency)} */}
                                <Row className="mt-3 ms-2">
                                    Deal Value
                                </Row>
                                <Row className="ms-0">
                                    <Col sm="7" align="left" className="ms-0">
                                        <input className="w-100" type="text"
                                            onFocus={() => setDealInputField(dealValue)}
                                            onBlur={() => setDealInputField(dealCurrency + dealValue)}
                                            value={dealInputField}
                                            // value={`${dealCurrency} ${dealValue}`}
                                            onChange={(e) => {
                                                setDealInputField(e.target.value);
                                                setDealValue(e.target.value)
                                            }}
                                        ></input>
                                    </Col>
                                    <Col sm="5" align="left" className="">
                                        <select className="form-select-sm w-75"
                                            onChange={(e) => { setDealInputField(e.target.value + dealValue); setDealCurrency(e.target.value); setCurrencyCode(e.target.selectedOptions[0].id) }}
                                        >
                                            <option>Select currency</option>
                                            {currencies.map((currency) => (
                                                <option value={currency.symbol} id={currency.code}>{currency.name}({currency.code})</option>
                                            ))}
                                        </select>
                                    </Col>
                                </Row>
                                <Row className="mt-3 ms-2">
                                    Pipeline
                                </Row>
                                <Row>
                                    <Col className="text-start ms-2 me-5">
                                        <select className="form-select-sm w-100" onChange={(e) => {
                                            renderPipelines(e);
                                            setPipelineId(e.target.selectedOptions[0].id)
                                            console.log(e);
                                        }}>
                                            {pipelines ? pipelines.docs.map((current) =>
                                            (
                                                <>
                                                    <option value={current.stages.length} id={current._id} >{current.name}</option>
                                                </>
                                            )
                                            ) : null}
                                        </select>
                                    </Col>
                                </Row>
                                <Row className="mt-3 ms-2">
                                    Pipeline Stages
                                </Row>
                                <Row className="ms-2 me-5">
                                    <div className="container">
                                        <div className="row">
                                            {pipes}
                                        </div>
                                    </div>
                                </Row>
                                <Row className="mt-3 ms-0">
                                    <Col sm="6" className="text-start">
                                        Visible to
                                    </Col>
                                    <Col sm="5" className="ms-2">
                                        Expected Close date
                                    </Col>
                                </Row>
                                <Row className="ms-1 mt-2">
                                    <Col className="text-start">
                                        <input type="radio" className="me-2" name="visible_to" id="radio_button" value="private" onChange={(e) => setVisibility(e.target.value)} checked={visibility=="private"?true:false}></input>
                                        <label className="me-3">Owner and followers</label>
                                        <input type="radio" className="me-2" name="visible_to" id="radio_button1" value="shared" onChange={(e) => setVisibility(e.target.value)} checked={visibility=="shared"?true:false}></input>
                                        <label className="me-3">Entire Company</label>
                                    </Col>
                                    <Col>
                                        <input type="date" className="p-0.5" value={closeDate} onChange={(e) => setCloseDate(e.target.value)}></input>
                                    </Col>
                                </Row>
                                {fields}
                                {customFields ? customFields.map((field) => (
                                    <>
                                        {field.showInDialog == true ?
                                            <>
                                                {field.type == "text" ?
                                                    <>
                                                        <Row className="mt-3 ms-2" >
                                                            {field.displayText}
                                                        </Row>
                                                        <Row className="ms-2 me-5 w-80">
                                                            <input type="text" id={field._id} onChange={(e) => handleCustomdata(e)}></input>
                                                        </Row>
                                                    </>
                                                    : ''}
                                                {field.type == "textarea" ?
                                                    <>
                                                        <Row className="mt-3 ms-2">
                                                            {field.displayText}
                                                        </Row>
                                                        <Row className="ms-2 me-5 w-80">
                                                            <textarea rows="3" cols="33" id={field._id} onChange={(e) => handleCustomdata(e)}></textarea>
                                                        </Row>
                                                    </>
                                                    : ''}
                                                {field.type == "number" ?
                                                    <>
                                                        <Row className="mt-3 ms-2" >
                                                            {field.displayText}
                                                        </Row>
                                                        <Row className="ms-2 me-5 w-80">
                                                            <input type="number" id={field._id} onChange={(e) => handleCustomdata(e)}></input>
                                                        </Row>
                                                    </>
                                                    : ''}
                                                {field.type == "currency" ?
                                                    <>
                                                        <Row className="mt-3 ms-2" >
                                                            {field.displayText}
                                                        </Row>
                                                        <Row className="ms-2 me-5 w-80">
                                                            <input type="text" defaultValue={defaultCurrencyValue} id={field._id} onChange={(e) => handleCustomdata(e)}></input>
                                                        </Row>
                                                    </>
                                                    : ''}
                                                {field.type == "date" ?
                                                    <>
                                                        <Row className="mt-3 ms-2">
                                                            {field.displayText}
                                                        </Row>
                                                        <Row className="ms-2 me-5 w-80">
                                                            <input type="date" className='p-0.5' id={field._id} onChange={(e) => handleCustomdata(e)}></input>
                                                        </Row>
                                                    </>
                                                    : ''}
                                                {field.type == "select" ?
                                                    <>
                                                        <Row className="mt-3 ms-2">
                                                            {field.displayText}
                                                        </Row>
                                                        {/* {seperatedOptions=field.options.split(',')} */}
                                                        <Row>
                                                            <Col className="text-start ms-2 me-5">
                                                                <select className="form-select-sm w-100" id={field._id} onChange={(e) => handleCustomdata(e)}>
                                                                    <option>Select</option>
                                                                    {field.options.split(',').map((option, i) => (
                                                                        <option value={field.values.split(',')[i]}>{option}</option>
                                                                    ))}
                                                                </select>
                                                            </Col>
                                                        </Row>
                                                    </>
                                                    : ''}
                                                {field.type == "radio" ?
                                                    <>
                                                        <Row className="mt-3 ms-2">
                                                            {field.displayText}
                                                        </Row>
                                                        <Row className="ms-1 mt-2">
                                                            <Col className="text-start">
                                                                {field.options.split(',').map((option, i) => (
                                                                    <>
                                                                        <input type="radio" className="me-2" name="custom" id={field._id} onChange={(e) => handleCustomdata(e)} value={field.values.split(',')[i]}></input>
                                                                        <label className="me-3">{option}</label>
                                                                    </>
                                                                ))}
                                                            </Col>
                                                        </Row>
                                                    </>
                                                    : ''}
                                            </>
                                            :
                                            null}
                                    </>
                                )) : null}
                            </form>
                        </div>
                        <div className="modal-footer">
                            {/* {contactPerson? */}
                            <button type="submit" className="btn btn-primary" onClick={() => addNewDeal()}>Save</button> 
                            {/* : setPersonValidation(true)} */}
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => cancelButton()}>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddDeal