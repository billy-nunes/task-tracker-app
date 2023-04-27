import {useState} from 'react'
import axios from "axios";

const Register = (props) => {
    const [registerUsername, setRegisterUsername] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");

    const register = () => {
        axios({
          method: "POST",
          data: {
            username: registerUsername,
            password: registerPassword,
          },
          withCredentials: true,
          url: "http://localhost:4000/register",
        }).then((res) => console.log(res));
      };

    return (
            <div className='mn-vh=100 d-flex justify-content-center'>
                <div className="card text-white mb-3" style={{width: '45%'}}>
                    <h3 className='card-header text-center mb-3'>Register</h3>
                    <div className='card-body'>
                        <form>
                            <fieldset>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1" className="form-label mt-4">Username</label>
                                            <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter username" onChange={e => setRegisterUsername(e.target.value)}/>
                                    </div>
                                        
                                    <div className="form-group">
                                        <label htmlFor="exampleInputPassword1" className="form-label mt-4">Password</label>
                                            <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" onChange={e => setRegisterPassword(e.target.value)}/>
                                    </div>
                                    
                                    <div className="d-grid gap-2">
                                        <button type="button"  class="btn btn-lg btn-primary" onClick={register} style={{marginTop: '1rem'}}>Submit</button>
                                        <button type="button"  class="btn btn-link" onClick={() => props.onFormSwitch('login')}>Already have an account? Login</button>
                                    </div>
                            </fieldset>  
                        </form>
                    </div>    
                </div>
            </div>
    )
}

export default Register
