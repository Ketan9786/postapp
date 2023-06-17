import * as React from 'react';
import "../components/Home.css"
import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';


//Modal style
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function Home() {
    const [state, setState] = useState(false);
    const [posts, setPosts] = useState([]);
    const [currentPost, setCurrentPost] = useState("");
 
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [commentOpen,setCommentOpen]= useState(false);
    const handelCommentOpen= ()=> setCommentOpen(true);
    const handelCommentClose=()=> setCommentOpen(false);
    const [commentEditOpen,setCommentEditOpen]= useState(false);
    const handelCommentEditOpen= ()=> setCommentEditOpen(true);
    const handelCommentEditClose=()=> setCommentEditOpen(false);


    //new post text capture handele change 
    const onChange = (e) => {

        setCurrentPost(e.target.value);

    }
    //new post posting in data
    const handelPost = () => {
        setPosts(posts => [...posts, { currentPost }])
        setCurrentPost("")
        setState(true)

    }
    //handel delete post 
    const handelDelete = (e) => {

        posts.splice((e.currentTarget.id - 1), 1);
        setPosts(posts => [...posts])

    }
    // editlogic 
    const handelEditChane = (e) => {
        // console.log(e.target.id)
        posts[e.target.id].currentPost = e.target.value;
        console.log(posts);
    }
    const handelEdit = () => {

        console.log(posts);
        setPosts(posts => [...posts])
        handleClose();

    }


    //comment logic

     const onChangeCommnet = (e) => {

        posts[e.target.id].currentComment = e.target.value;

    }
    //new comment  posting in data
    const handelComment = () => {
        setPosts(posts => [...posts]);
        console.log(posts)
      
        handelCommentClose();
       

    }
    //edit comment logic
    const handelCommentChange = (e) => {
        // console.log(e.target.id)
        posts[e.target.id].currentComment = e.target.value;
        console.log(posts);
    }
    const handelEditComment = () => {

        console.log(posts);
        setPosts(posts => [...posts])
        handelCommentEditClose();

    }


    return (
        <>
            {
                state ? (
                    <>

                        {
                            posts.map((data, i) => {

                                return (
                                    <div className='flex' key={i + 1}>
                                        <h4>Post No :{i + 1}</h4>
                                        <textarea readOnly value={data.currentPost} id={i + 1} />
                                        {/* Edit with modal*/}
                                        <div>
                                            <Button onClick={handleOpen} id={i}>Edit</Button>
                                            <Modal
                                                open={open}
                                                onClose={handleClose}
                                                aria-labelledby="modal-modal-title"
                                                aria-describedby="modal-modal-description"
                                            >
                                                <Box sx={style}>
                                                    <textarea onChange={handelEditChane} id={i} defaultValue={data.currentPost}></textarea>
                                                    <button onClick={handelEdit} >Done</button>
                                                </Box>
                                            </Modal>
                                        </div>
                                        {/*Delete Button*/}
                                        <Button onClick={handelDelete} id={i + 1}>Delete</Button>
                                        {/*Add comment  with modal*/}
                                        <div>
                                            <Button onClick={handelCommentOpen} id={i} >Add Comment</Button>
                                            <Modal
                                                open={commentOpen}
                                                onClose={handelCommentClose}
                                                aria-labelledby="modal-modal-title"
                                                aria-describedby="modal-modal-description"
                                            >
                                                <Box sx={style}>
                                                    <textarea onChange={onChangeCommnet} id={i} defaultValue="" placeholder='Enter Your Comment here'></textarea>
                                                    <button onClick={handelComment} > Done</button>
                                                </Box>
                                            </Modal>
                                        </div>
                                    {/* Comment section */}
                                    <div className='flex'>
                                        <h4>Comments</h4>
                                    
                                        <textarea readOnly value={data.currentComment} id={i + 1} />
                                        </div>

                                        {/*Comment Edit section  */}
                                        <div>
                                            <Button onClick={handelCommentEditOpen} id={i}>Edit</Button>
                                            <Modal
                                                open={commentEditOpen}
                                                onClose={handelCommentEditClose}
                                                aria-labelledby="modal-modal-title"
                                                aria-describedby="modal-modal-description"
                                            >
                                                <Box sx={style}>
                                                    <textarea onChange={handelCommentChange} id={i} defaultValue={data.currentComment}></textarea>
                                                    <button onClick={handelEditComment} >Done</button>
                                                </Box>
                                            </Modal>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </>
                ) : ("")
            }





            <div className='flex'>
                <textarea placeholder='enter post here' onChange={onChange} value={currentPost}></textarea>

                <button onClick={handelPost}>Add Post</button>

            </div>

        </>
    )
}