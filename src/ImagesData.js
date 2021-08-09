import React, {Fragment} from 'react';
import { BottomScrollListener } from 'react-bottom-scroll-listener';
import ImageModal from './ImageModal';
import superagent from 'superagent';
// Unsplashed API Client ID
const clientID =
    "8e31e45f4a0e8959d456ba2914723451b8262337f75bcea2e04ae535491df16d";

const numberOfPhotos = 10;
// Page number will be updated when user scroll at the bottom
let pageNumber = 1;
// API URL
let url =
    "https://api.unsplash.com/photos/?count=" +
    numberOfPhotos +
    "&client_id=" +
    clientID +
    "&page=" + pageNumber;


class ImagesData extends React.Component {
    state = {
        isLazyLoading: false,
        imageData: [],
        flag: false,
        imageClickedData:null
    };
    // API call function
    simpleGet = options => {
        superagent.get(options.url).then(function (res) {
            if (options.onSuccess) options.onSuccess(res);
        });
    };
    // Lazy load function
    lazyLoad = () => {
        
        this.setState({ isLazyLoading: true });
        setTimeout(() => {
            this.setState({
                isLazyLoading: false,
                flag: true,
               
            }, () => {
                
                pageNumber = pageNumber + 1;

                url =
                    "https://api.unsplash.com/photos/?count=" +
                    numberOfPhotos +
                    "&client_id=" +
                    clientID +
                    "&page=" + pageNumber;
                !this.state.isLazyLoading && this.state.flag && this.simpleGet({
                    url: url,
                    onSuccess: res => {
                        this.setState({
                            imageData: [...this.state.imageData, ...res.body],
                            flag: false
                        })
                    }
                });
            });
        }, 2000);
    };
    componentDidMount = () => {
        // Call the function very initially when component mount
        this.simpleGet({
            url: url,
            onSuccess: res => {
                this.setState({
                    imageData: res.body
                })
            }
        });
    }
    render() {
        const { isLazyLoading,  } = this.state;
        const { lazyLoad } = this;

        return (
            <Fragment>
            <div className="App">

                <BottomScrollListener onBottom={lazyLoad}>
                {/* Photos Grid Layout */}
                   <ul className="photo-grid">
                        {this.state.imageData.length > 0 ? this.state.imageData.map((photo, index) => {
                            return (
                                <li onClick={()=>{
                                    this.setState({
                                        imageClicked:index,
                                        
                                    },()=>{
                                        this.setState({
                                            imageClickedData:this.state.imageData.filter((item,index)=>{
                                                        return index == this.state.imageClicked
                                                    })
                                        })
                                    })
                                }} key={photo.id}>
                                    <img
                                        src={photo.urls.thumb}
                                       
                                    />
                                </li>
                            );
                        }) : <div style={{ textAlign: 'center', width: '100%', height: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Please wait</div>}
                        {isLazyLoading && <li style={{width:'100%',height:'10px', backgroundColor:'transparent'}}>
                        <div className="box">
                            <div className="loader-15"></div>
                        </div>
                        </li>}
                    </ul>
                   
                </BottomScrollListener>

                
            </div>
             {/* Image modal after clicking the Image */}
           {this.state.imageClicked >= 0 && this.state.imageClicked !== null && <ImageModal
               imageClickedData={this.state.imageClickedData}
               imageClicked={this.state.imageClicked}
               imageData={this.state.imageData}
               next={()=>{
                     this.setState({
                         imageClicked:this.state.imageClicked < this.state.imageData.length - 1 ? this.state.imageClicked + 1:this.state.imageClicked
                     },()=>{
                         this.setState({
                          imageClickedData:this.state.imageData.filter((getItem,getIndex)=>{
                          return getIndex == this.state.imageClicked
                         })
                         })
                     })
                 }}
                 prev={()=>{
                     this.setState({
                         imageClicked:this.state.imageClicked !== 0 ? this.state.imageClicked - 1:this.state.imageClicked
                     },()=>{
                         this.setState({
                          imageClickedData:this.state.imageData.filter((getItem,getIndex)=>{
                          return getIndex == this.state.imageClicked
                         })
                         })
                     })
                 }}
               closeModal={()=>{
                 this.setState({
                  imageClickedData:null,
                  imageClicked:null
                 })
             }}
           />}
            </Fragment>
        );
    }
}

export default ImagesData;