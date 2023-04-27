import { useState} from 'react';
import axios from "axios";

const Login = (props) => {
    const [loginUsername, setLoginUsername] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const login = () => {
        axios({
          method: "POST",
          data: {
            username: loginUsername,
            password: loginPassword,
          },
          withCredentials: true,
          url: "http://localhost:4000/login",
        }).then((res) => {
          console.log(res);
        });
      };

    return (
        <div className='mn-vh=100 d-flex justify-content-center'>
            <div className="card text-white mb-3" style={{width: '45%'}}>
                <h3 class="card-header text-center mb-3">Login</h3>
                <div className='card-body'>
                    <form>
                        <fieldset>
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1" className="form-label mt-4">Username</label>
                                        <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter username" onChange={e => setLoginUsername(e.target.value)}/>
                                            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                                </div>
                                    
                                <div className="form-group">
                                    <label htmlFor="exampleInputPassword1" className="form-label mt-4">Password</label>
                                        <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" onChange={e => setLoginPassword(e.target.value)}/>
                                </div>
                                
                                <div className="d-grid gap-2">
                                    <button type="button"  class="btn btn-lg btn-primary" onClick={login} style={{marginTop: '1rem'}}>Submit</button>
                                    <button type="button"  class="btn btn-link" onClick={() => props.onFormSwitch('register')}>Don't have an account? Register</button>
                                </div>
                        </fieldset>  
                    </form>
                </div>    
            </div>
        </div>


    )
}

export default Login
