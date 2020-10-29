import React, {useState,useEffect} from 'react';
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card/Card";
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { red } from '@material-ui/core/colors';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ShareIcon from '@material-ui/icons/Share';
import CommentIcon from '@material-ui/icons/Comment';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import InputBase from '@material-ui/core/InputBase';
import 'font-awesome/css/font-awesome.min.css';
import './styles.css';
import axios from "axios";


const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(3),
    },
    input: {
        display: 'none',
    },
    imageChangeButton: {
        marginTop: 20,
        marginLeft: 130
    },
    avatar: {
        backgroundColor: red[500],
    },
    button: {
        backgroundColor: 'white',
        borderRadius: '25px',
        marginRight: '10px'
    },
    title: {
        flexGrow: 1,
        display: 'none',
        paddingRight: '10px',
        [theme.breakpoints.up('sm')]: {
          display: 'block',
        },
      },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: 'white',
        '&:hover': {
          backgroundColor: 'white',
        },
        marginLeft: 0,
        float: 'right',
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(1),
          width: 'auto',
        },
      },
}));

const MasterForm = () => {

    const classes = useStyles();
    const [imagePreview, setImagePreview] = useState(null);
    const [imagePreview1, setImagePreview1] = useState(null);
    const [imageName, setImageName] = useState("");
    const [img,setImg] = useState();
    const [description,setDescription] = useState([]);
    const [description1,setDescription1] = useState([]);
    const [addpost,setAddpost] = useState(0);
    const [like,setLike] = useState(0);
    const [check, setcheck] = useState([]);
    const [cards,setcards] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [url,setUrl] = useState();
    const [length,setLength] = useState();
   

    const Uploadpost = (formData) => {
        axios.post(`https://localhost:8090/upload`,formData)
        .then(function(response){
            alert("Successfully submitted");
        })
    }

    const UploadImage = () => {
        const formData = new FormData();
          formData.append("imageFile", selectedFiles[0]);
          alert(selectedFiles[0]);
          alert(formData);
          console.log(selectedFiles);
        axios({
          method: "post",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          data: formData,
          url: "http://localhost:8090/image/upload",
        })
          .then((resp) => {
            alert("success===--->" + resp.data);
            setSelectedFiles([]);
          })
          .catch((err) => {
            alert("Not success");
            console.error(err);
          });
      };

    const handleUploadClick = (event) => {
        
        let file = event.target.files[0];
        setSelectedFiles((selectedFiles) => [
            ...selectedFiles,
            file,
          ]);
        setImagePreview(URL.createObjectURL(file));
        setAddpost(1);
    };
    const uploadImageWithAdditionalData = () => {
        setImg(1);
        setAddpost(0);
        setImageName("");
        setImagePreview1(imagePreview);
        setDescription1(description);
    };

    const handleChange = event => {
        setImageName(event.target.value);
        setDescription(event.target.value);
    };

    
    const getAll = () => {
        axios.get(`http://localhost:8090/image/getall`)
        .then(function(response){
            setLength(response.data);
            alert(response.data.length);
            console.log("-->"+response);
        })
        
    }

    useEffect(() => {
        getAll();
		retrieveUsers();
      }, [1]);

      const retrieveUsers = () => {
          for(var i=1;1<=length;i++){
		axios.get(`http://localhost:8090/image/get`+{i})
		  .then(response => {
            setcards(response.data);
			console.log(response.data)
		  })
		  .catch(e => {
			console.log(e);
          });
        }
	  };
      

    return (
        <div className="container">
            <div >
            <AppBar  className="bg-dark">
            <Toolbar className="d-flex ">
            <Typography className={classes.title} variant="h6" noWrap>
                Z
            </Typography>
            <div className={classes.search}>
                <InputBase
                placeholder="Search…"
                classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
                />
            </div>
            </Toolbar>
        </AppBar>
            </div>
            <Grid container  spacing={2} className="d-flex justify-content-center mt-3">
                <Grid item xs={12} lg={6}>
                    <Card>
                    <CardHeader
                    style={{backgroundColor:"#eeeeee"}}
                        avatar={
                        <Avatar aria-label="recipe" className={classes.avatar}>
                            A
                        </Avatar>
                        }
                        action={
                        <div>
                        <Button
                            variant="contained"
                            component="label"
                            className={classes.button}
                            >
                            <i className="fa fa-picture-o" aria-hidden="true"></i>{' '}Add
                            <input
                                className={classes.input}
                                id="upload-profile-image"
                                type="file"
                                onChange={handleUploadClick}
                            />
                        </Button>
                        <Button
                        variant="contained"
                        type="submit"
                        className={classes.button}
                        // onClick={() => uploadImageWithAdditionalData()}
                        onClick={UploadImage}
                        >Post
                        </Button>
                        </div>
                        }
                        title={
                            <div><b>Angelina John</b></div>
                        }
                        subheader="Passionate Hair Stylist"
                        />     
                <Card>{
                    addpost===1&&
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                image={imagePreview }
                            />
                        </CardActionArea>
}
                    </Card>
                    <TextField
                        fullWidth
                        margin="dense"
                        name="name"
                        onChange={handleChange}
                        required
                        value={imageName}
                        variant="outlined"
                        placeholder="Hey! Try something here"
                        // style={{border: 'none'}}
                    />
                    </Card>
                    
                    {img===1?
                    <Card className="mt-5">
                        <CardHeader
                            avatar={
                            <Avatar aria-label="recipe" className={classes.avatar}>
                                A
                            </Avatar>
                            }
                            title={
                                <div><b>Angelina John</b></div>
                            }
                            subheader={
                                <div>
                                <span>Passionate Hair Stylist</span>
                                <span style={{float:"right"}}>Just Now</span>
                                </div>
                            }
                        />
                        <Typography className="ml-1">
                            {description1}
                        </Typography>
                            <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        image={
                                            imagePreview1 }
                                    />
                                </CardActionArea>
                            <CardActions className={classes.actions}>
                            <IconButton aria-label="Add to favorites">
                                <FavoriteBorderIcon onClick={() => setLike(like + 1)} />
                            </IconButton>
                            <IconButton aria-label="Share">
                                <ShareIcon />
                            </IconButton>
                            <IconButton aria-label="Share">
                                <CommentIcon />
                            </IconButton>
                            <Typography><span>{like}</span>Likes,</Typography>
                            <Typography>0 Comments</Typography>
                            </CardActions>
                        </Card>:<h5 style={{textAlign:"center"}}>
                            Sorry! No stories are available</h5>}
                </Grid>
                {cards.map((posts, index) => (
                <Card className="mt-5" key={index}>
                        <CardHeader
                            avatar={
                            <Avatar aria-label="recipe" className={classes.avatar}>
                                A
                            </Avatar>
                            }
                            title={
                                <div><b>Angelina John</b></div>
                            }
                            subheader={
                                <div>
                                <span>Passionate Hair Stylist</span>
                                <span style={{float:"right"}}>Just Now</span>
                                </div>
                            }
                        />
                        <Typography className="ml-1">
                            {description1}
                        </Typography>
                            <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        image={
                                        `data:image/jpeg;base64,${posts.picByte}` }
                                    />
                                    <img src={`data:image/jpeg;base64,${posts.picByte}`} alt={posts.name} />
                                    {posts.name}
                                </CardActionArea>
                            
                            <CardActions className={classes.actions}>
                            <IconButton aria-label="Add to favorites">
                                <FavoriteBorderIcon onClick={() => setLike(like + 1)} />
                            </IconButton>
                            <IconButton aria-label="Share">
                                <ShareIcon />
                            </IconButton>
                            <IconButton aria-label="Share">
                                <CommentIcon />
                            </IconButton>
                            <Typography><span>{like}</span>Likes,</Typography>
                            <Typography>0 Comments</Typography>
                            </CardActions>
                        </Card>
                        ))}
            </Grid>
            <Button >Click me</Button>
        </div>
    );
};

export default MasterForm;