import React from 'react'
import { Outlet,Link } from 'react-router-dom'
import './Login.css'
export default function Login() {
  return (
     <>
       <div className='LoginDiv'>
          <div className='login'>
          <div className='cross'><Link to='/'><h2>&#10060;</h2></Link></div>           
             <h1>Log In</h1>
             <h5>Please enter your <a id="internet" href='#'>Internet Archieve</a> email and password to access your Open Library Account</h5>
              <form>
                 <table className='loginTable'>
                    <thead>
                            <tr>
                                <td>Email--<a href='#'> Forgot your Interent Archieve email</a></td>
                            </tr>
                            <tr>
                                <td><input className='tabInp' placeholder='Email'></input></td>
                            </tr>
                            <tr>
                                <td>Password</td>
                            </tr>
                            <tr>
                                <td><input className='tabInp' placeholder='Password'></input></td>
                            </tr>
                            <tr>
                                <td><input type='checkbox'></input>Remember me</td>
                            </tr>
                            <tr>
                                <td><button>Log in</button></td>
                            </tr>
                            <tr>
                                <td><a href='#'>Forgot your password?</a></td>
                            </tr>
                            <tr>
                                <td id='member'>Not a member of open library? <a href='#'>Sign up now</a></td>
                            </tr>
                    </thead>
                 </table>
              </form>
          </div>
          <Outlet/>
       </div>
     </>
  )
}
