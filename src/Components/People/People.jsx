import React, { useState, useEffect } from 'react'
import HttpServices from '../../Services/HttpServices'
import 'bootstrap/dist/css/bootstrap.css';
import {Row} from 'react-bootstrap'
import {Col} from 'react-bootstrap'

let allFirstLetters = []
let firstLetters = []
let phoneFieldDefault = ''
let phoneFields = ''
let emailFieldDefault = ''
let emailFields = ''

function People() {

    const [displayAlphabets, setDisplayAlphabets] = useState()
    const [peopleSelection, setPeopleSelection] = useState("All")
    const [renderPeople, setRenderPeople] = useState()
    const [customFields, setCustomFields] = useState()
    const [phoneField, setPhoneField] = useState([])
    const [emailField, setEmailField] = useState([])
    const [personName, setPersonName] = useState('')
    const [organization, setOrganization] = useState('')
    const [visibility, setVisibility] = useState("private")
    const [customData,setCustomData] = useState([])
    const [organizationInput, setOrganizationInput] = useState('')
    const [showOrganization, setShowOrganization] = useState(true)
    const [organizationFound, setOrganizationFound] = useState(true)
    const [organizationId, setOrganizationId] = useState('')
    const [ownerId, setOwnerId] = useState()
    const [emailValidation,setEmailValidation] = useState(true)



    // phoneFields =
    //         <Row className="ms-2 mb-2 w-100" id={new Date().getTime()}>
    //             <Col>
    //                 <input type="text" className='w-100'></input>
    //             </Col>
    //             <Col className="mr-3">
    //                 <select className="form-select-sm w-75 p-1">
    //                     <option>Office</option>
    //                     <option>Home</option>
    //                     <option>Mobile</option>
    //                     <option>Other</option>
    //                 </select>
    //                 <i class="ml-4 bi bi-trash3-fill" onClick={(e)=>removeField(e.target.id)}></i>
    //             </Col>
    //         </Row>
       
    useEffect(async () => {
        let alpha = await HttpServices.get('secure/getFilterByPeople')
        let people = await HttpServices.get(`secure/people?initial=${peopleSelection}`)
        let customFieldsData = await HttpServices.get('secure/getCustomFieldsByBelongTo/?belongTo=People')
        setRenderPeople(people.docs)
        setCustomFields(customFieldsData.docs)
        setOwnerId(alpha.docs[0].ownerId)
        // setCustomData()

        for (let i = 0; i < alpha.docs.length; i++) {
            allFirstLetters.push(alpha.docs[i].nameSubstring)
        }

        let j = 0;
        for (let i = 0; i < allFirstLetters.length - 1; i++)
            if (allFirstLetters[i] != allFirstLetters[i + 1])
                firstLetters[j++] = allFirstLetters[i];
        firstLetters[j++] = allFirstLetters[allFirstLetters.length - 1];

        // Modify original array
        for (let i = 0; i < j; i++) {
            allFirstLetters[i] = firstLetters[i];
        }
        setDisplayAlphabets(firstLetters)
        setPhoneField([{phone:"",type:"Office"}])
        setEmailField([{email:"",type:"Office"}])
        // console.log(displayAlphabets)
    }, [])

    const renderPeopleByFilter = async (letter) => {
        // console.log(letter);
        let people = await HttpServices.get(`secure/people?initial=${letter}`)
        setRenderPeople(people.docs)
    }

    const addPhoneField = (e) => {
        setPhoneField([...phoneField,{phone:"",type:"Office"}])
    }

    const addEmailField = () => {
        setEmailField([...emailField,{email:"",type:"Office"}])
    }

    const removePhoneField = (ind) => {
        // console.log(ind);
        let temp = [...phoneField]
        let temp1 = phoneField.filter((option,index)=>index!=ind)
        // console.log(temp1);
        setPhoneField(temp1)
    }

    const removeEmailField = (ind) => {
        // console.log(ind);
        let temp = [...emailField]
        let temp1 = emailField.filter((option,index)=>index!=ind)
        // console.log(temp1);
        setEmailField(temp1)
    }

    const handleCustomdata = (e) => {
        // switch(customFields)
        let fieldId = e.target.id
        let fieldType = e.target.type
        let temp = {fieldId:e.target.id,value:e.target.value}
        // console.log(temp)
        // customData.map((field)=>customData.push(
        //     field.id==fieldId?{...field,value:e.target.value}:{...field,field:fieldId,value:e.target.value}))

        let temp2 = [...customData]
        if(temp2.filter(field=>field.fieldId==fieldId).length==0){
            console.log("Pushed new")
            temp2.push(temp)
        }else{
            console.log(e.target.value)
            temp2 = [...temp2.map((field)=>
                        field.fieldId == fieldId
                            ? {...field, value: e.target.value}
                            : field
                    )]
        }
        console.log(temp2);
        setCustomData([...temp2])
        // customData.push(temp)
        // switch (fieldType) {
        //     case 'text':
        //         setCustomData(
        //             customData.map((field) =>
        //                 field.fieldId == fieldId
        //                     ? { ...field, value: e.target.value }
        //                     : field
        //             ))
        //         break;
        //     case 'textarea':
        //         setCustomData(
        //             customData.map((field) =>
        //                 field.fieldId == fieldId
        //                     ? { ...field, value: e.target.value }
        //                     : field
        //             ))
        //         break;
        //     case 'date':
        //         setCustomData(
        //             customData.map((field) =>
        //                 field.fieldId == fieldId
        //                     ? { ...field, value: `${e.target.value}T18:30:00.000Z` }
        //                     : field
        //             ))
        //         break;
        //     case 'select-one':
        //         setCustomData(
        //             customData.map((field) =>
        //                 field.fieldId == fieldId
        //                     ? {...field, value: e.target.value}
        //                     : field
        //             ))
        //         break;
        //     case 'radio':
        //         setCustomData(
        //             customData.map((field) =>
        //                 field.fieldId == fieldId
        //                     ? { ...field, value: e.target.value }
        //                     : field
        //             ))
        //         break;
        // }
        // console.log(customFields);
    }

    const storePhoneData = (e) => {
        let temp = [...phoneField]
        temp=[...temp.map((field,index) =>
            e.target.id == index
                ? { ...field, phone: e.target.value }
                : field
        )]
        setPhoneField(temp)
        // console.log(e.target.value);
        // console.log(e.target.id);
    }

    const storePhoneType = (e) => {
        let temp = [...phoneField]
        temp=[...temp.map((field,index) =>
            e.target.id == index
                ? { ...field, type: e.target.value }
                : field
        )]
        setPhoneField(temp)
        // console.log(e.target.value);
        // console.log(e.target.id);
    }

    const storeEmailData = (e) => {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e.target.value)){
            // console.log("Valid email");
            setEmailValidation(true)
            let temp = [...emailField]
            temp=[...temp.map((field,index) =>
                e.target.id == index
                    ? { ...field, email: e.target.value }
                    : field
            )]
            setEmailField(temp)
        }else{
            // console.log("Invalid email");
            setEmailValidation(false)
        }
        
       
        // console.log(e.target.value);
        // console.log(e.target.id);
    }

    const storeEmailType = (e) => {
        let temp = [...emailField]
        temp=[...temp.map((field,index) =>
            e.target.id == index
                ? { ...field, type: e.target.value }
                : field
        )]
        setEmailField(temp)
        // console.log(e.target.value);
        // console.log(e.target.id);
    }

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
        // console.log(temp.docs);
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

    const setOrganizationField = async (e) => {
        console.log(e.target.outerText);
        setOrganizationInput(e.target.outerText)
        let temp = await HttpServices.get(`/secure/getOrganizationInfo/620b6ddb28d58c704dba4944?org=${e.target.outerText}`)
        setOrganizationId(temp.docs[0]._id)
        setTimeout(setShowOrganization(false), 1500)
        console.log(temp.docs);
    }

    const cancelButton = async () => {
        setPhoneField([{phone:"",type:"Office"}])
        setEmailField([{email:"",type:"Office"}])
        setVisibility("private")
        setCustomData("")
        setOrganizationInput("")
        setPersonName("")
        setCustomData(customData.map((field)=> ({fieldId:"",value:""})))
    }

    const addNewPerson = async () => {
        let createdAt = new Date()

        let postPerson = {
            companyId:renderPeople[0].companyId,
            customData:customData,
            email:emailField,
            followers:[ownerId],
            name:personName,
            organization:organizationInput,
            organizationFound:organizationFound,
            organizationIds:[organizationId],
            ownerId:ownerId,
            phone:phoneField,
            visible:visibility
        }
        // console.log(personName);
        // console.log(organization);
        // console.log(visibility);
        // console.log(renderPeople[0].companyId)
        // console.log(createdAt.toISOString())
        // console.log(customData)
        // console.log(phoneField)
        // console.log(emailField)
        // console.log(organizationFound);
        // console.log(organizationId);
        // console.log(visibility);
        // console.log(postPerson);
        await HttpServices.post('secure/people', postPerson)
        setVisibility("private")
        setCustomData("")
        setOrganizationInput("")
        setPersonName("")
        setPhoneField([{phone:"",type:"Office"}])
        setEmailField([{email:"",type:"Office"}])
    }
    console.log(customData);
    // console.log(renderPeople);
    // console.log(peopleSelection);
    
    return (
        <div className="m-3">
            <div className='row mb-4'>
                <h3 className='col-md-11'>People</h3>
                <button type="button" className="btn btn-success btn-sm col-md-1" data-bs-toggle="modal" data-bs-target="#exampleModal1">
                    Add
                </button>
            </div>
            <div className="btn-toolbar mb-3" role="toolbar" aria-label="Toolbar with button groups">
                <div className="btn-group me-2" role="group" aria-label="First group">
                    <button type="button" className="btn btn-outline-secondary" onClick={() => renderPeopleByFilter("All")}>All</button>
                    {displayAlphabets ? displayAlphabets.map((letter) =>
                        <button type="button" className="btn btn-outline-secondary" value={letter} onClick={(e) => renderPeopleByFilter(e.target.value)} >{letter}</button>
                    ) : ""}
                </div>
            </div>
            <table className='p-2 border solid 2px w-100'>
                <thead>
                    <tr className='p-2 border solid 2px'>
                        <th className='p-2 border solid 2px'>Name</th>
                        <th className='p-2 border solid 2px'>Phone</th>
                        <th className='p-2 border solid 2px'>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {renderPeople ? renderPeople.map((person, index) =>
                        <tr style={{ fontFamily: "Times New roman" }}>
                            <th className='p-2 border solid 2px'>{person.name}</th>
                            <th className='p-2 border solid 2px'>{person.phone.length > 0 ? `${person.phone[0].phone}(${person.phone[0].type})` : "--"}</th>
                            <th className='p-2 border solid 2px'>{person.email.length > 0 ? `${person.email[0].email}(${person.email[0].type})` : "--"}</th>
                        </tr>
                    ) : ""}
                </tbody>
            </table>
            <div className="modal fade" id="exampleModal1" tabIndex="-1" aria-labelledby="exampleModalLabel1" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel1">Add new person</h5>
                        </div>
                        <div className="modal-body">
                            <form>
                                <Row className="mt-3 ms-1" >
                                    <Col className="text-start">Name</Col>
                                </Row>
                                <Row className="ms-3 me-5 w-80 ">
                                    <input type="text" placeholder="Enter name" value={personName} onChange={(e)=>setPersonName(e.target.value)}></input>
                                </Row>
                                {/* <Row>
                                    {showContacts == true ?
                                        <ul style={{ position: "absolute", backgroundColor: "white", zIndex: "999", width: "10rem", marginLeft: "15px" }} type="none">
                                            {contacts ? contacts.map((person) =>
                                                <li className="dropdown-item" value={person.name} onClick={(e) => {setContactField(e);setOrganizationFound(true);setPeopleFound(true)}}> {person.name}</li>
                                            ) : ''}
                                        </ul>
                                        : ''}
                                </Row> */}
                                <Row className="mt-3 ms-1" >
                                    <Col className="text-start">Phone</Col>
                                </Row>
                                {/* <Row className="ms-2 mb-2 w-100">
                                    <Col>
                                        <input type="text" className='w-100' id={0} onChange={(e)=>storePhoneData(e)}></input>
                                    </Col>
                                    <Col className="mr-3">
                                        <select className="form-select-sm w-75 p-1">
                                            <option value="Office">Office</option>
                                            <option value="Home">Home</option>
                                            <option value="Mobile">Mobile</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </Col>
                                </Row> */}
                                {/* {phoneField?phoneField:null} */}
                                {phoneField?phoneField.map((field,index)=>
                                     <Row className="ms-2 mb-2 w-100" key={index}>
                                     <Col>
                                        <input type="text" className='w-100' id={index} onChange={(e)=>storePhoneData(e)} value={field.phone}></input>
                                     </Col>
                                     <Col className="mr-3">
                                         <select className="form-select-sm w-75 p-1" id={index} onChange={(e)=>storePhoneType(e)}>
                                            <option value="Office">Office</option>
                                            <option value="Home">Home</option>
                                            <option value="Mobile">Mobile</option>
                                            <option value="Other">Other</option>
                                         </select>
                                         {/* {console.log(e.target.id)} */}
                                         {index>0?
                                         <i className="ml-4 bi bi-trash3-fill" 
                                        //  id={new Date().getTime()} 
                                         onClick={()=>removePhoneField(index)}></i>:null}
                                     </Col>
                                 </Row> ):null}
                                <Row className=" ms-2">
                                    <Col  
                                    // className="text-primary"
                                    >
                                    <a onClick={(e) => addPhoneField(e)}>+add one more</a>
                                    </Col>
                                </Row>
                                <Row className="mt-3 ms-1" >
                                    <Col className="text-start">Email</Col>
                                </Row>
                                {/* <Row className="ms-2 mb-2 w-100">
                                    <Col>
                                        <input type="text" className='w-100'></input>
                                    </Col>
                                    <Col className="mr-3">
                                        <select className="form-select-sm w-75 p-1">
                                            <option>Office</option>
                                            <option>Home</option>
                                            <option>Mobile</option>
                                            <option>Other</option>
                                        </select>
                                    </Col>
                                </Row> */}
                                {emailField?emailField.map((field,index)=>
                                <Row className="ms-2 mb-2 w-100" key={index}>
                                    <Col>
                                        <input type="text" className='w-100' id={index} onChange={(e)=>storeEmailData(e)} onBlur={()=>setEmailValidation(true)}></input>
                                    </Col>
                                    <Col className="mr-3">
                                        <select className="form-select-sm w-75 p-1" id={index} onChange={(e)=>storeEmailType(e)}>
                                            <option value="Office">Office</option>
                                            <option value="Home">Home</option>
                                            <option value="Other">Other</option>
                                        </select>
                                        {/* {console.log(e.target.id)} */}
                                        {index>0?<i className="ml-4 bi bi-trash3-fill" onClick={() => removeEmailField(index)}></i>:null}
                                    </Col>
                                </Row>):null}
                                {!emailValidation &&
                                    <Row className="ms-2">
                                        <Col className="text-danger">Invalid Email</Col>
                                    </Row>
                                }
                                <Row className=" ms-2">
                                    <Col
                                    // className="text-primary"
                                    >
                                    <a onClick={() => addEmailField()}>+add one more</a>
                                    </Col>
                                </Row>
                                <Row className="mt-3 ms-2">
                                    <Col sm={3} className="text-start sm-1">Organization</Col>
                                    {
                                    // organizationFound==false && 
                                    !organization.length && organizationInput && <Col sm={9} className="text-start text-primary">New</Col>
                                    // :null
                                    }
                                </Row>
                                <Row className="ms-3 me-5 w-80 ">
                                    {/* <input type="text" placeholder="Organization" value={organization} onChange={(e)=>setOrganization(e.target.value)}></input> */}
                                    <input type="text" placeholder="Organization" value={organizationInput} onChange={(e) => organizationList(e)} onFocus={() => setShowOrganization(true)}></input>
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
                                <Row className="mt-3 ms-3">
                                    Owner
                                </Row>
                                <Row className="ms-3 me-5">
                                    <select className="form-select-sm">
                                        <option>Yash Sharma</option>
                                    </select>
                                </Row>
                                <Row className="mt-3 ms-0">
                                    <Col sm="6" className="text-start">
                                        Visible to
                                    </Col>
                                </Row>
                                <Row className="ms-1 mt-2">
                                <Col className="text-start">
                                        <input type="radio" className="me-2" name="visible_to" id="radio_button" value="private" onChange={(e) => setVisibility(e.target.value)} checked={visibility=="private"?true:false}></input>
                                        <label className="me-3">Owner and followers</label>
                                        <input type="radio" className="me-2" name="visible_to" id="radio_button1" value="shared" onChange={(e) => setVisibility(e.target.value)} checked={visibility=="shared"?true:false}></input>
                                        <label className="me-3">Entire Company</label>
                                    </Col>
                                </Row>
                                {/* {console.log(customFields)} */}
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
                                                            <input type="text"
                                                                // defaultValue={defaultCurrencyValue} 
                                                                id={field._id} onChange={(e) => handleCustomdata(e)}></input>
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

                            <button type="submit" className="btn btn-primary"
                            onClick={() => addNewPerson()}
                            >Save</button>

                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal"
                            onClick={() => cancelButton()}
                            >Cancel</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default People