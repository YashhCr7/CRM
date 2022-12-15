import React, { useEffect, useState } from 'react'

let phoneDetailsArr = []
let emailDetailsArr = []


function PersonalDetailsCard({ url, editCard, edit, peopleData, phoneDetails, setPhoneDetails, emailDetails, setEmailDetails, customData, setCustomData, editCardSave }) {

  
    const [removeElements, setRemoveElements] = useState(true)

    useEffect(() => {
        phoneDetailsArr = []
        if (peopleData.phone) {
            if (peopleData.phone.length === 0) {
                setPhoneDetails([{ phone: "", type: "Home" }])
            } else {
                peopleData.phone.map((option, index) => {
                    setPhoneDetails(peopleData.phone)
                })
            }
        }

        emailDetailsArr = []
        if (peopleData.email) {
            if (peopleData.email.length === 0) { setEmailDetails([{  email: "", type: "Home" }]) }

            else {

                peopleData.email.map((option, index) => {
                    setEmailDetails(peopleData.email)
                })
            }
        }
        if (peopleData.customData) {
            if (peopleData.customData.length === 0) {
                setCustomData([{  fieldId: "", value: "" }])
            } else {
                peopleData.phone.map((option, index) => {
                    setCustomData(peopleData.customData)
                })
            }
        }


    }, [peopleData])

    //--------------------------------------------------delete phone detail------------------------------
    function removeContact(e, ind) {
        let phoneDetailsArr = [...phoneDetails]

        setPhoneDetails(() => phoneDetailsArr.filter((option, index) =>

            ind != index
        ))

    }

    //---------------------------------------------------remove email-------------------------------------
    const removeEmail = (e, ind) => {
        let emailDetailsArr = [...emailDetails]

        setEmailDetails(() => emailDetailsArr.filter((option, index) =>

            ind != index
        ))
    }

    //-----------------------------------------------add empty phone details------------------------
    const addPhoneNumber = () => {
        let newArray = [...phoneDetails]
        setPhoneDetails([...phoneDetails, {  phone: "", type: "Home" }])
    }
    //-----------------------------------------------add phone details------------------------------

    const addPhonedetails = (e, index) => {
        let newValues = [...phoneDetails]
        newValues[index].phone = e.target.value
        console.log(newValues);
        setPhoneDetails(newValues)
    }
    //-----------------------------------------------change PhoneType--------------------------------
    const changePhoneType = (e, index) => {
        let newValues = [...phoneDetails]
        newValues[index].type = e.target.value
        console.log(newValues);
        setPhoneDetails(newValues)
    }
    //-------------------------------------------------add custom data-------------------------------
    const writecustomData = (e, index) => {
        let newValues = [...customData]
        newValues[index].value = e.target.value
        console.log(newValues);
        setCustomData(newValues)

    }

    //-----------------------------------------------add empty email details-------------------------

    const addEmail = () => {
        let newArray = [...emailDetails]
        setEmailDetails([...emailDetails, { email: "", type: "Home" }])
    }

    //-------------------------------------------------add email details-----------------------------

    const addEmaildetails = (e, index) => {
        let newValues = [...emailDetails]
        newValues[index].email = e.target.value
        console.log(newValues);
        setEmailDetails(newValues)
    }

   //-------------------------------------------------change email detatils--------------------------
    const changeEmailType = (e, index) => {
        let newValues = [...emailDetails]
        newValues[index].type = e.target.value
        console.log(newValues);
        setEmailDetails(newValues)
    }

   //-----------------------------------------------------jsx----------------------------------------
    return (
        (<div className="row m-0 p-0" >
        
            <div className="card  w-100" style={{ height: "50%" }}>
                <div className="card-body">
                    <p className="title text-muted">PERSON DETAILES
                        {!edit ?
                            (<span className="float-end">
                                <a className='btn btn-default btn-xs' onClick={() => editCard(true)}>
                                    <i className="bi bi-pencil-square"></i>
                                </a>
                            </span>) : ""}
                    </p>
                    <hr />
                    {!edit ? (
                        <div className="card-text">
                            {peopleData ? peopleData.customData ?
                                peopleData.customData.map((option) =>
                                    <p key={option._id}>
                                        <span className="text-muted">
                                            {option.fieldId ? option.fieldId.displayText : ""}
                                        </span>
                                        <a className="ml-1 text-muted">{option.value}</a>
                                    </p>
                                ) : ""
                                : ""
                            }
                            {peopleData ? peopleData.phone.map((option,index) =>
                                <p key={option._id}>
                                    <span className="text-muted">
                                    
                                        <i className="bi bi-telephone-fill"></i>
                                        {option.type}
                                    </span>
                                    <a className="ml-1 text-muted">{option.phone}</a>
                                </p>
                            ) : ""}


                            {peopleData ? peopleData.email.map((option,index) =>
                                <p key={option._id}>
                                    <span className="text-muted">
                                        <i className="bi bi-envelope-fill"></i>
                                        {option.type}
                                    </span>
                                    <a href="mailto:" type="email" className="ml-1 ">{option.email}</a>
                                </p>
                            ) : ""}
                        </div>) :
                        (
                            <>
                                <div className="mb-3">
                                    <div className="container">

                                        {customData.map((option, index) =>
                                            <div className="row" key={index}>
                                                <div className="row">
                                                    <label htmlFor="exampleInputEmail1" className="form-label text-muted">{option.fieldId?option.fieldId.displayText:""}</label>
                                                </div>
                                                {option.fieldId ? option.fieldId.type === "textarea" ?
                                                    <div className="col-sm-12">
                                                        <textarea className="form-control shadow-none  w-100"
                                                            value={option.value}
                                                            onChange={(e) => writecustomData(e, index)}
                                                        >
                                                            {option.value}
                                                        </textarea>
                                                    </div>
                                                    :  option.fieldId.type=="select" ? 
                                                        <div className="col-sm-12">                                                      
                                                        <select className="form-select shadow-none  w-100">
                                                             {  option.fieldId.options.constructor===Array ?
                                                                    
                                                                        option.fieldId.options.constructor.map((option1,index)=>

                                                                            <option value={option.fieldId[index]}>option1</option>
                                                                        )


                                                                
                                                            :(<><option>Select</option>
                                                            <option>{option.fieldId.options}</option></>)}
                                                       </select>
                                                       </div>

                                                    :
                                                    <div className="col-sm--12">
                                                        <input

                                                            type={option.fieldId ? option.fieldId.type : ""}
                                                            className="form-control shadow-none  w-100"
                                                            value={option.value}
                                                            onChange={(e) => writecustomData(e, index)}

                                                        />
                                                    </div> : ""
                                                }
                                            </div>
                                        )}

                                        <div className="row">
                                            <label htmlFor="exampleInputEmail1" className="form-label text-muted">Phone</label>
                                        </div>
                                        {phoneDetails.map((option, index) =>
                                            <div className="row" key={index}>
                                                <div className="col-sm-7">
                                                    <input type="number"
                                                        className="form-control shadow-none  w-100"
                                                        id="exampleInputEmail1"
                                                        aria-describedby="emailHelp"
                                                        value={option.phone}
                                                        onChange={(e) => addPhonedetails(e, index)}
                                                    />
                                                </div>
                                                <div className="col-sm-4">
                                                    <select className="form-select shadow-none w-100" onChange={(e) => changePhoneType(e, index)} defaultValue={option.type}  >
                                                        <option value="Home">Home</option>
                                                        <option value="Mobile">Mobile</option>
                                                        <option value="Other">Other</option>
                                                        <option value="Office">Office</option>
                                                    </select>
                                                </div>
                                                <div className="col-sm-1 mt-2">
                                                    {index >= 1 ?
                                                        <div > <i className="bi bi-trash" onClick={(e) => removeContact(e, index)}></i></div>
                                                        : ""

                                                    }
                                                </div>
                                            </div>
                                        )}
                                        <a href="#" type="link" className="link-primary" onClick={() => addPhoneNumber()}> + add one more</a>
                                    </div>
                                </div>
                                <form>
                                    <div className="mb-3">
                                        <div className="container-fluid">
                                            <div className="row">
                                                <label htmlFor="exampleInputEmail1" className="form-label text-muted">Email address</label>
                                            </div>
                                            {emailDetails.map((option, index) =>
                                                <div className="row" key={index}>
                                                    <div className="col-sm-7">
                                                        <input
                                                            type="email"
                                                            className="form-control shadow-none  w-100"
                                                            id="exampleInputEmail1"
                                                            aria-describedby="emailHelp"
                                                            value={option.email}
                                                            onChange={(e) => addEmaildetails(e, index)}

                                                        />
                                                    </div>
                                                    <div className="col-sm-4">
                                                        <select className="form-select shadow-none w-100" id="exampleFormControlSelect1" onChange={(e) => changeEmailType(e, index)} defaultValue={option.type} >
                                                            <option value="Home">Home</option>
                                                            <option value="Mobile">Mobile</option>
                                                            <option value="Other">Other</option>
                                                            <option value="Office">Office</option>
                                                        </select>
                                                    </div>
                                                    <div className="col-sm-1">
                                                        {index >= 1 ?

                                                            <i className="bi bi-trash" onClick={(e) => removeEmail(e, index)} ></i>
                                                            : ""}
                                                    </div>
                                                </div>
                                            )}
                                            <a href="#" type="link" className="link-primary" onClick={() => addEmail()}> + add one more</a>
                                        </div>
                                    </div>
                                </form>
                                <div className='float-right'><button className="btn btn-outline-secondary" onClick={(e) => editCard(false)}>Cancel</button>
                                    <button className="btn btn-primary ml-1" onClick={() => editCardSave(false)}>Save</button>
                                </div></>)
                    }
                </div>
            </div>
        </div>)
    )
}


export default PersonalDetailsCard