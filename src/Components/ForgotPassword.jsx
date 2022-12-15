import react, { useState } from 'react'
import '../Styles/ForgotPassword.css'
import Logo from '../Images/Logo.jpeg'
import httpServices from '../Services/HttpServices'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTriangleExclamation,faCheck} from '@fortawesome/free-solid-svg-icons'
toast.configure()

function ForgotPassword()
{

    let [Email,setEmail] = useState('')
    const regex =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    let icon = <FontAwesomeIcon icon={faTriangleExclamation} size="lg"/>
    
    const SendMail = async() =>
    {
        try 
        {
            if(Email === '' || regex.test(Email)=== false)
            {
                // notify()
                let msg = <p style={{fontSize:15}}>Error ! <br/> Enter your email </p>
                toast.error(msg ,
                { position: toast.POSITION.TOP_RIGHT, autoClose: 3000 , theme: "colored",icon:icon})
            }
            else
            {
                let data = await httpServices.post('sendForgotLink',{email:Email})
                let Sicon = <FontAwesomeIcon icon={faCheck} size="lg"/>
                let msg = <p style={{fontSize:15}}>Success ! <br/> An Email with reset password instructions has been sent. </p>
                toast.success(msg ,
                    { position: toast.POSITION.TOP_RIGHT, autoClose: 3000 , theme: "colored",icon:Sicon})
                
                console.log(data);
            }
            
        }
        catch (err) {
            
                let msg = <p style={{fontSize:15}}>Error ! <br/> Email does not exists , Please <br/> Enter correct email address ! </p>
                toast.error(msg ,
                    { position: toast.POSITION.TOP_RIGHT, autoClose: 3000 , theme: "colored",icon:icon})
                
                console.log(`Error: ${err.message}`);
        }
    }


    return (
        <div className="container h-100">
    		<div className="row h-100">
				<div className="col-sm-10 col-md-8 col-lg-6 mx-auto d-table h-100 mt-5">
						<div className="card" >
								<div className="m-sm-4">
									<form>
                                        <img className="img-fluid mt-2" style={{height:"90px",marginTop:"20px"}}  src={Logo} />   
                                        <div className='row'>
                                            <span className='col-2'></span>
                                            <div className="col-8">
                                                <input className="form-control mt-4 email" type="email" name="email" onChange={(e)=>setEmail(e.target.value)} placeholder="Enter your email"/>
                                            </div>

                                            <div className="text-center mt-4">
                                                <a className="btn btn-primary col-4" style={{color:"white"}} onClick={()=>SendMail()}>Reset password</a>
                                            </div>
                                        </div>
									</form>
								</div>
						</div>
				</div>
			</div>
		</div>
    );
}
  
  export default ForgotPassword;
