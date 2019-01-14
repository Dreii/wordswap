import React from 'react'

import './Image.css'

const Image = ({src, alt, title, size, style}) => {

  // console.log(title)
  let arr = title.split(' ')
  if(arr.length > 1) title = arr[0].charAt(0)+arr[1].charAt(0)
  else title = title.charAt(0)

  return (
    <div className="circle-container" style={{...style, height: size, width: size, backgroundImage: src ? `url(${src})`: 'none'}}>
      {src ? null : <p style={{fontSize: size*0.3}}>{title}</p>}
      {/* {src ? (
        <div style={{
            backgroundImage: `url(${src})`,
            width: size,
            height: size
          }}
          alt={alt}
        ></div>
      ) : null} */}

      {/* {src ? <img src={src} alt={alt} width={size} height={size}/> : null} */}
    </div>
  )
}

export default Image
