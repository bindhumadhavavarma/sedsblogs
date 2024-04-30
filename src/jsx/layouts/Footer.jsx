import React from 'react'

function Footer() {
  return (
    <>
      <div className="new_footer_top" style={{marginBottom : '-25px'}}>
        <footer style={{"display":" block"}}>
          <div className="footer">
            <div className="row_foot_3">
              <p>CONNECT WITH US</p>
            </div>
            <div className="row_foot">
              <a target="_blank" href="https://www.linkedin.com/company/seds-vit-ap">
                <i className="fa fa-linkedin"></i>
              </a>
              <a target="_blank" href="https://instagram.com/seds_vitap?igshid=1h9vn3uz4wxla">
                <i className="fa fa-instagram"></i>
              </a>
              <a target="_blank" href="mailto:space.club@vitap.ac.in">
                <i className="fa fa-envelope"></i>
              </a>
              <a target="_blank" href="https://twitter.com/seds_vitap?s=09"><i className="fa fa-twitter"></i></a>
            </div>
            <div className="row_foot_1">
              <p>VIT-AP University, Inavolu, Beside AP Secretariat Amaravati, Andhra Pradesh 522237, India</p>
            </div>
            <div className="row_foot_2">
              <p>Copyright © SEDS VIT-AP 2021 All rights reserved. || Designed By: SEDS WEB TEAM</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}

export default Footer