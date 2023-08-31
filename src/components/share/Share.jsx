import '@/components/share/share.css';
import { PermMedia, Label, Room, EmojiEmotions } from '@mui/icons-material';
import {useContext, useRef, useState} from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import axios from 'axios';
import { Cancel } from '@mui/icons-material';

export default function Share({ setPosts }) {

  const { user } = useContext(AuthContext)
  const desc = useRef();
  const [file, setFile] = useState(null);
  const [shareDisabled, setShareDisabled] = useState(true);

  //handle input change
  const handleChange = (e) => {
    e.target.value === ''
      ? setShareDisabled(true)
      : setShareDisabled(false);
  }

  //handle submit
  const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      desc: desc.current.value,
    };

    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("file", file);      //req.body.file
      data.append("name", fileName);  //req.body.name

      //upload image file to server
      try {
        const res = await axios.post('http://localhost:5000/api/upload', data);
        newPost.img = res.data.fileName;
      }
      catch (err) {
        console.log(err);
      }
    }

    //store new post in db
    try {
      const res = await axios.post('http://localhost:5000/api/posts', newPost,
        { headers: { authorization: 'Bearer ' + user.accessToken } });

      setPosts(prev => [res.data, ...prev]);
      setFile(null);
      desc.current.value = '';
    }
    catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img className="shareProfileImg" 
            src={user.profilePicture ? user.profilePicture : "/assets/person/noAvatar.png"} />
          <input ref={desc} 
            placeholder={`What's in your mind ${user.username}?`} 
            className="shareInput"
            onChange={handleChange} 
          />
        </div>
        <hr className="shareHr" />

        {file && (
          <div className="shareImgContainer">
            <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
            <Cancel className="shareCancelImg" onClick={()=>setFile(null)} />
          </div>
        )}

        <form className="shareBottom" onSubmit={submitHandler}>
          <div className="shareOptions">

            <label htmlFor="file" className="shareOption">
              <PermMedia htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Photo</span>
              <input style={{display:"none"}} type="file" id="file" name="file" accept="image/*" 
                onChange={(e) => setFile(e.target.files[0])} />
            </label>
            
            <div className="shareOption">
              <Label htmlColor="blue" className="shareIcon" />
              <span className="shareOptionText">Tag</span>
            </div>
            
            <div className="shareOption">
              <Room htmlColor="green" className="shareIcon" />
              <span className="shareOptionText">Location</span>
            </div>
            
            <div className="shareOption">
              <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
              <span className="shareOptionText">Feelings</span>
            </div>
          </div>
          <button type="submit" className="shareButton" disabled={shareDisabled}>Share</button>
        </form>
      </div>
    </div>
  );
}
