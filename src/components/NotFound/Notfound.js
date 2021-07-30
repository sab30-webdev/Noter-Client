import React from 'react'

const PageNotFound = () => {
    return (
        <div>
          <div style={{"display":"flex","justifyContent":"center"}}>
          <img style={{"width":"50%"}} src={require('./assets/v.png')} alt="not found"/>
          </div>
            <h3 style={{"font-size":"48px","font-weight":"bold","text-align":"center","color":"white"}}>This page could not be found</h3>
        </div>
    )
}

export default PageNotFound
