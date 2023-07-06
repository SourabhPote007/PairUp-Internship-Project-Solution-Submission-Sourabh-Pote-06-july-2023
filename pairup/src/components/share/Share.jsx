import { EmojiEmotions, Label, PermMedia, Room } from '@mui/icons-material'
import './share.css'
import { useContext, useRef, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios';
import { Form } from 'react-router-dom';

export default function Share() {
    const {user} = useContext(AuthContext);
    const PublicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
    const desc = useRef();
    const [file, setFile] = useState(null);
    
    const submitHandler = async (e) => {
        e.preventDefault();
        const newPost = {
            userId : user._id,
            desc : desc.current.value
        }
        if(file){
            const data = new FormData();
            const fileName = Date.now() + file.name;
            data.append("file","file");
            data.append("name",fileName);
            newPost.img = fileName;
            try {
                await axios.post("/upload", data);
            } catch (error) {
                console.log(error);
            }
        }
        try {
            await axios.post("/posts", newPost);
            window.location.reload();
        } catch (error) {
            
        }
    }
  return (
    <div className="share">
        <div className="shareWrapper">
            <div className="shareTop">
                <img className="shareProfileImg" src={user.profilePicture} alt="" />
                <input placeholder="What's in your mind?" className="shareInput" ref={desc}  />
            </div>
            <hr className="shareHr" />
            <from onSubmit={submitHandler} className="shareBottom">
                <label htmlFor="file" className="shareOptions">
                    <div className="shareOption">
                        <PermMedia htmlColor="tomato" className="shareIcon" />
                        <span className="shareOptionText" style={{whiteSpace:"nowrap"}}>Photo or video</span>
                        <input type="file" style={{display:"none"}} id="file" accept='.png,.jpeg,.jpg' onChange={(e)=>setFile(e.target.files[0])} />
                    </div>

                    <div className="shareOption">
                        <Label htmlColor="blue" className="shareIcon" />
                        <span className="shareOptionText">Tag</span>
                    </div>

                    <div className="shareOption">
                        <Room htmlColor="green" className="shareIcon" />
                        <span className="shareOptionText">Location</span>
                    </div>

                    <div className="shareOption">
                        <EmojiEmotions htmlColor="tomato" className="shareIcon" />
                        <span className="shareOptionText">Feelings</span>
                    </div>
                </label>

                <button className="shareButton" type="submit">Share</button>
            </from>
        </div>
    </div>
  )
}
