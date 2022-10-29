import React from 'react'
import "./Loading.css"

function Loading(props) {
    return (
        <div className='container' >
            <div className="d-flex justify-content-center" >
                <div className="spinner-border text-danger" role="status">
                </div>
            </div >
            <div className="d-flex justify-content-center">
                {(() => {
                    if (props.loadingtext) {
                        return (
                            <span className="visually-hidden">{props.loadingtext}</span>
                        )
                    }
                    else {
                        return (
                            <span className="visually-hidden">Momenteel verzamelen we de data, een moment geduld A.U.B.</span>
                        )
                    }

                })()}

            </div>
        </div>
    )
}

export default Loading