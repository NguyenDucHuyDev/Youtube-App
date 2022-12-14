import React, { useState,memo, useCallback } from 'react'
import styled from 'styled-components' 
import PermContactCalendarOutlinedIcon from '@mui/icons-material/PermContactCalendarOutlined';
import Brightness2OutlinedIcon from '@mui/icons-material/Brightness2Outlined';
import TranslateOutlinedIcon from '@mui/icons-material/TranslateOutlined';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import KeyboardAltOutlinedIcon from '@mui/icons-material/KeyboardAltOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import ContactSupportOutlinedIcon from '@mui/icons-material/ContactSupportOutlined';
import FeedbackOutlinedIcon from '@mui/icons-material/FeedbackOutlined';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { allInfoApi, disableEventAllSelector, interfaceModeSelector } from '../../redux/selectors';
import InterfaceMode from '../../modal/InterfaceMode'
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import SwitchAccountOutlinedIcon from '@mui/icons-material/SwitchAccountOutlined';
import QueueOutlinedIcon from '@mui/icons-material/QueueOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import avatarDefault from "../../assets/image/avatar.png"
import { logOut } from '../../api/infoApi';
import VoiceChatOutlinedIcon from '@mui/icons-material/VoiceChatOutlined'
import PublishOutlinedIcon from '@mui/icons-material/PublishOutlined';
import { Link, NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  position: absolute;
  right:50%;
  width:max-content;
  height:max-content;
  background-color:${({theme}) => theme.bgLighter};
  z-index:999;
  border-radius:10px;
  border:1px solid rgba(0,0,0, 0.25);
  margin:10px;
  cursor: context-menu;
  box-shadow: 0 0 20px rgba(0,0,0, 0.25);
`
const Wrapper = styled.div`
  padding: 10px 0 0;
`
const ModeInterface = styled.div`
    display: ${(props) => props.typeShowMode === false ? "block" : "none"};
`
const Items = styled.div`
  display: flex;
  justify-content: space-between ;
  align-items: center;
  cursor: pointer;
  padding: 0px 20px;
  height:40px;
  font-size:15px;
  color:${({theme}) => theme.text};
  
  &:hover{
  background-color: ${({theme}) => theme.soft};
  }
`
const Item = styled.div`
  display:flex;
  align-items: center;
  gap:20px;
  width:100%;
  height:100%;
`

const Hr = styled.hr`
  margin: 10px 0px;
  border: 0.5px solid ${({theme}) => theme.soft};
`

const ModalTop = () => {
  console.log('ModalTop')
  const navigate = useNavigate()
  const modeSelector = useSelector(interfaceModeSelector)
  const apiUserInfo = useSelector(allInfoApi)
  console.log(apiUserInfo)
  const disableSelector = useSelector(disableEventAllSelector)
  const avatarUser = `${process.env.REACT_APP_STORAGE_VIDEO_BASE_URL}${apiUserInfo?.userInfo?.imgAvatarUrl}`

  const dispatch = useDispatch()
  const [show,setShow] = useState({
    showMode: false,
    // modeInterface: false,
    // uploadVideo : false,
  })
  
  const handleViewDataYou = () => {
     if(!apiUserInfo){
        navigate("/notLogin")
     }
  }

  const handleShowMode = useCallback((e)=>{
    e.stopPropagation()
    setShow({
      showMode: !(show.showMode),
    })
  },[show])


  const handleLogout = () =>{
    dispatch(logOut())
    navigate("/")
  }  
  

  return (
  <div className='Modal'>
    <Container >
    <Wrapper></Wrapper>
    {(disableSelector?.avatarTop === false || disableSelector?.dotTop === false)
    &&
      <ModeInterface typeShowMode={show.showMode}>
      {apiUserInfo !== null &&
        <>
          <Items>
            <Item>
              <img 
                src={avatarUser||avatarDefault}
                alt= "avatar"
                style={{width:"30px",height:"30px",borderRadius:"900px"}} 
              />
              {apiUserInfo?.userInfo?.fullname}
            </Item>
          </Items>
          <Hr/>

          <NavLink
              to="/profile/channel"
              style={({ isActive }) =>
                isActive
                  ? {
                      backgroundColor: "#3360B3",
                      color:"white",
                      textDecoration: "none"
                    }
                  : undefined
              }
            >
              <Items>
                <Item> <AccountCircleOutlinedIcon />K??nh c???a b???n</Item>
              </Items>
            </NavLink>

          <Items>
            <Item><QueueOutlinedIcon/>Youtube Studio</Item>
          </Items>
          <Items>
            <Item><SwitchAccountOutlinedIcon />Chuy???n t??i kho???n</Item><KeyboardArrowRightOutlinedIcon/>
          </Items>
          <Items onClick={handleLogout}>
            <Item><LogoutOutlinedIcon/>????ng xu???t</Item>
          </Items>
          <Hr/>
          <Items>
            <Item><MonetizationOnOutlinedIcon/>K??nh ????ng k??</Item>
          </Items>
        </>
      }
          <Items onClick={handleViewDataYou}>
            <Item><PermContactCalendarOutlinedIcon/>D??? li???u c???a b???n trong youtube</Item>
          </Items>

          <Hr/>
          <Items onClick={handleShowMode}>
            <Item>
              <Brightness2OutlinedIcon/>Giao di???n: {modeSelector.modeDark.feature === true ? modeSelector.modeDark.name : "S??ng"}</Item><KeyboardArrowRightOutlinedIcon/>
          </Items>
          <Items>
            <Item><TranslateOutlinedIcon/>Ng??n ng???: Ti???ng Vi???t</Item><KeyboardArrowRightOutlinedIcon/>
          </Items>
          <Items>
            <Item><AdminPanelSettingsOutlinedIcon/>Ch??? ????? h???n ch???: ???? t???t</Item><KeyboardArrowRightOutlinedIcon/>
          </Items>
          <Items>
            <Item><LanguageOutlinedIcon/>?????a ??i???m: Vi???t Nam</Item><KeyboardArrowRightOutlinedIcon/>
          </Items>
          <Items>
            <Item><KeyboardAltOutlinedIcon/>Ph??m t???t</Item>
          </Items>
          <Hr/>
          <Items>
            <Item><SettingsOutlinedIcon/>C??i ?????t</Item>
          </Items>
          <Hr/>
          <Items>
            <Item><ContactSupportOutlinedIcon/>Tr??? gi??p</Item>
          </Items>
          <Items>
            <Item><FeedbackOutlinedIcon/>G???i ph???n h???i</Item>
          </Items>
      </ModeInterface>
    }
    {disableSelector?.streamTop === false
      &&
        <>
          <Link to="/profile/channel" style={{textDecoration:"none"}}>
            <Items >
              <Item><PublishOutlinedIcon/>T???i Video l??n</Item>
            </Items>
          </Link>

          <Items>
            <Item><VoiceChatOutlinedIcon/>Ph??t tr???c ti???p</Item>
          </Items>
        </>
    }
      </Container>
    {show.showMode === true && <InterfaceMode show={show} setShow={setShow} />}
  </div>
  )
}

export default memo(ModalTop)