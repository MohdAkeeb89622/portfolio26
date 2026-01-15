import React from 'react'
import {ImLinkedin} from 'react-icons/im'
import {ImGithub} from 'react-icons/im'
import {ImInstagram} from 'react-icons/im'

const HeaderSocials = () => {
  return (
    <div className="header__socials">
        <a href="https://linkedin.com/in/md-akeeb-khan-766885176" target="_blank"><ImLinkedin/></a>
        <a href="https://github.com/MoAkeebKhan/" target="_blank"><ImGithub/></a>
        <a href="https://instagram.com/md__akeeb__khan?igshid=YmMyMTA2M2Y=" target="_blank"><ImInstagram/></a>
    </div>
  )
}

export default HeaderSocials