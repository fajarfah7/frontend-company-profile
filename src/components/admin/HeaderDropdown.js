import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg
} from '@coreui/react';
import { useSelector } from 'react-redux';
import CIcon from '@coreui/icons-react';
import { logout } from '../../actions/admin'

const TheHeaderDropdown = (props) => {
  const dispatch = useDispatch();
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const adminData = useSelector((state) => state.AdminReducer.adminData);

  useEffect(() => {
    if (adminData.id !== false) {
      setId(adminData.id);
      setName(adminData.name);
    }
  }, [
    adminData,
  ]);

  return (
    <CDropdown
      inNav
      className="c-header-nav-items mx-2"
      direction="down"
    >
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div className="c-avatar">
          <CIcon name="cil-user" height={25} className="c-avatar-img" style={{backgroundColor:"CFCFCF",padding:"4px"}} />
          {/* <CImg
            src={'avatars/6.jpg'}
            className="c-avatar-img"
            alt="admin@bootstrapmaster.com"
          /> */}
        </div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem
          header
          tag="div"
          color="light"
          className="text-center"
        >
          <strong>{name ? name:""} ({id ? id:""})</strong>
        </CDropdownItem>
        {/* <CDropdownItem>
          <CIcon name="cil-user" className="mfe-2" />
          Profile
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-settings" className="mfe-2" />
          Settings
        </CDropdownItem> */}
        <CDropdownItem onClick={() => dispatch(logout())}>
          <CIcon name="cil-account-logout" className="mfe-2" />
          Logout
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default TheHeaderDropdown
