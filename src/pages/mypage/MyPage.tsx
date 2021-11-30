import React from 'react';
import { EditUserRequestT, UserT } from '../../types/types';

type MyPageProps = {
  userInfo: UserT | undefined;
  onEditUserInfo: (edit:EditUserRequestT) => Promise<Boolean>;
}

const MyPage = ({userInfo, onEditUserInfo}: MyPageProps) => {
  return (
    <div>MyPage</div>
  )
}

export default MyPage;