import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import {detailsUser, updateUserProfile} from "../actions/userActions";
import loadingBox from "../components/loadingBox";
import messageBox from "../components/messageBox";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";

export default function profileScreen(){
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [sellerName, setSellerName] = useState('');
    const [sellerLogo, setSellerLog0] = useState('');
    const [sellerDescription, setSellerDescription] = useState('');

    const userSignin = useSelector((state)=> state.userSignin);
    const {userInfo} = userSignin;
    const userDetails = useSelector((state)=> state.userDetails);
    const {loading, error, user} = userDetails;
    const userUpdateProfile = useSelector((state)=> state.userUpdateProfile);

    const{
        success: successUpdate, 
        error: errorUpdate,
        loading: loadingUpdate
    } = userUpdateProfile;
    const dispatch = useDispatch();
    useEffect(()=> {
        if (!user){
            dispatch({type: USER_UPDATE_PROFILE_RESET});
            dispatch(detailsUser(userInfo._ID));
        }
        else{
            setName(user.name);
            setEmail(user.email);
            if(user.seller){
                setSellerName(user.seller.name);
                setSellerLog0(user.seller.logo);
                setSellerDescription(user.seller.description);
            }
        }
    }, [dispatch, userInfo._ID, user]);
    const submitHandler = (e)=>{
        e.preventDefault();
        if (password !== confirmPassword){
            alert('Password and confirm password are not matched.');
        }
        else{
            dispatch(
                updateUserProfile({
                    userID: user._ID,
                    name, 
                    email,
                    password,
                    sellerName,
                    sellerLogo, 
                    sellerDescription,
                })
            )
        }
    };

    return (
        <div>
          <form className="form" onSubmit={submitHandler}>
            <div>
              <h1>User Profile</h1>
            </div>
            {loading ? (
              <loadingBox></loadingBox>
            ) : error ? (
              <messageBox variant="danger">{error}</messageBox>
            ) : (
              <>
                {loadingUpdate && <loadingBox></loadingBox>}
                {errorUpdate && (
                  <messageBox variant="danger">{errorUpdate}</messageBox>
                )}
                {successUpdate && (
                  <messageBox variant="success">
                    Profile Updated Successfully
                  </messageBox>
                )}
                <div>
                  <label htmlFor="name">Name</label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  ></input>
                </div>
                <div>
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  ></input>
                </div>
                <div>
                  <label htmlFor="password">Password</label>
                  <input
                    id="password"
                    type="password"
                    placeholder="Enter password"
                    onChange={(e) => setPassword(e.target.value)}
                  ></input>
                </div>
                <div>
                  <label htmlFor="confirmPassword">confirm Password</label>
                  <input
                    id="confirmPassword"
                    type="password"
                    placeholder="Enter confirm password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  ></input>
                </div>
                {user.isSeller && (
                  <>
                    <h2>Seller</h2>
                    <div>
                      <label htmlFor="sellerName">Seller Name</label>
                      <input
                        id="sellerName"
                        type="text"
                        placeholder="Enter Seller Name"
                        value={sellerName}
                        onChange={(e) => setSellerName(e.target.value)}
                      ></input>
                    </div>
                    <div>
                      <label htmlFor="sellerLogo">Seller Logo</label>
                      <input
                        id="sellerLogo"
                        type="text"
                        placeholder="Enter Seller Logo"
                        value={sellerLogo}
                        onChange={(e) => setSellerLogo(e.target.value)}
                      ></input>
                    </div>
                    <div>
                      <label htmlFor="sellerDescription">Seller Description</label>
                      <input
                        id="sellerDescription"
                        type="text"
                        placeholder="Enter Seller Description"
                        value={sellerDescription}
                        onChange={(e) => setSellerDescription(e.target.value)}
                      ></input>
                    </div>
                  </>
                )}
                <div>
                  <label />
                  <button className="primary" type="submit">
                    Update
                  </button>
                </div>
              </>
            )}
          </form>
        </div>
      );
    }
    