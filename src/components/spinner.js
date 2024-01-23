import React from 'react'

const Spinner = () => {
  return (
    <div>
      <div className="text-center my-3">
            <div className="spinner-border text-primary" role="status">
              <span className='visually-hidden'>Loading...</span>
            </div>
          </div>
    </div>
  )
}

export default Spinner
