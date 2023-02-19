// style
import styles from "./Img.module.css";

import imageIcon from "../../images/image.png"

// slick
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Img({image}){

    console.log(image)

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
      };

    return(
        <>
            {
                image.length !== 0  && (
                    <Slider {...settings} className={styles.sliderEdit} >
                        {image.map((img, index) => 
                            <img key={index} className={styles.imgEdit} src={img} alt="" />               
                        )}
                    </Slider>
                )
            }
            {
                image.length === 0 && (
                    <div className={styles.noImage}>
                        <img src={imageIcon} alt="imageIcon" />
                        {/* <div className={styles.noImageTitle}>請上傳圖片</div> */}
                    </div>
                )
            }
            {/* {
                isEdit && image.length !== 0 && (
                    <Slider {...settings} className={styles.sliderEdit} >
                        {image.map((img, index) => 
                            <img key={index} className={styles.imgEdit} src={img} alt="" />               
                        )}
                    </Slider>
                )
            } */}
            {/* {
                !isEdit && (
                    <Slider {...settings} className={styles.sliderPri}>
                        {image.map((img, index) => 
                            <img key={index} className={styles.img} src={img} alt="" />               
                        )}
                    </Slider>
                )
            } */}
            {/* {
                image.length === 0 && (
                    <div>no data</div>
                )
            } */}
        </>
    )
}

export default Img;