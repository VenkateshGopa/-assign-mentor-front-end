import classes from './addmentor.module.css';

const Model = (props) => {
  return (
    <>
      <div className={classes.overlay} onClick={props.onclick}></div>
      <div className={classes.box}>
        <p>{props.message}</p>
        <div className={classes.modelbtn}>
        <button className={classes.modelbutton} onClick={props.onclick}>ok</button>
        </div>
      </div>
    </>
  );
};

export default Model;
