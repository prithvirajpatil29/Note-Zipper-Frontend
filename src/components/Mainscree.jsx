import React from 'react'

const Mainscree = ({title, children}) => {
  return (
    <div className="mainback">
        <div className="container">
            <div className="row">
                <div className="page">
                    {
                        title && <>
                        <h1>{title}</h1>
                        <hr />
                        </>
                    }
                    {children}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Mainscree