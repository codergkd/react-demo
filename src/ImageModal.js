
import React from 'react'; 
import next from './assets/images/next.png';
import prev from './assets/images/prev.png';
const DisplayModal=(props)=>
{
  return( 
  <div className="DisplayModal">
             
             <div className="main-modal">
             <span className="closeModal" onClick={props.closeModal}>X</span>
             <div className="imageArea">
            {props.imageClickedData ? <img src={props.imageClickedData[0].urls.small}/>:null}
            </div>
                 <div className="contentArea">
                 {props.imageClickedData && props.imageClickedData[0].sponsorship ? <h2>
                   {props.imageClickedData[0].sponsorship.tagline}  
                 </h2>:props.imageClickedData && props.imageClickedData[0].user.bio ? <h2>
                   {props.imageClickedData[0].user.bio}  
                 </h2>:props.imageClickedData && props.imageClickedData[0].user && !props.imageClickedData[0].user.bio ? <h2>
                   {props.imageClickedData[0].user.name}  
                 </h2>:null}
                 {props.imageClickedData ? <p>
                   {props.imageClickedData[0].alt_description}  
                 </p>:null}</div>  
                 {props.imageClicked < props.imageData.length - 1 ? <div className="next"
                 onClick={props.next}><img src={next}/></div>:null}
                 {props.imageClicked !== 0 && <div className="prev"
                 onClick={props.prev}><img src={prev}/></div>}
             </div>
         </div>);
}
  
export default DisplayModal;









