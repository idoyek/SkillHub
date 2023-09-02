import "./Project.css";
import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { blue, red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import img from '../static/images/projectImage.jpg'
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { Dialog, DialogTitle } from "@mui/material";
import Apply from "./Apply";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const Project = ({ imageUrl, title, description, positionName }) => {
  const imageURL = imageUrl ? imageUrl : img
  const [cvFiles, setCVFiles] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [isApplyOpen, setIsApplyOpen] = useState(false);
  //console.log(positionName);
  const handleExpandClick = () => {
    setExpanded(!expanded);
    //console.log(positionName)
  };

  const handleDeleteProject = ()=>{

  }
  const handleCVFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCVFiles(file);
    }
  };

  const handleApplyClick = (e) =>{
    setIsApplyOpen(true);
    console.log(`im am ${isApplyOpen}`);
  }

  const handleChipClick = (e) =>{
    
  }
  return (
    <Card raised className="project-body"
    sx={{
      maxWidth: 350,
      maxHeight: 350,
      // margin: "0 auto",
      //overflow: 'hidden',
      maxHeight: expanded ? 'none' : '20rem',
      padding: "0.1em",
    }}>
      <CardHeader className="project-name"
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        title={title}
      />
      <CardMedia
        component="img"
        height="150"
        src = {imageURL}
        alt="Project Image"
        sx={{  objectFit: "contain" }}
      />
      <CardContent className="project-description">
        <Typography variant="body2">
          {description} {/* Use the description prop */}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon color={"error"} />
        </IconButton>
        <DeleteOutlinedIcon onClick={handleDeleteProject}/>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography variant="h7" color="text" style={{ fontWeight: 'bold', marginBottom: '1rem' }}>
           Suggested positions
            {positionName && positionName.length > 0 ? (
                <Stack direction="row" flexWrap="wrap" marginTop={1} gap={1}>
                {positionName.map((position, index) => (
                  <Chip key={index} label={position} color="primary" variant="outlined" onClick={handleChipClick} marginTop={2} />
                ))}
              </Stack>
            ) : (
              <p>No positions available.</p>
            )}
          </Typography>
          <Typography paragraph style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
            <Chip className="apply-btn" label="Apply" color="primary" onClick={handleApplyClick} style={{ margin: '1rem 0' }}/>
            {isApplyOpen && (
            <Apply isOpen={isApplyOpen} title={title} onClose={() => setIsApplyOpen(false)}  />
             )}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default Project;
