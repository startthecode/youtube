import * as React from 'react';
import Popover from '@mui/material/Popover';
import { updateSigninstatus } from '../../store/userInfo';
import { useDispatch, useSelector } from 'react-redux';
import { updatesignInModelUnlogged,resetSignInModelUnlogged } from '../../store/signInModelUnlogged';

export function PopUpUnloggedUser({innerText}) {
let dispatch = useDispatch();
let signInModelForUnlogged = useSelector(val=> val.signInModelForUnlogged)

  
  const handleClose = () => {
    dispatch(resetSignInModelUnlogged())
    
   
  };

  const open = Boolean(signInModelForUnlogged.data);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div className='bg-[#171616]'>
      <Popover
        id={id}
        open={open}
        anchorEl={signInModelForUnlogged.data}
        onClose={handleClose}

        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
    vertical: 'top',
    horizontal: 'left',
  }}
      >
        <div className='bg-[#171616] w-[370px]  p-4' sx={{ p: 3 }}>
<h4 className='font-semibold text-[#f1f1f1] text-[18px]'>{signInModelForUnlogged.heading}</h4>
<p className='text-[#bababa] text-[14px] mt-[20px]'>{signInModelForUnlogged.subheading}</p>

<button className=' text-blue-500 text-[15px] mt-[30px] bg-transparent border-0' onClick={()=> dispatch(updateSigninstatus({signInStatus:true}))}>Sign in</button>

        </div>
      </Popover>
    </div>
  );
}