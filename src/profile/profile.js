import React, { Component } from "react";
import "./profile.css";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import News from "../Images/newpaper.jpeg";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import Button from "@material-ui/core/Button";

import { red } from "@material-ui/core/colors";
// import FavoriteIcon from '@material-ui/icons/Favorite';
// import ShareIcon from '@material-ui/icons/Share';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import MoreVertIcon from '@material-ui/icons/MoreVert';
class Profile extends Component {
  constructor() {
    super();
    this.state = {
      expanded: false,
      setExpanded: false
    };
  }
  RecipeReviewCard() {
    const handleExpandClick = () => {
      this.state.setExpanded(!this.state.expanded);
    };
  }
  render() {
    return (
      <div className="ProfileContainer">
        <div className="profileLayout">
          <Card className={"card"}>
            <CardHeader
              avatar={
                <Avatar aria-label="recipe" className={"avatar"}>
                  R
                </Avatar>
              }
              action={
                <IconButton aria-label="settings">
                  {/* <MoreVertIcon /> */}
                </IconButton>
              }
              title="Shrimp and Chorizo Paella"
              subheader="September 14, 2016"
            />
            <CardMedia
              className={"media"}
              image="https://www.google.com/search?q=image&rlz=1C5CHFA_enIN866IN866&sxsrf=ACYBGNRXvu47Kt-ui9ck4VO-8dREPTte3w:1572999358479&source=lnms&tbm=isch&sa=X&ved=0ahUKEwjtxPmfp9TlAhWdxcQBHVW1DysQ_AUIEigB&biw=1440&bih=697#imgrc=jnmdGeZkUsWmwM:"
              title="Paella dish"
            />
            <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">
                This impressive paella is a perfect party dish and a fun meal to
                cook together with your guests. Add 1 cup of frozen peas along
                with the mussels, if you like.
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton aria-label="add to favorites">
                {/* <FavoriteIcon /> */}
              </IconButton>
              <IconButton aria-label="share">{/* <ShareIcon /> */}</IconButton>
              <IconButton
                className={clsx("expand", {
                  ["expandOpen"]: this.state.expanded
                })}
                onClick={this.handleExpandClick}
                aria-expanded={this.state.expanded}
                aria-label="show more"
              >
                {/* <ExpandMoreIcon /> */}
              </IconButton>
            </CardActions>
            <Collapse in={"expanded"} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography paragraph>Method:</Typography>
                <Typography paragraph>
                  Heat 1/2 cup of the broth in a pot until simmering, add
                  saffron and set aside for 10 minutes.
                </Typography>
                <Typography paragraph>
                  Heat oil in a (14- to 16-inch) paella pan or a large, deep
                  skillet over medium-high heat. Add chicken, shrimp and
                  chorizo, and cook, stirring occasionally until lightly
                  browned, 6 to 8 minutes. Transfer shrimp to a large plate and
                  set aside, leaving chicken and chorizo in the pan. Add
                  pimentón, bay leaves, garlic, tomatoes, onion, salt and
                  pepper, and cook, stirring often until thickened and fragrant,
                  about 10 minutes. Add saffron broth and remaining 4 1/2 cups
                  chicken broth; bring to a boil.
                </Typography>
                <Typography paragraph>
                  Add rice and stir very gently to distribute. Top with
                  artichokes and peppers, and cook without stirring, until most
                  of the liquid is absorbed, 15 to 18 minutes. Reduce heat to
                  medium-low, add reserved shrimp and mussels, tucking them down
                  into the rice, and cook again without stirring, until mussels
                  have opened and rice is just tender, 5 to 7 minutes more.
                  (Discard any mussels that don’t open.)
                </Typography>
                <Typography>
                  Set aside off of the heat to let rest for 10 minutes, and then
                  serve.
                </Typography>
              </CardContent>
            </Collapse>
          </Card>
          <div className="buttoncontainer">
            <div>
              <Typography id="discrete-slider-custom" gutterBottom>
                Believability Index (BI)
              </Typography>
              <Slider
                defaultValue={20}
                aria-labelledby="discrete-slider-custom"
                step={10}
                valueLabelDisplay="auto"
              />
            </div>
            <div>
              <Typography id="discrete-slider-custom" gutterBottom>
                Prior Knowledge (PK)
              </Typography>
              <Slider
                defaultValue={20}
                aria-labelledby="discrete-slider-custom"
                step={10}
                valueLabelDisplay="auto"
              />
            </div>
          </div>
          <div>
            <label htmlFor="contained-button-file">
              <Button variant="contained" component="span" className={"button"}>
                Next
              </Button>
            </label>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
